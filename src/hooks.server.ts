// src/hooks.server.ts
import cron from 'node-cron';
import { DataService } from '$lib/server/DataService';
import { RugbyNLService } from '$lib/server/RugbyNLService';
import { error, type Handle } from '@sveltejs/kit';

let cronStarted = false;

async function runJob() {
    try {
        console.log('CRON job started');

        let rugbyNL = new RugbyNLService();
        let matchTables = await rugbyNL.ReadSeasonData();
        DataService.UpdateMatchData(matchTables);

        console.log('CRON job finished');
    } catch (e) {
        console.error('CRON job error:', e);
    }
}

console.log('✅ hooks.server.ts loaded');

// * * * * * <command to execute>
// # | | | | |
// # | | | | day of the week (0–6) (Sunday to Saturday;
// # | | | month (1–12)             7 is also Sunday on some systems)
// # | | day of the month (1–31)
// # | hour (0–23)
// # minute (0–59)
// ✅ Start the cron job once, outside the handle() function
if (!cronStarted) {
    runJob();

    cron.schedule('* */12 * * *', () => {
        console.log('[CRON] Running match crawler');
        runJob();
    });
    cronStarted = true;
}

export const handle: Handle = async ({ event, resolve }) => {

    console.log('⚡️ Received request:', event.url.pathname);
    try {
        return await resolve(event);
    } catch (err) {
        console.error('❌ Request error:', err);
        throw error(500, 'Internal Server Error');
    }
};
