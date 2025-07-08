import { p as push, F as copy_payload, G as assign_payload, n as pop, E as escape_html, I as attr, J as maybe_selected, K as bind_props, L as ensure_array_like, M as attr_style, N as stringify } from './exports-efZeiL2K.js';
import { p as page } from './index3-COZlwscD.js';

function MatchTable($$payload, $$props) {
  push();
  let { matches, bgColor, color, iconFunc } = $$props;
  let matchesMap = (() => {
    const map = /* @__PURE__ */ new Map();
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
  })();
  function getDateAsDDMMYYYY(date = /* @__PURE__ */ new Date()) {
    if (typeof date == "string") {
      let strDate = date;
      return `${strDate.slice(8, 10)}-${strDate.slice(5, 7)}-${strDate.slice(0, 4)}`;
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const each_array = ensure_array_like(matchesMap.keys());
  $$payload.out += `<table class="table svelte-17q09gs"${attr_style(`--row-bgColor: ${stringify(bgColor)};--row-color: ${stringify(color)};`)}><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let groupKey = each_array[$$index_1];
    const each_array_1 = ensure_array_like(matchesMap.get(groupKey));
    $$payload.out += `<tbody><tr class="svelte-17q09gs"><td class="date svelte-17q09gs" colspan="7">${escape_html(groupKey)}</td></tr><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let match = each_array_1[$$index];
      $$payload.out += `<tr class="svelte-17q09gs"><td class="time svelte-17q09gs">${escape_html(match.Time)}</td><td class="home team svelte-17q09gs">${escape_html(match.HomeTeam)}</td><td class="home score svelte-17q09gs">${escape_html(match.Score?.HomeTeam)}</td><td class="score separator svelte-17q09gs">-</td><td class="away score svelte-17q09gs">${escape_html(match.Score?.AwayTeam)}</td><td class="away team svelte-17q09gs">${escape_html(match.AwayTeam)}</td><td class="icon svelte-17q09gs">${escape_html(iconFunc(match))}</td></tr>`;
    }
    $$payload.out += `<!--]--></tbody>`;
  }
  $$payload.out += `<!--]--></table>`;
  pop();
}
function MatchTableEditor($$payload, $$props) {
  push();
  let {
    bgColor = void 0,
    color = void 0,
    homeAwayFilter = void 0,
    searchString = void 0,
    isWholeWeek = void 0,
    date = void 0
  } = $$props;
  let dateString = (() => {
    if (date == null) return null;
    let pad = (num) => num.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  })();
  $$payload.out += `<div class="container svelte-bnw3ri"><div class="svelte-bnw3ri">Starts with: <input type="text"${attr("value", searchString)} class="svelte-bnw3ri"/></div> <div class="colors svelte-bnw3ri">Row color: <input type="color"${attr("value", bgColor)} class="svelte-bnw3ri"/> Text color: <input type="color"${attr("value", color)} class="svelte-bnw3ri"/></div> <div class="homeaway-container svelte-bnw3ri">Home/Away: <select class="svelte-bnw3ri"><option value="both"${maybe_selected($$payload, "both")}${attr("selected", homeAwayFilter == "both", true)}>Both</option><option value="home"${maybe_selected($$payload, "home")}${attr("selected", homeAwayFilter == "home", true)}>Home</option><option value="away"${maybe_selected($$payload, "away")}${attr("selected", homeAwayFilter == "away", true)}>Away</option></select></div> <div class="date svelte-bnw3ri"><label for="dateInput">Date</label> <input type="date" id="dateInput"${attr("value", dateString)} class="svelte-bnw3ri"/> <input type="checkbox" id="isWholeWeekCheckbox"${attr("checked", isWholeWeek, true)}${attr("disabled", date == null, true)} class="svelte-bnw3ri"/> <label for="isWholeWeekCheckbox">Use whole week</label></div> <button class="svelte-bnw3ri">Get viewing link</button></div>`;
  bind_props($$props, {
    bgColor,
    color,
    homeAwayFilter,
    searchString,
    isWholeWeek,
    date
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let { matches, search } = data;
  let bgColor = data.bgColor;
  let color = data.color;
  let homeAwayFilter = data.homeAwayFilter;
  let searchString = `${search}`;
  let isWholeWeek = data.isWholeWeek;
  let date = data.date;
  let filteredMatches = filterMatches();
  function filterMatches() {
    let result = matches.slice();
    if (isWholeWeek) {
      let dateToUse = date ?? /* @__PURE__ */ new Date();
      const firstDayOfWeek = new Date(dateToUse.setDate(dateToUse.getUTCDate() - dateToUse.getUTCDay() + 1));
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getUTCDate() + 8);
      result = result.filter((a_item) => a_item.Date >= firstDayOfWeek && a_item.Date <= lastDayOfWeek);
    } else if (date != null && typeof date != "string") {
      console.log(typeof date, date);
      result = result.filter((a_item) => sameDay(a_item.Date, date));
    }
    if (homeAwayFilter == "home") return result.filter((a_item) => a_item.HomeTeam.startsWith(`${searchString}`));
    if (homeAwayFilter == "away") return result.filter((a_item) => a_item.AwayTeam.startsWith(`${searchString}`));
    return result.filter((a_item) => a_item.HomeTeam.startsWith(`${searchString}`) || a_item.AwayTeam.startsWith(`${searchString}`));
  }
  function iconFunc(match) {
    if (match.Score == null) return "";
    const isHomeTeam = match.HomeTeam.startsWith(`${searchString}`);
    if (isHomeTeam && match.Score.HomeTeam > match.Score.AwayTeam) return "✅";
    if (!isHomeTeam && match.Score.HomeTeam < match.Score.AwayTeam) return "✅";
    if (!isHomeTeam && match.Score.HomeTeam > match.Score.AwayTeam) return "❌";
    if (isHomeTeam && match.Score.HomeTeam < match.Score.AwayTeam) return "❌";
    return "=";
  }
  function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="container svelte-572vhb">`;
    if (page.url.searchParams.get("hidemenu") !== "true") {
      $$payload2.out += "<!--[-->";
      MatchTableEditor($$payload2, {
        get bgColor() {
          return bgColor;
        },
        set bgColor($$value) {
          bgColor = $$value;
          $$settled = false;
        },
        get color() {
          return color;
        },
        set color($$value) {
          color = $$value;
          $$settled = false;
        },
        get homeAwayFilter() {
          return homeAwayFilter;
        },
        set homeAwayFilter($$value) {
          homeAwayFilter = $$value;
          $$settled = false;
        },
        get searchString() {
          return searchString;
        },
        set searchString($$value) {
          searchString = $$value;
          $$settled = false;
        },
        get isWholeWeek() {
          return isWholeWeek;
        },
        set isWholeWeek($$value) {
          isWholeWeek = $$value;
          $$settled = false;
        },
        get date() {
          return date;
        },
        set date($$value) {
          date = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div>${escape_html(filterMatches.length)} matches</div> `;
    MatchTable($$payload2, {
      matches: filteredMatches,
      color,
      bgColor,
      iconFunc
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CY3MhTji.js.map
