import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const buildTarget = process.env.BUILD_TARGET || 'both';

export default defineConfig({
  build: {
    emptyOutDir: buildTarget === 'both',
    lib: buildTarget !== 'both' ? {
      entry: buildTarget === 'host' 
        ? resolve(__dirname, 'src/host/host.js')
        : resolve(__dirname, 'src/remote/remote.js'),
      name: buildTarget === 'host' ? 'PageAnalyzerHost' : 'PageAnalyzerRemote',
      fileName: (format) => buildTarget === 'host' ? 'host.min.js' : 'remote.min.js',
      formats: ['iife']
    } : undefined,
    rollupOptions: buildTarget === 'both' ? {
      input: {
        host: resolve(__dirname, 'src/host/host.js'),
        remote: resolve(__dirname, 'src/remote/remote.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'host' ? 'host.min.js' : 'remote.min.js';
        },
        format: 'iife',
        name: (chunkInfo) => {
          return chunkInfo.name === 'host' ? 'PageAnalyzerHost' : 'PageAnalyzerRemote';
        }
      }
    } : undefined,
    minify: 'terser',
    target: 'es2020',
    outDir: 'dist'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  plugins: [
    {
      name: 'add-banners',
      generateBundle(options, bundle) {
        Object.keys(bundle).forEach(fileName => {
          const chunk = bundle[fileName];
          if (chunk.type === 'chunk' && chunk.isEntry) {
            if (fileName === 'host.min.js' || fileName.includes('host')) {
              chunk.code = '/* Page Analyzer - Host */\n' + chunk.code;
            } else if (fileName === 'remote.min.js' || fileName.includes('remote')) {
              chunk.code = '/* Page Analyzer - Remote */\n' + chunk.code;
            }
          }
        });
      }
    },
    {
      name: 'post-build',
      closeBundle() {
        if (buildTarget === 'remote') {
          const remoteHtml = readFileSync(resolve(__dirname, 'src/remote/remote.html'), 'utf-8');
          const updatedHtml = remoteHtml.replace('remote.js', 'remote.min.js');
          writeFileSync(resolve(__dirname, 'dist/remote.html'), updatedHtml);
          console.log('✓ Built remote.html');
        }

        if (buildTarget === 'host') {
          const bookmarkletCode = `javascript:(function(){var s=document.createElement('script');s.src='https://gist.githubusercontent.com/damionrashford/GIST_ID/raw/host.min.js';s.onload=function(){if(window.PageAnalyzer){window.PageAnalyzer.init();}};if(!document.getElementById('page-analyzer-script')){s.id='page-analyzer-script';document.head.appendChild(s);}else{console.warn('Page Analyzer already loaded');}})();`;
          writeFileSync(resolve(__dirname, 'dist/bookmarklet.js'), bookmarkletCode);
          console.log('✓ Built bookmarklet.js');
        }
      }
    }
  ]
});
