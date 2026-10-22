import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = '/powerplatform-samples';

export default defineConfig({
  site: 'https://pnp.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  redirects: Object.fromEntries(Object.entries({
    '/samples/all/': '/#sample-catalog',
    '/samples/powerfx/': '/legacy-samples/#power-fx',
    '/samples/powerapps/': '/legacy-samples/#power-apps',
    '/samples/powerautomate/': '/legacy-samples/#power-automate',
    '/samples/powerva/': '/legacy-samples/#power-virtual-agents',
    '/samples/powerbi/': '/#sample-catalog',
    '/gettingstarted/': '/getting-started/',
    '/gettingstarted/troubleshooting/': '/getting-started/',
    '/contributing/issues/': '/contributing/',
    '/contributing/forking/': '/contributing/',
    '/contributing/sample/': '/contributing/',
    '/contributing/pullrequest/': '/contributing/',
  }).map(([source, destination]) => [source, `${base}${destination}`])),
});
