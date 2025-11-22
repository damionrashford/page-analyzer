# Page Analyzer

A powerful browser bookmarklet that provides comprehensive web page analysis and
developer tools directly in your browser. Analyze any webpage's DOM structure,
network activity, performance metrics, accessibility, SEO, and security - all
without leaving the page.

## What is Page Analyzer?

Page Analyzer is a bookmarklet that adds a professional developer tools overlay
to any webpage. Simply click the bookmarklet and instantly access 9 powerful
analysis tools in a draggable, resizable panel.

## Features

### 🔍 DOM Inspector

- Visual element selection by hovering over the page
- Interactive DOM tree viewer
- Element properties panel with computed styles
- Screenshot individual elements
- Real-time element highlighting

### 🌐 Network Monitor

- Intercepts and logs all network requests (fetch and XHR)
- View request/response details, timing, and size
- Filter by request type
- Export network data as HAR file
- Click any request to see full details

### ⚡ Performance Analyzer

- Page load metrics (DNS, TCP, SSL, TTFB, download time)
- Resource timing for all loaded assets
- Paint timing (First Paint, First Contentful Paint)
- Memory usage (when available)
- Export performance data as JSON

### 💬 Console Capture

- Captures all console logs, errors, warnings, and info messages
- Filter logs by level (log, error, warn, info, debug)
- View timestamps and stack traces
- Export console logs as JSON
- Real-time log streaming

### 💾 Storage Inspector

- View and edit localStorage items
- View and edit sessionStorage items
- View and manage cookies
- Edit storage values directly
- Delete individual items

### ℹ️ Page Information

- Complete page metadata (URL, title, protocol, host)
- All meta tags with content
- Viewport dimensions and device information
- Security context information
- User agent and browser details

### ♿ Accessibility Audit

- Accessibility score (0-100)
- Detects missing alt text on images
- Checks heading structure (H1-H6)
- Validates form labels and ARIA attributes
- Color contrast analysis
- Export accessibility report as JSON

### 🔎 SEO Analyzer

- SEO score with detailed analysis
- Meta tags validation (title, description, Open Graph)
- Heading structure analysis
- Image alt text checking
- Link analysis (internal/external)
- Structured data (JSON-LD) detection
- Export SEO report as JSON

### 🔒 Security Checker

- Security score assessment
- HTTPS and secure context detection
- Mixed content detection
- Security headers information
- Security recommendations
- Export security report as JSON

### 📸 Screenshot

- Capture full page screenshots
- Capture individual element screenshots
- Automatic download as PNG
- Available via command palette

## Installation

### Quick Install (Drag & Drop)

**Simply drag the button below to your bookmarks bar:**

<div align="center" style="margin: 20px 0; padding: 20px;">

<<<<<<< HEAD
<a href="javascript:(function(){var s=document.createElement('script');s.src='https://gist.githubusercontent.com/damionrashford/b80aa7bc89fa29b6bf476623e159c6a9/raw/fb369170bde6175055b195712b83d7f2d3ed7235/host.min.js';s.onload=function(){if(window.PageAnalyzer){window.PageAnalyzer.init();}};if(!document.getElementById('page-analyzer-script')){s.id='page-analyzer-script';document.head.appendChild(s);}else{console.warn('Page Analyzer already loaded');}})();" style="display: inline-block; padding: 12px 24px; background-color: #0066cc; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; border: 1px solid #0052a3; cursor: move; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📌
=======
<a href="javascript:(function(){var s=document.createElement('script');s.src='https://gist.githubusercontent.com/damionrashford/024211a31434d14af7ccf13adbd11f6b/raw/fb369170bde6175055b195712b83d7f2d3ed7235/host.min.js';s.onload=function(){if(window.PageAnalyzer){window.PageAnalyzer.init();}};if(!document.getElementById('page-analyzer-script')){s.id='page-analyzer-script';document.head.appendChild(s);}else{console.warn('Page Analyzer already loaded');}})();"
   style="display: inline-block; padding: 14px 28px; background: #0066cc; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: move;">📌
>>>>>>> 234d2bf34c0655d967b8a587ab4a88eaf5a6f5d5
Drag to Bookmarks Bar</a>

</div>

**Instructions:**

<ol>
<li>Make sure your bookmarks bar is visible (<kbd>Ctrl+Shift+B</kbd> / <kbd>Cmd+Shift+B</kbd>)</li>
<li>Drag the button above to your bookmarks bar</li>
<li>Done! Click it on any webpage to analyze it</li>
</ol>

### Manual Installation (Alternative Method)

If drag-and-drop doesn't work, you can manually create the bookmark:

**Step 1: Get the Bookmarklet Code**

<ol>
<li>Right-click on the button above and select "Copy link address" (or "Copy link")</li>
<li>This copies the bookmarklet code to your clipboard</li>
</ol>

**Step 2: Create the Bookmark**

**Chrome/Edge:**

<ol>
<li>Right-click your bookmarks bar</li>
<li>Select "Add page" or "Add bookmark"</li>
<li>Name it "Page Analyzer"</li>
<li>Paste the bookmarklet code into the URL field</li>
<li>Click "Save"</li>
</ol>

**Firefox:**

<ol>
<li>Right-click your bookmarks toolbar</li>
<li>Select "New Bookmark"</li>
<li>Name it "Page Analyzer"</li>
<li>Paste the bookmarklet code into the "Location" field</li>
<li>Click "Save"</li>
</ol>

**Safari:**

<ol>
<li>Right-click your bookmarks bar</li>
<li>Select "Add Bookmark"</li>
<li>Name it "Page Analyzer"</li>
<li>Edit the bookmark and paste the code into the URL field</li>
</ol>

## Usage

### Opening Page Analyzer

<ol>
<li>Navigate to any webpage you want to analyze</li>
<li>Click the "Page Analyzer" bookmarklet in your bookmarks bar</li>
<li>The analyzer panel will appear in the bottom-right corner</li>
</ol>

### Using the Panel

<ul>
<li><strong>Drag</strong>: Click and drag the header to move the panel</li>
<li><strong>Resize</strong>: Drag the bottom-right corner to resize</li>
<li><strong>Minimize</strong>: Click the minimize button (−) to collapse</li>
<li><strong>Maximize</strong>: Click the maximize button (□) to fill the screen</li>
<li><strong>Close</strong>: Click the close button (×) to hide the panel</li>
</ul>

### Navigating Tabs

Click any tab at the top to switch between tools:

<ul>
<li>🔍 <strong>DOM</strong> - Inspect page elements</li>
<li>🌐 <strong>Network</strong> - Monitor network requests</li>
<li>⚡ <strong>Performance</strong> - View performance metrics</li>
<li>💬 <strong>Console</strong> - View console logs</li>
<li>💾 <strong>Storage</strong> - Inspect storage</li>
<li>ℹ️ <strong>Info</strong> - Page information</li>
<li>♿ <strong>A11y</strong> - Accessibility audit</li>
<li>🔎 <strong>SEO</strong> - SEO analysis</li>
<li>🔒 <strong>Security</strong> - Security check</li>
</ul>

### Keyboard Shortcuts

<ul>
<li><strong><kbd>Cmd/Ctrl + K</kbd></strong> - Open command palette (quick access to all features)</li>
<li><strong><kbd>Cmd/Ctrl + Shift + D</kbd></strong> - Switch to DOM Inspector</li>
<li><strong><kbd>Cmd/Ctrl + Shift + N</kbd></strong> - Switch to Network Monitor</li>
<li><strong><kbd>Cmd/Ctrl + Shift + P</kbd></strong> - Switch to Performance</li>
<li><strong><kbd>Cmd/Ctrl + Shift + C</kbd></strong> - Switch to Console</li>
<li><strong><kbd>Cmd/Ctrl + Shift + S</kbd></strong> - Switch to Storage</li>
<li><strong><kbd>Cmd/Ctrl + Shift + T</kbd></strong> - Toggle dark/light theme</li>
<li><strong><kbd>Escape</kbd></strong> - Close command palette or close panel</li>
</ul>

### Command Palette

Press <kbd>Cmd/Ctrl + K</kbd> to open the command palette. Type to search for:

<ul>
<li>Open any tool tab</li>
<li>Toggle theme</li>
<li>Export data</li>
<li>Take screenshots</li>
<li>And more...</li>
</ul>

Use arrow keys to navigate, Enter to select, Escape to close.

### Exporting Data

Most tools include export functionality:

<ul>
<li><strong>Network</strong>: Export as HAR file</li>
<li><strong>Performance</strong>: Export as JSON</li>
<li><strong>Console</strong>: Export logs as JSON</li>
<li><strong>Accessibility</strong>: Export report as JSON</li>
<li><strong>SEO</strong>: Export report as JSON</li>
<li><strong>Security</strong>: Export report as JSON</li>
</ul>

Click the "Export" button in any tool to download the data.

### Taking Screenshots

<ul>
<li><strong>Full Page</strong>: Use command palette (<kbd>Cmd/Ctrl + K</kbd>) → "Take Screenshot"</li>
<li><strong>Element Screenshot</strong>: In DOM Inspector, select an element, then click "Screenshot Element" button</li>
</ul>

### Theme

The analyzer automatically detects your system theme preference. You can
manually toggle between dark and light themes:

<ul>
<li>Use keyboard shortcut: <kbd>Cmd/Ctrl + Shift + T</kbd></li>
<li>Or use command palette: <kbd>Cmd/Ctrl + K</kbd> → "Toggle Theme"</li>
</ul>

Your theme preference is saved and will persist across sessions.

## Tips

<ol>
<li><strong>DOM Inspector</strong>: Hover over elements on the page to see them highlighted. Click to select and view properties.</li>
<li><strong>Network Monitor</strong>: Starts capturing immediately when opened. Click "Clear" to reset the log.</li>
<li><strong>Performance</strong>: Metrics are calculated from page load. Refresh the page after opening the analyzer for most accurate results.</li>
<li><strong>Console</strong>: Captures logs in real-time. Use the filter dropdown to show only specific log levels.</li>
<li><strong>Storage</strong>: Double-click any value to edit it. Changes are saved immediately.</li>
<li><strong>Accessibility/SEO/Security</strong>: Click "Export" to save detailed reports for documentation or sharing.</li>
</ol>

## Browser Compatibility

Page Analyzer works in all modern browsers:

<ul>
<li>Chrome/Edge (Chromium) - Full support</li>
<li>Firefox - Full support</li>
<li>Safari - Full support</li>
</ul>

## Privacy

Page Analyzer runs entirely in your browser. No data is sent to any external
servers. All analysis happens locally on your device.

## Troubleshooting

<dl>
<dt><strong>Panel doesn't appear:</strong></dt>
<dd>
<ul>
<li>Check browser console for errors</li>
<li>Ensure the bookmarklet code is complete and unmodified</li>
<li>Try refreshing the page and clicking the bookmarklet again</li>
</ul>
</dd>

<dt><strong>Network requests not showing:</strong></dt>
<dd>
<ul>
<li>Network Monitor only captures requests made after it's opened</li>
<li>Refresh the page or navigate to trigger new requests</li>
</ul>
</dd>

<dt><strong>Screenshot not working:</strong></dt>
<dd>
<ul>
<li>Some sites with strict Content Security Policy may block screenshots</li>
<li>Try taking element screenshots instead of full page</li>
</ul>
</dd>

<dt><strong>Theme not changing:</strong></dt>
<dd>
<ul>
<li>Clear browser cache and localStorage</li>
<li>Try manually toggling with <kbd>Cmd/Ctrl + Shift + T</kbd></li>
</ul>
</dd>
</dl>

## Support

For issues, feature requests, or contributions, please visit the
<a href="https://github.com/damionrashford/page-analyzer">GitHub repository</a>.

## License

MIT License - See LICENSE file for details.
