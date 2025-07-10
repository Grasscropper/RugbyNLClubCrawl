import cron from 'node-cron';
import { D as DataService } from './DataService-k5s8Z4fj.js';
import * as puppeteer from 'puppeteer';
import { e as error } from './index-CvuFLVuQ.js';
import 'fs';
import 'path';
import 'url';

class RugbyNLService {
  async ReadSeasonData() {
    var isWin = process.platform === "win32";
    let browser = isWin ? await puppeteer.launch() : await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    let leaguePartials = await this.GetLeaguePartials(browser);
    await Promise.all(leaguePartials.map((a_item) => this.FillLeagueData(a_item, browser)));
    browser.close();
    return leaguePartials;
  }
  async GetLeaguePartials(browser) {
    const page = await browser.newPage();
    await page.exposeFunction("Log", Log);
    await page.goto(s_leagueUrl);
    const mostRecentSeason = await page.evaluate(() => {
      const container = document.getElementById("menu-speelschema");
      const linkElement = container.firstElementChild.firstElementChild;
      return linkElement.href;
    });
    await page.goto(mostRecentSeason);
    const leaguePartials = await page.evaluate(() => {
      const container = document.getElementsByClassName("the-content").item(0);
      const accordionElements = [...container.getElementsByClassName("accordion-item")].slice(0, 5);
      let result = [];
      for (let accordionElement of accordionElements) {
        const category = accordionElement.getElementsByClassName("accordion-title")[0].firstChild.textContent;
        const divisionHeadingElements = accordionElement.querySelectorAll("h6.wp-block-heading");
        const divisionButtonGroupElements = accordionElement.getElementsByClassName("wp-block-buttons");
        for (let [index, divisionHeadingElement] of [...divisionHeadingElements].entries()) {
          const heading = divisionHeadingElement.textContent;
          const divisionButtonGroupAnchorElements = [...divisionButtonGroupElements[index].querySelectorAll("a:not(.has-white-background-color)")];
          const partials = divisionButtonGroupAnchorElements.map((a_item) => ({ Name: a_item.textContent, URL: a_item.href, Category: category, Division: heading }));
          result.push(...partials);
        }
      }
      return result;
    });
    console.log(leaguePartials);
    return leaguePartials;
  }
  async FillLeagueData(partial, browser) {
    if (!partial.URL)
      return;
    const page = await browser.newPage();
    await page.exposeFunction("ParseDate", ParseDate);
    await page.exposeFunction("ParseScore", ParseScore);
    await page.exposeFunction("Log", Log);
    await page.goto(partial.URL);
    partial.Ranking = await this.ReadRankingTable(page);
    partial.Matches = await this.ReadMatchTable(page);
  }
  async ReadMatchTable(page) {
    return page.evaluate(async () => {
      const rows = Array.from(document.querySelectorAll(".results tbody tr"));
      const matches = [];
      let date = /* @__PURE__ */ new Date();
      for (const row of rows) {
        const columns = Array.from(row.querySelectorAll("td"));
        if (columns.length == 1) {
          date = await ParseDate(columns[0].textContent ?? "");
        } else if (columns.length == 5 && !row.classList.contains("header")) {
          let parsedScore = await ParseScore(columns[4].textContent);
          matches.push(
            {
              Date: date,
              Time: columns[0].textContent,
              Location: columns[1].textContent,
              HomeTeam: columns[2].textContent,
              AwayTeam: columns[3].textContent,
              Score: parsedScore
            }
          );
        }
      }
      return matches;
    });
  }
  async ReadRankingTable(page) {
    return page.evaluate(async () => {
      const rows = Array.from(document.querySelectorAll("#team-ranking tbody tr:not(.header)"));
      const rankings = [];
      for (const row of rows) {
        const columns = Array.from(row.querySelectorAll("td"));
        rankings.push(
          {
            Rank: parseInt(columns[0].textContent),
            TeamName: columns[1].textContent,
            MatchesPlayed: parseInt(columns[2].textContent),
            Wins: parseInt(columns[3].textContent),
            Losses: parseInt(columns[4].textContent),
            Draws: parseInt(columns[5].textContent),
            CompetitionPoints: parseInt(columns[6].textContent),
            PointsScored: parseInt(columns[7].textContent),
            PointsConceded: parseInt(columns[8].textContent),
            PointsBalance: parseInt(columns[9].textContent)
          }
        );
      }
      return rankings;
    });
  }
}
async function ParseDate(date) {
  const dateElements = date.split(" ");
  const day = parseInt(dateElements[1]);
  const month = s_dutchMonths.findIndex((val) => val === dateElements[2]);
  const year = parseInt(dateElements[3]);
  return new Date(year, month, day);
}
async function ParseScore(score) {
  let elements = score.split(" - ");
  if (elements.length != 2)
    return null;
  let result = {
    HomeTeam: parseInt(elements[0]),
    AwayTeam: parseInt(elements[1])
  };
  return result;
}
function Log(...params) {
  console.log(params);
}
const s_leagueUrl = "https://rugby.nl/competitie/speelschema/";
const s_dutchMonths = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december"
];
let cronStarted = false;
async function runJob() {
  try {
    console.log("CRON job started");
    let rugbyNL = new RugbyNLService();
    let leagues = await rugbyNL.ReadSeasonData();
    DataService.UpdateLeagueData(leagues);
    console.log("CRON job finished");
  } catch (e) {
    console.error("CRON job error:", e);
  }
}
console.log("✅ hooks.server.ts loaded");
if (!cronStarted) {
  runJob();
  cron.schedule("* */12 * * *", () => {
    console.log("[CRON] Running match crawler");
    runJob();
  });
  cronStarted = true;
}
const handle = async ({ event, resolve }) => {
  console.log("⚡️ Received request:", event.url.pathname);
  try {
    return await resolve(event);
  } catch (err) {
    console.error("❌ Request error:", err);
    throw error(500, "Internal Server Error");
  }
};

export { handle };
//# sourceMappingURL=hooks.server-xRc1dAqo.js.map
