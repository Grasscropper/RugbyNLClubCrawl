<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { HomeAwayFilter } from '$lib/models/Match';

  let {
    bgColor = $bindable(),
    color = $bindable(),
    homeAwayFilter = $bindable(),
    searchString = $bindable(),
    isWholeWeek = $bindable(),
    date = $bindable(),
  }: {
    bgColor: string;
    color: string;
    homeAwayFilter: HomeAwayFilter;
    searchString: string;
    isWholeWeek: boolean;
    date: Date | null;
  } = $props();

  let dateString = $derived.by(() => {
    if (date == null) return null;

    let pad = (num: number): string => num.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  });

  function onChangeBgColor(value: string) {
    page.url.searchParams.set('bgclr', value);
    goto(`?${page.url.searchParams}`);
  }

  function onChangeColor(value: string) {
    page.url.searchParams.set('clr', value);
    goto(`?${page.url.searchParams}`);
  }

  function onChangeHomeAwayFilter(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    let value = e.currentTarget.value as HomeAwayFilter;
    homeAwayFilter = value;
    page.url.searchParams.set('hmawfltr', value);
    goto(`?${page.url.searchParams}`);
  }

  function onChangeDate(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    let value = e.currentTarget.value;

    if (value === '') {
      date = null;
      isWholeWeek = false;
      page.url.searchParams.delete('isWholeWeek');
      page.url.searchParams.delete('date');
    } else {
      date = new Date(value);
      page.url.searchParams.set('date', `${value}`);
    }

    goto(`?${page.url.searchParams}`);
  }

  function onChangeisWholeWeek(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    let value = e.currentTarget.checked;
    page.url.searchParams.set('isWholeWeek', `${value}`);
    goto(`?${page.url.searchParams}`);
  }

  function onChangeSearchString() {
    goto(`${searchString}?${page.url.searchParams}`);
  }

  function copyLink() {
    page.url.searchParams.set('hidemenu', 'true');
    const link = page.url.toString();
    navigator.clipboard.writeText(link);
  }
</script>

<div class="container">
  <div>
    Starts with: <input type="text" bind:value={searchString} onchange={onChangeSearchString} />
  </div>
  <div class="colors">
    Row color: <input type="color" bind:value={bgColor} onchange={(e) => onChangeBgColor(e.currentTarget.value)} />
    Text color: <input type="color" bind:value={color} onchange={(e) => onChangeColor(e.currentTarget.value)} />
  </div>
  <div class="homeaway-container">
    Home/Away:
    <select onchange={onChangeHomeAwayFilter}>
      <option value="both" selected={homeAwayFilter == 'both'}>Both</option>
      <option value="home" selected={homeAwayFilter == 'home'}>Home</option>
      <option value="away" selected={homeAwayFilter == 'away'}>Away</option>
    </select>
  </div>
  <div class="date">
    <label for="dateInput">Date</label>
    <input type="date" id="dateInput" value={dateString} onchange={onChangeDate} />
    <input
      type="checkbox"
      id="isWholeWeekCheckbox"
      bind:checked={isWholeWeek}
      onchange={onChangeisWholeWeek}
      disabled={date == null}
    />
    <label for="isWholeWeekCheckbox">Use whole week</label>
  </div>
  <button onpointerdown={copyLink}>Get viewing link</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    height: 32px;
    width: fit-content;
  }

  input:not([type='checkbox']),
  select {
    width: 10rem;
  }

  div {
    width: fit-content;
  }
</style>
