import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist');
mkdirSync(distDir, { recursive: true });

async function buildHost() {
  const result = await build({
    entryPoints: [join(__dirname, 'src/host/host.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    outfile: join(distDir, 'host.min.js'),
    target: ['es2020'],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    banner: {
      js: `/* Page Analyzer - Host */`
    }
  });

  console.log('✓ Built host.min.js');
}

async function buildRemote() {
  const result = await build({
    entryPoints: [join(__dirname, 'src/remote/remote.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    outfile: join(distDir, 'remote.min.js'),
    target: ['es2020'],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    banner: {
      js: `/* Page Analyzer - Remote */`
    }
  });

  console.log('✓ Built remote.min.js');

  const remoteHtml = readFileSync(join(__dirname, 'src/remote/remote.html'), 'utf-8');
  const updatedHtml = remoteHtml.replace('remote.js', 'remote.min.js');
  writeFileSync(join(distDir, 'remote.html'), updatedHtml);
  console.log('✓ Built remote.html');
}

async function buildBookmarklet() {
  const hostContent = readFileSync(join(distDir, 'host.min.js'), 'utf-8');
  const bookmarkletCode = `javascript:(function(){var s=document.createElement('script');s.src='https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/host.min.js';s.onload=function(){if(window.PageAnalyzer){window.PageAnalyzer.init();}};if(!document.getElementById('page-analyzer-script')){s.id='page-analyzer-script';document.head.appendChild(s);}else{console.warn('Page Analyzer already loaded');}})();`;
  
  writeFileSync(join(distDir, 'bookmarklet.js'), bookmarkletCode);
  console.log('✓ Built bookmarklet.js');
}

async function main() {
  try {
    console.log('Building Page Analyzer...\n');
    await buildHost();
    await buildRemote();
    await buildBookmarklet();
    console.log('\n✓ Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();

