const fs = require('fs');
const path = require('path');

// Function to count lines in a file
function countLines(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return content.split('\n').length;
    } catch (error) {
        return 0;
    }
}

// Technologies to analyze
const technologies = [
    'react', 'nextjs', 'angular', 'vue', 'svelte',
    'bootstrap', 'tailwind', 'uikit', 'daisyui', 'foundation',
    'milligram', 'semanticui', 'purecss', 'bulma', 'chakra',
    'mantine', 'flowbite', 'antdesign', 'tailgrids', 'metro4ui', 'cardinal'
];

console.log('📊 Frontend Showcase - Lines of Code Analysis\n');
console.log('Technology'.padEnd(15) + 'HTML'.padEnd(8) + 'CSS'.padEnd(8) + 'JS'.padEnd(8) + 'Total'.padEnd(8));
console.log('─'.repeat(50));

let totalLines = { html: 0, css: 0, js: 0, total: 0 };

technologies.forEach(tech => {
    const htmlPath = path.join(__dirname, 'pages', `${tech}.html`);
    const cssPath = path.join(__dirname, 'public', 'css', `${tech}.css`);
    const jsPath = path.join(__dirname, 'public', 'js', `${tech}.js`);
    
    const htmlLines = countLines(htmlPath);
    const cssLines = countLines(cssPath);
    const jsLines = countLines(jsPath);
    const total = htmlLines + cssLines + jsLines;
    
    totalLines.html += htmlLines;
    totalLines.css += cssLines;
    totalLines.js += jsLines;
    totalLines.total += total;
    
    console.log(
        tech.padEnd(15) + 
        htmlLines.toString().padEnd(8) + 
        cssLines.toString().padEnd(8) + 
        jsLines.toString().padEnd(8) + 
        total.toString().padEnd(8)
    );
});

console.log('─'.repeat(50));
console.log(
    'TOTAL'.padEnd(15) + 
    totalLines.html.toString().padEnd(8) + 
    totalLines.css.toString().padEnd(8) + 
    totalLines.js.toString().padEnd(8) + 
    totalLines.total.toString().padEnd(8)
);

console.log(`\n📈 Summary:`);
console.log(`• Total Technologies: ${technologies.length}`);
console.log(`• Total HTML Lines: ${totalLines.html}`);
console.log(`• Total CSS Lines: ${totalLines.css}`);
console.log(`• Total JavaScript Lines: ${totalLines.js}`);
console.log(`• Grand Total Lines: ${totalLines.total}`);
console.log(`• Average Lines per Technology: ${Math.round(totalLines.total / technologies.length)}`);

// Update server.js with actual statistics
const actualStats = {};
technologies.forEach(tech => {
    const htmlPath = path.join(__dirname, 'pages', `${tech}.html`);
    const cssPath = path.join(__dirname, 'public', 'css', `${tech}.css`);
    const jsPath = path.join(__dirname, 'public', 'js', `${tech}.js`);
    
    actualStats[tech] = {
        html: countLines(htmlPath),
        css: countLines(cssPath),
        js: countLines(jsPath)
    };
});

console.log('\n📝 Updating server.js with actual statistics...');
console.log(JSON.stringify(actualStats, null, 2));