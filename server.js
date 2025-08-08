const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Technology showcase data
const technologies = [
  { id: 'react', name: 'React Native Components', description: 'React with native HTML components' },
  { id: 'nextjs', name: 'Next.js Native Components', description: 'Next.js with native HTML components' },
  { id: 'angular', name: 'Angular Native Components', description: 'Angular with native HTML components' },
  { id: 'vue', name: 'Vue Native Components', description: 'Vue.js with native HTML components' },
  { id: 'svelte', name: 'Svelte Native Components', description: 'Svelte with native HTML components' },
  { id: 'bootstrap', name: 'Bootstrap', description: 'Bootstrap CSS framework' },
  { id: 'tailwind', name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  { id: 'uikit', name: 'UIKit', description: 'Lightweight and modular front-end framework' },
  { id: 'daisyui', name: 'DaisyUI', description: 'Tailwind CSS components' },
  { id: 'foundation', name: 'Foundation 6', description: 'Responsive front-end framework' },
  { id: 'milligram', name: 'Milligram', description: 'Minimalist CSS framework' },
  { id: 'semanticui', name: 'Semantic UI', description: 'UI component framework' },
  { id: 'purecss', name: 'Pure CSS', description: 'Lightweight CSS framework' },
  { id: 'bulma', name: 'Bulma', description: 'Modern CSS framework based on Flexbox' },
  { id: 'chakra', name: 'Chakra UI', description: 'Simple, modular and accessible component library' },
  { id: 'mantine', name: 'Mantine', description: 'Full-featured React components library' },
  { id: 'flowbite', name: 'Flowbite', description: 'Tailwind CSS component library' },
  { id: 'antdesign', name: 'Ant Design', description: 'Enterprise-class UI design language' },
  { id: 'tailgrids', name: 'TailGrids', description: 'Tailwind CSS components and blocks' },
  { id: 'metro4ui', name: 'Metro 4 UI', description: 'Modern UI framework inspired by Windows Metro' },
  { id: 'cardinal', name: 'Cardinal', description: 'Small mobile-first CSS framework' }
];

// Final code statistics (after bug fixes)
const codeStats = {
  react: { html: 17, css: 253, js: 146 },
  nextjs: { html: 17, css: 369, js: 235 },
  angular: { html: 165, css: 445, js: 168 },
  vue: { html: 17, css: 417, js: 368 },
  svelte: { html: 13, css: 415, js: 394 },
  bootstrap: { html: 259, css: 206, js: 277 },
  tailwind: { html: 232, css: 182, js: 346 },
  uikit: { html: 166, css: 251, js: 269 },
  daisyui: { html: 223, css: 270, js: 316 },
  foundation: { html: 195, css: 313, js: 267 },
  milligram: { html: 171, css: 340, js: 248 },
  semanticui: { html: 216, css: 239, js: 266 },
  purecss: { html: 183, css: 414, js: 248 },
  bulma: { html: 300, css: 188, js: 276 },
  chakra: { html: 148, css: 532, js: 276 },
  mantine: { html: 215, css: 653, js: 331 },
  flowbite: { html: 230, css: 332, js: 392 },
  antdesign: { html: 242, css: 713, js: 437 },
  tailgrids: { html: 244, css: 483, js: 506 },
  metro4ui: { html: 257, css: 493, js: 473 },
  cardinal: { html: 273, css: 867, js: 542 }
};

// Home page route
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frontend Technology Showcase - Admin Portals</title>
    <link rel="stylesheet" href="/static/css/home.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🚀 Frontend Technology Showcase</h1>
            <p>Admin Portal Mockups using Different Frontend Technologies</p>
        </header>

        <div class="grid">
            ${technologies.map(tech => `
                <div class="card">
                    <div class="card-header">
                        <h3>${tech.name}</h3>
                        <div class="stats">
                            <span class="stat">HTML: ${codeStats[tech.id].html} lines</span>
                            <span class="stat">JS: ${codeStats[tech.id].js} lines</span>
                            <span class="stat">CSS: ${codeStats[tech.id].css} lines</span>
                        </div>
                    </div>
                    <p>${tech.description}</p>
                    <a href="/${tech.id}" class="btn">View Admin Portal</a>
                </div>
            `).join('')}
        </div>

        <footer class="footer">
            <p>© 2024 Frontend Technology Showcase. All admin portals are mockups for demonstration purposes.</p>
        </footer>
    </div>
</body>
</html>`;
  res.send(html);
});

// Individual technology routes
technologies.forEach(tech => {
  app.get(`/${tech.id}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', `${tech.id}.html`));
  });
});

// API endpoint for stats
app.get('/api/stats', (req, res) => {
  const totalStats = Object.values(codeStats).reduce((acc, curr) => ({
    html: acc.html + curr.html,
    js: acc.js + curr.js,
    css: acc.css + curr.css
  }), { html: 0, js: 0, css: 0 });

  res.json({
    technologies: technologies.length,
    totalLines: totalStats.html + totalStats.js + totalStats.css,
    breakdown: totalStats,
    individual: codeStats
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend Showcase Server running on http://localhost:${PORT}`);
  console.log(`📊 API Stats available at http://localhost:${PORT}/api/stats`);
  console.log(`\n📋 Available Admin Portals:`);
   console.log(` • http://localhost:${PORT}/ `);
  technologies.forEach(tech => {
    console.log(`   • ${tech.name}: http://localhost:${PORT}/${tech.id}`);
  });
});