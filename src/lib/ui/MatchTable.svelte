<script lang="ts">
  import type { MatchRow } from '$lib/models/Match';

  let {
    matches,
    bgColor,
    color,
    iconFunc,
  }: { matches: MatchRow[]; bgColor: string; color: string; iconFunc: (match: MatchRow) => string } = $props();

  let matchesMap: Map<string, MatchRow[]> = $derived.by(() => {
    const map = new Map();
    matches.forEach((a_item) => {
      const key = getDateAsDDMMYYYY(a_item.Date);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [a_item]);
      } else {
        collection.push(a_item);
      }
    });

    return map;
  });

  function getDateAsDDMMYYYY(date = new Date()): string {
    if (typeof date == 'string') {
      let strDate = date as string;
      return `${strDate.slice(8, 10)}-${strDate.slice(5, 7)}-${strDate.slice(0, 4)}`;
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
</script>

<table class="table" style="--row-bgColor: {bgColor};--row-color: {color};">
  {#each matchesMap.keys() as groupKey}
    <tbody>
      <tr>
        <td class="date" colspan="7">
          {groupKey}
        </td>
      </tr>
      {#each matchesMap.get(groupKey)! as match}
        <tr>
          <td class="time">
            {match.Time}
          </td>
          <td class="home team">
            {match.HomeTeam}
          </td>
          <td class="home score">
            {match.Score?.HomeTeam}
          </td>

          <td class="score separator"> - </td>

          <td class="away score">
            {match.Score?.AwayTeam}
          </td>
          <td class="away team">
            {match.AwayTeam}
          </td>
          <td class="icon">
            {iconFunc(match)}
          </td>
        </tr>
      {/each}
    </tbody>
  {/each}
</table>

<style>
  .table {
    min-width: fit-content;
    max-width: 40rem;
    border-collapse: collapse;
  }

  tr {
    background-color: var(--row-bgColor);
    color: var(--row-color);
    border: 1px solid var(--row-color);
  }

  td {
    padding: 8px 4px;
  }

  tr:has(> td.date) {
    filter: brightness(85%);
  }

  .home.team {
    text-align: right;
  }

  .score.home {
    text-align: right;
  }

  .score.separator,
  .icon {
    text-align: center;
  }

  .score.away {
    text-align: left;
  }

  .away.team {
    /* grid-area: away; */
  }
</style>
