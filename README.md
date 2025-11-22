<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #24292e;
  max-width: 1012px;
  margin: 0 auto;
  padding: 32px;
}
h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 0;
  margin-bottom: 16px;
}
h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 24px;
  margin-bottom: 16px;
}
h3 {
  font-size: 1.25em;
  margin-top: 24px;
  margin-bottom: 16px;
}
p {
  margin-bottom: 16px;
}
ul, ol {
  margin-bottom: 16px;
  padding-left: 2em;
}
li {
  margin-bottom: 8px;
}
a {
  color: #0366d6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
code {
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
}
kbd {
  background-color: #fafbfc;
  border: 1px solid #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
  color: #444d56;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 11px;
  line-height: 10px;
  padding: 3px 5px;
  vertical-align: middle;
}
blockquote {
  border-left: 4px solid #dfe2e5;
  padding: 0 1em;
  color: #6a737d;
  margin-bottom: 16px;
}
dt {
  font-weight: 600;
  margin-top: 16px;
}
dd {
  margin-left: 0;
  margin-bottom: 16px;
}
.button-container {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
}
.bookmarklet-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #28a745;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #218838;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.bookmarklet-button:hover {
  background-color: #218838;
  text-decoration: none;
}
</style>
</head>
<body>

<h1>Page Analyzer</h1>

<p>A powerful browser bookmarklet that provides comprehensive web page analysis and developer tools directly in your browser. Analyze any webpage's DOM structure, network activity, performance metrics, accessibility, SEO, and security - all without leaving the page.</p>

<h2>What is Page Analyzer?</h2>

<p>Page Analyzer is a bookmarklet that adds a professional developer tools overlay to any webpage. Simply click the bookmarklet and instantly access 9 powerful analysis tools in a draggable, resizable panel.</p>

<h2>Features</h2>

<h3>🔍 DOM Inspector</h3>

<ul>
<li>Visual element selection by hovering over the page</li>
<li>Interactive DOM tree viewer</li>
<li>Element properties panel with computed styles</li>
<li>Screenshot individual elements</li>
<li>Real-time element highlighting</li>
</ul>

<h3>🌐 Network Monitor</h3>

<ul>
<li>Intercepts and logs all network requests (fetch and XHR)</li>
<li>View request/response details, timing, and size</li>
<li>Filter by request type</li>
<li>Export network data as HAR file</li>
<li>Click any request to see full details</li>
</ul>

<h3>⚡ Performance Analyzer</h3>

<ul>
<li>Page load metrics (DNS, TCP, SSL, TTFB, download time)</li>
<li>Resource timing for all loaded assets</li>
<li>Paint timing (First Paint, First Contentful Paint)</li>
<li>Memory usage (when available)</li>
<li>Export performance data as JSON</li>
</ul>

<h3>💬 Console Capture</h3>

<ul>
<li>Captures all console logs, errors, warnings, and info messages</li>
<li>Filter logs by level (log, error, warn, info, debug)</li>
<li>View timestamps and stack traces</li>
<li>Export console logs as JSON</li>
<li>Real-time log streaming</li>
</ul>

<h3>💾 Storage Inspector</h3>

<ul>
<li>View and edit localStorage items</li>
<li>View and edit sessionStorage items</li>
<li>View and manage cookies</li>
<li>Edit storage values directly</li>
<li>Delete individual items</li>
</ul>

<h3>ℹ️ Page Information</h3>

<ul>
<li>Complete page metadata (URL, title, protocol, host)</li>
<li>All meta tags with content</li>
<li>Viewport dimensions and device information</li>
<li>Security context information</li>
<li>User agent and browser details</li>
</ul>

<h3>♿ Accessibility Audit</h3>

<ul>
<li>Accessibility score (0-100)</li>
<li>Detects missing alt text on images</li>
<li>Checks heading structure (H1-H6)</li>
<li>Validates form labels and ARIA attributes</li>
<li>Color contrast analysis</li>
<li>Export accessibility report as JSON</li>
</ul>

<h3>🔎 SEO Analyzer</h3>

<ul>
<li>SEO score with detailed analysis</li>
<li>Meta tags validation (title, description, Open Graph)</li>
<li>Heading structure analysis</li>
<li>Image alt text checking</li>
<li>Link analysis (internal/external)</li>
<li>Structured data (JSON-LD) detection</li>
<li>Export SEO report as JSON</li>
</ul>

<h3>🔒 Security Checker</h3>

<ul>
<li>Security score assessment</li>
<li>HTTPS and secure context detection</li>
<li>Mixed content detection</li>
<li>Security headers information</li>
<li>Security recommendations</li>
<li>Export security report as JSON</li>
</ul>

<h3>📸 Screenshot</h3>

<ul>
<li>Capture full page screenshots</li>
<li>Capture individual element screenshots</li>
<li>Automatic download as PNG</li>
<li>Available via command palette</li>
</ul>

<h2>Installation</h2>

<h3>Quick Install</h3>

<p><strong>Open the installation page to get started:</strong></p>

<div class="button-container">
<a href="https://damionrashford.github.io/page-analyzer/install.html" target="_blank" class="bookmarklet-button">🚀 Open Installation Page</a>
</div>

<blockquote>
<p><strong>Note:</strong> Click the button above to open the installation page in your browser with a draggable bookmarklet button and detailed instructions.</p>
</blockquote>

<h3>Manual Installation (Alternative Method)</h3>

<p>If you prefer to install manually:</p>

<p><strong>Step 1: Get the Bookmarklet Code</strong></p>

<ol>
<li>Open the <a href="https://damionrashford.github.io/page-analyzer/install.html" target="_blank">installation page</a></li>
<li>Right-click on the bookmarklet button and select "Copy link address"</li>
<li>This copies the bookmarklet code to your clipboard</li>
</ol>

<p><strong>Step 2: Create the Bookmark</strong></p>

<p><strong>Chrome/Edge:</strong></p>

<ol>
<li>Right-click your bookmarks bar</li>
<li>Select "Add page" or "Add bookmark"</li>
<li>Name it "Page Analyzer"</li>
<li>Paste the bookmarklet code into the URL field</li>
<li>Click "Save"</li>
</ol>

<p><strong>Firefox:</strong></p>

<ol>
<li>Right-click your bookmarks toolbar</li>
<li>Select "New Bookmark"</li>
<li>Name it "Page Analyzer"</li>
<li>Paste the bookmarklet code into the "Location" field</li>
<li>Click "Save"</li>
</ol>

<p><strong>Safari:</strong></p>

<ol>
<li>Right-click your bookmarks bar</li>
<li>Select "Add Bookmark"</li>
<li>Name it "Page Analyzer"</li>
<li>Edit the bookmark and paste the code into the URL field</li>
</ol>

<h2>Usage</h2>

<h3>Opening Page Analyzer</h3>

<ol>
<li>Navigate to any webpage you want to analyze</li>
<li>Click the "Page Analyzer" bookmarklet in your bookmarks bar</li>
<li>The analyzer panel will appear in the bottom-right corner</li>
</ol>

<h3>Using the Panel</h3>

<ul>
<li><strong>Drag</strong>: Click and drag the header to move the panel</li>
<li><strong>Resize</strong>: Drag the bottom-right corner to resize</li>
<li><strong>Minimize</strong>: Click the minimize button (−) to collapse</li>
<li><strong>Maximize</strong>: Click the maximize button (□) to fill the screen</li>
<li><strong>Close</strong>: Click the close button (×) to hide the panel</li>
</ul>

<h3>Navigating Tabs</h3>

<p>Click any tab at the top to switch between tools:</p>

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

<h3>Keyboard Shortcuts</h3>

<ul>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd></strong> - Open command palette (quick access to all features)</li>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd></strong> - Switch to DOM Inspector</li>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd></strong> - Switch to Network Monitor</li>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></strong> - Switch to Performance</li>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd></strong> - Switch to Console</li>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd></strong> - Switch to Storage</li>
<li><strong><kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></strong> - Toggle dark/light theme</li>
<li><strong><kbd>Escape</kbd></strong> - Close command palette or close panel</li>
</ul>

<h3>Command Palette</h3>

<p>Press <kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd> to open the command palette. Type to search for:</p>

<ul>
<li>Open any tool tab</li>
<li>Toggle theme</li>
<li>Export data</li>
<li>Take screenshots</li>
<li>And more...</li>
</ul>

<p>Use arrow keys to navigate, Enter to select, Escape to close.</p>

<h3>Exporting Data</h3>

<p>Most tools include export functionality:</p>

<ul>
<li><strong>Network</strong>: Export as HAR file</li>
<li><strong>Performance</strong>: Export as JSON</li>
<li><strong>Console</strong>: Export logs as JSON</li>
<li><strong>Accessibility</strong>: Export report as JSON</li>
<li><strong>SEO</strong>: Export report as JSON</li>
<li><strong>Security</strong>: Export report as JSON</li>
</ul>

<p>Click the "Export" button in any tool to download the data.</p>

<h3>Taking Screenshots</h3>

<ul>
<li><strong>Full Page</strong>: Use command palette (<kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd>) → "Take Screenshot"</li>
<li><strong>Element Screenshot</strong>: In DOM Inspector, select an element, then click "Screenshot Element" button</li>
</ul>

<h3>Theme</h3>

<p>The analyzer automatically detects your system theme preference. You can manually toggle between dark and light themes:</p>

<ul>
<li>Use keyboard shortcut: <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></li>
<li>Or use command palette: <kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd> → "Toggle Theme"</li>
</ul>

<p>Your theme preference is saved and will persist across sessions.</p>

<h2>Tips</h2>

<ol>
<li><strong>DOM Inspector</strong>: Hover over elements on the page to see them highlighted. Click to select and view properties.</li>
<li><strong>Network Monitor</strong>: Starts capturing immediately when opened. Click "Clear" to reset the log.</li>
<li><strong>Performance</strong>: Metrics are calculated from page load. Refresh the page after opening the analyzer for most accurate results.</li>
<li><strong>Console</strong>: Captures logs in real-time. Use the filter dropdown to show only specific log levels.</li>
<li><strong>Storage</strong>: Double-click any value to edit it. Changes are saved immediately.</li>
<li><strong>Accessibility/SEO/Security</strong>: Click "Export" to save detailed reports for documentation or sharing.</li>
</ol>

<h2>Browser Compatibility</h2>

<p>Page Analyzer works in all modern browsers:</p>

<ul>
<li>Chrome/Edge (Chromium) - Full support</li>
<li>Firefox - Full support</li>
<li>Safari - Full support</li>
</ul>

<h2>Privacy</h2>

<p>Page Analyzer runs entirely in your browser. No data is sent to any external servers. All analysis happens locally on your device.</p>

<h2>Troubleshooting</h2>

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
<li>Try manually toggling with <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></li>
</ul>
</dd>
</dl>

<h2>Support</h2>

<p>For issues, feature requests, or contributions, please visit the <a href="https://github.com/damionrashford/page-analyzer">GitHub repository</a>.</p>

<h2>License</h2>

<p>MIT License - See LICENSE file for details.</p>

</body>
</html>
