import { p as push, E as escape_html, n as pop } from './exports-efZeiL2K.js';
import { p as page } from './index3-COZlwscD.js';

function Error($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error as default };
//# sourceMappingURL=error.svelte-DpW2qR3Q.js.map
