import * as puppeteer from 'puppeteer';
import type { MatchRow, MatchTable, Score } from '../models/Match';

export class RugbyNLService {
    public async ReadSeasonData(): Promise<MatchTable[]> {
        let browser = await puppeteer.launch
            ();
        // ({
        //     executablePath: '/usr/bin/chromium-browser',
        //     headless: true,
        //     args: ['--no-sandbox', '--disable-setuid-sandbox']
        // });
        let leagueUrls = await this.GetLeagueUrls(browser);
        let tables = await Promise.all(leagueUrls.map(a_item => this.ReadMatchTable(a_item, browser)));
        browser.close();
        return tables;
    }

    async GetLeagueUrls(browser: puppeteer.Browser): Promise<string[]> {
        const page = await browser.newPage();
        await page.goto(s_leagueUrl);
        const url = await page.evaluate(() => {
            const container = document.getElementById("menu-speelschema");
            const linkElement = container!.firstElementChild!.firstElementChild as HTMLAnchorElement;
            return linkElement.href;
        })

        await page.goto(url);
        const leagueUrls = await page.evaluate(() => {
            const container = document.getElementsByClassName("the-content").item(0);
            const accordionElements: Element[] = [...container!.getElementsByClassName("accordion-item")].slice(0, 5);
            const anchorElements = accordionElements.reduce((acc, cur) => [...acc, ...cur.getElementsByTagName("a")], [] as HTMLAnchorElement[]);

            return [...anchorElements].map(a_item => a_item.href).filter(a_item => a_item.length > 0);
        })

        console.log(leagueUrls);
        return leagueUrls;
    }

    public async ReadMatchTable(url: string, browser: puppeteer.Browser): Promise<MatchTable> {
        const page = await browser.newPage();
        await page.exposeFunction("ParseDate", ParseDate);
        await page.exposeFunction("ParseScore", ParseScore);
        await page.exposeFunction("Log", Log);
        await page.goto(url);
        const tableData: MatchTable = await page.evaluate(async (url) => {
            const result: MatchTable = {
                Url: url,
                Matches: [],
            }
            const rows = Array.from(document.querySelectorAll('.results tbody tr'));
            const matches: MatchRow[] = [];
            let date: Date = new Date();
            for (const row of rows) {
                const columns = Array.from(row.querySelectorAll('td'));
                if (columns.length == 1) {
                    date = await ParseDate(columns[0].textContent ?? '');
                } else if (columns.length == 5 && !row.classList.contains("header")) {
                    let parsedScore = await ParseScore(columns[4].textContent!);
                    result.Matches.push(
                        {
                            Date: date,
                            Time: columns[0].textContent!,
                            Location: columns[1].textContent!,
                            HomeTeam: columns[2].textContent!,
                            AwayTeam: columns[3].textContent!,
                            Score: parsedScore,
                        })
                }
            };

            return result;
        }, url)

        return tableData;
    }
}

async function ParseDate(date: string): Promise<Date> {
    const dateElements = date.split(' ');
    const day = parseInt(dateElements[1]);
    const month = s_dutchMonths.findIndex(val => val === dateElements[2]);
    const year = parseInt(dateElements[3]);
    return new Date(year, month, day);
}

async function ParseScore(score: string): Promise<Score | null> {
    let elements = score.split(" - ")
    if (elements.length != 2)
        return null;

    let result: Score = {
        HomeTeam: parseInt(elements[0]),
        AwayTeam: parseInt(elements[1])
    }

    return result;
}

function Log(...params: any[]) {
    console.log(params);
}

const s_leagueUrl = "https://rugby.nl/competitie/speelschema/";

const s_dutchMonths = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december'
];