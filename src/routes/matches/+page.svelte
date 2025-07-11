<script lang="ts">
  import { page } from '$app/state';
  import type { HomeAwayFilter, MatchRow } from '$lib/models/Match';
  import MatchTable from '$lib/ui/MatchTable.svelte';
  import MatchTableEditor from '$lib/ui/MatchTableEditor.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let { matches } = data;

  let bgColor = $state(data.bgColor);
  let color = $state(data.color);

  let homeAwayFilter: HomeAwayFilter = $state(data.homeAwayFilter);
  let searchString: string = $state(`${data.search}`);
  let isWholeWeek: boolean = $state(data.isWholeWeek);
  let date: Date | null = $state(data.date);
  let filteredMatches = $derived(filterMatches());

  function filterMatches(): MatchRow[] {
    let result = matches.slice();

    if (isWholeWeek) {
      let dateToUse = date ?? new Date();
      const firstDayOfWeek = new Date(dateToUse.setDate(dateToUse.getUTCDate() - dateToUse.getUTCDay() + 1));
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getUTCDate() + 8);

      result = result.filter((a_item) => a_item.Date >= firstDayOfWeek && a_item.Date <= lastDayOfWeek);
    } else if (date != null && typeof date != 'string') {
      console.log(typeof date, date);
      result = result.filter((a_item) => sameDay(a_item.Date, date!));
    }

    if (homeAwayFilter == 'home') return result.filter((a_item) => isMatchingStringCI(a_item.HomeTeam, searchString));
    if (homeAwayFilter == 'away') return result.filter((a_item) => isMatchingStringCI(a_item.AwayTeam, searchString));

    return result.filter(isTeamMatchingString);
  }

  function isMatchingStringCI(str1: string, str2: string): boolean {
    return str1.toUpperCase().startsWith(str2.toUpperCase());
  }

  function isTeamMatchingString(match: MatchRow): boolean {
    return isMatchingStringCI(match.HomeTeam, searchString) || isMatchingStringCI(match.AwayTeam, searchString);
  }

  function iconFunc(match: MatchRow): string {
    if (match.Score == null) return '';

    const isHomeTeam = isMatchingStringCI(match.HomeTeam, searchString);
    const isAwayTeam = isMatchingStringCI(match.AwayTeam, searchString);

    if (isHomeTeam == isAwayTeam) return '?';

    if (isHomeTeam && match.Score.HomeTeam > match.Score.AwayTeam) return '✅';
    if (isHomeTeam && match.Score.HomeTeam < match.Score.AwayTeam) return '❌';
    if (isAwayTeam && match.Score.HomeTeam < match.Score.AwayTeam) return '✅';
    if (isAwayTeam && match.Score.HomeTeam > match.Score.AwayTeam) return '❌';

    return '=';
  }

  function sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }
</script>

<div class="container">
  {#if page.url.searchParams.get('hidemenu') !== 'true'}
    <MatchTableEditor bind:bgColor bind:color bind:homeAwayFilter bind:searchString bind:isWholeWeek bind:date />
    <div>
      {filteredMatches.length} matches
    </div>
  {/if}
  <MatchTable matches={filteredMatches} {color} {bgColor} {iconFunc} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
