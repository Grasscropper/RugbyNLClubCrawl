import type { HomeAwayFilter } from '$lib/models/Match';
import { DataService } from '$lib/server/DataService';
import { error } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
    try {
        let search = url.searchParams.get('search') ?? "";
        let bgColor = url.searchParams.get('bgclr') ?? '#dddddd';
        let color = url.searchParams.get('clr') ?? '#000000';
        let homeAwayFilter: HomeAwayFilter = url.searchParams.get('hmawfltr') as HomeAwayFilter ?? 'both';
        let isWholeWeek = url.searchParams.get('isWholeWeek') === "true";
        let matches = DataService.GetAllMatches();
        let date = deriveDate(url);
        return { search, color, bgColor, matches, homeAwayFilter, isWholeWeek, date };
    } catch (err) {
        console.error('❌ Failed during load:', err);
        throw error(500, 'Load failed');
    }
};

function deriveDate(url: URL) {
    let paramValue = url.searchParams.get('date');

    if (paramValue == null)
        return null;
    if (paramValue === "TODAY")
        return new Date();

    return new Date(paramValue);
}