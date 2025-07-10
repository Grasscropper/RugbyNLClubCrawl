import { D as DataService } from './DataService-k5s8Z4fj.js';
import { e as error } from './index-CvuFLVuQ.js';
import 'fs';
import 'path';
import 'url';

const load = async ({ params, url }) => {
  try {
    let search = url.searchParams.get("search") ?? "";
    let bgColor = url.searchParams.get("bgclr") ?? "#dddddd";
    let color = url.searchParams.get("clr") ?? "#000000";
    let homeAwayFilter = url.searchParams.get("hmawfltr") ?? "both";
    let isWholeWeek = url.searchParams.get("isWholeWeek") === "true";
    let matches = DataService.GetAllMatches();
    let date = deriveDate(url);
    return { search, color, bgColor, matches, homeAwayFilter, isWholeWeek, date };
  } catch (err) {
    console.error("❌ Failed during load:", err);
    throw error(500, "Load failed");
  }
};
function deriveDate(url) {
  let paramValue = url.searchParams.get("date");
  if (paramValue == null)
    return null;
  if (paramValue === "TODAY")
    return /* @__PURE__ */ new Date();
  return new Date(paramValue);
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DTZ722PI.js')).default;
const server_id = "src/routes/matches/+page.server.ts";
const imports = ["_app/immutable/nodes/3.CBwQKCOq.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DH7zvddy.js","_app/immutable/chunks/BOIzqSA3.js","_app/immutable/chunks/BCe7NVrf.js","_app/immutable/chunks/qvmD8DIL.js","_app/immutable/chunks/Bz5wVA_Q.js","_app/immutable/chunks/BH0Io0K6.js"];
const stylesheets = ["_app/immutable/assets/3.eJbIr_e2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-A8jUEUVj.js.map
