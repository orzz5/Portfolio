export const BLOG_POSTS = [
  {
    slug: 'why-every-project-lives-on-orzz-website',
    date: '2026-09-20',
    readingMinutes: 4,
    title: 'Why every project I ship lives on orzz.website',
    excerpt:
      'Four subdomains, one domain, one deploy pipeline. How I structure side projects so each one ships fast and stays maintainable.',
    blocks: [
      {
        type: 'p',
        text: 'When I started putting my projects online, each one lived in a different place: a free subdomain here, a raw GitHub Pages link there. It worked, but it felt scattered — and nothing said "this is mine". Moving everything under orzz.website fixed more than aesthetics.',
      },
      { type: 'h2', text: 'One domain, four subdomains' },
      {
        type: 'p',
        text: 'bots.orzz.website, weather.orzz.website, bio.orzz.website, and labs.orzz.website each run independently. A problem with one deployment never takes the others down, and every project gets its own URL that is short enough to say out loud.',
      },
      {
        type: 'p',
        text: 'The main site at orzz.website ties them together: it is the place where everything is documented, where the live status of each product is visible, and where the source code links back to GitHub.',
      },
      { type: 'h2', text: 'Keep the deploy pipeline boring' },
      {
        type: 'p',
        text: 'All five sites deploy the same way: push to GitHub, Vercel builds, done. There are no custom scripts to maintain and no servers to patch. The interesting work is the product itself, not the infrastructure around it.',
      },
      {
        type: 'p',
        text: 'The lesson I keep re-learning: side projects do not die because they are hard to build. They die because shipping the next change feels expensive. Making deployment trivial is the cheapest way to keep a project alive.',
      },
    ],
  },
  {
    slug: 'building-the-kinetic-dot-grid',
    date: '2026-10-01',
    readingMinutes: 5,
    title: 'Building the kinetic dot grid behind this site',
    excerpt:
      'A canvas background that warps toward your cursor: how the grid, the warp math, and the idle-pause all fit together in ~450 lines.',
    blocks: [
      {
        type: 'p',
        text: 'The background of this site is a full-screen canvas drawing a grid of lines and nodes. When the mouse moves, points near the cursor get pushed outward with a bell-shaped falloff, and clicking spawns an expanding ripple that displaces the grid as it passes. Here is how it works.',
      },
      { type: 'h2', text: 'A grid that is allowed to lie' },
      {
        type: 'p',
        text: 'The grid is drawn from a perfect lattice of points, but every point is passed through a warp function before it is rendered. The function combines three inputs: distance to the cursor, distance to any active ripples, and a pin factor that locks the outermost rows and columns in place so the grid does not tear at the edges of the screen.',
      },
      { type: 'h2', text: 'Lerping instead of snapping' },
      {
        type: 'p',
        text: 'The rendered mouse position is lerped toward the real one every frame. That small detail is what makes the warp feel liquid rather than mechanical — the grid trails the cursor slightly and settles when you stop moving.',
      },
      { type: 'h2', text: 'Pausing when nobody is looking' },
      {
        type: 'p',
        text: 'A canvas loop running at 60fps for no reason is wasted battery. The animation loop stops itself 2.5 seconds after the last mouse movement, click, or tab switch, and restarts on the next interaction. Because the last frame stays on screen, the grid looks identical — it simply stops burning CPU. It also draws a single static frame for visitors with reduced-motion enabled at the OS level.',
      },
      {
        type: 'p',
        text: 'The whole component is one file, no dependencies beyond React, and it stays under 500 lines. Background effects do not need to be complicated to feel good.',
      },
    ],
  },
  {
    slug: 'trilingual-portfolio-without-an-i18n-library',
    date: '2026-10-06',
    readingMinutes: 4,
    title: 'Going trilingual without an i18n library',
    excerpt:
      'Three locales, one React context, zero dependencies. Why I wrote a ~60-line translation layer instead of reaching for i18next.',
    blocks: [
      {
        type: 'p',
        text: 'This site ships in English, Spanish, and French. It would have been easy to pull in i18next or react-intl, but both bring formatting APIs, bundler plugins, and JSON file conventions that a portfolio of this size never uses.',
      },
      { type: 'h2', text: 'A context, a key lookup, a hook' },
      {
        type: 'p',
        text: 'The entire translation layer is a React context that stores the current language, a t(key) function that looks up flat keys in the active locale object, and a changeLanguage function that persists the choice to localStorage and updates the html lang attribute. That is roughly sixty lines.',
      },
      { type: 'h2', text: 'Flat keys make mistakes visible' },
      {
        type: 'p',
        text: 'All three locales live in one file as flat objects. Because they are plain JavaScript, a build script can diff the key sets in milliseconds — any key defined in English but missing in French fails the check. I run that check before every build; it has caught dropped keys more than once.',
      },
      {
        type: 'p',
        text: 'The trade-off is real: no pluralization rules, no date formatting, no namespace splitting. For a site with a fixed set of strings, none of that is needed. If this ever grows into a product with user-generated content in multiple languages, that is the moment to reach for a real i18n library.',
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
