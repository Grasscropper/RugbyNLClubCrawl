import cron from 'node-cron';
import { D as DataService } from './DataService-CRs-EzgN.js';
import * as puppeteer from 'puppeteer';
import { e as error } from './index-CvuFLVuQ.js';
import 'fs';
import 'path';
import 'url';

class RugbyNLService {
  async ReadSeasonData() {
    let browser = await puppeteer.launch();
    let leagueUrls = await this.GetLeagueUrls(browser);
    let tables = await Promise.all(leagueUrls.map((a_item) => this.ReadMatchTable(a_item, browser)));
    browser.close();
    return tables;
  }
  async GetLeagueUrls(browser) {
    const page = await browser.newPage();
    await page.goto(s_leagueUrl);
    const url = await page.evaluate(() => {
      const container = document.getElementById("menu-speelschema");
      const linkElement = container.firstElementChild.firstElementChild;
      return linkElement.href;
    });
    await page.goto(url);
    const leagueUrls = await page.evaluate(() => {
      const container = document.getElementsByClassName("the-content").item(0);
      const accordionElements = [...container.getElementsByClassName("accordion-item")].slice(0, 5);
      const anchorElements = accordionElements.reduce((acc, cur) => [...acc, ...cur.getElementsByTagName("a")], []);
      return [...anchorElements].map((a_item) => a_item.href).filter((a_item) => a_item.length > 0);
    });
    console.log(leagueUrls);
    return leagueUrls;
  }
  async ReadMatchTable(url, browser) {
    const page = await browser.newPage();
    await page.exposeFunction("ParseDate", ParseDate);
    await page.exposeFunction("ParseScore", ParseScore);
    await page.exposeFunction("Log", Log);
    await page.goto(url);
    const tableData = await page.evaluate(async (url2) => {
      const result = {
        Url: url2,
        Matches: []
      };
      const rows = Array.from(document.querySelectorAll(".results tbody tr"));
      let date = /* @__PURE__ */ new Date();
      for (const row of rows) {
        const columns = Array.from(row.querySelectorAll("td"));
        if (columns.length == 1) {
          date = await ParseDate(columns[0].textContent ?? "");
        } else if (columns.length == 5 && !row.classList.contains("header")) {
          let parsedScore = await ParseScore(columns[4].textContent);
          result.Matches.push(
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
      return result;
    }, url);
    return tableData;
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
    let matchTables = await rugbyNL.ReadSeasonData();
    DataService.UpdateMatchData(matchTables);
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
//# sourceMappingURL=hooks.server-DSxamhG-.js.map
