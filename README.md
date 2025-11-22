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

### Quick Install

**Open the installation page to get started:**

<div align="center" style="margin: 20px 0; padding: 20px;">

<a href="https://damionrashford.github.io/page-analyzer/install.html" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; border: 1px solid #218838; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🚀
Open Installation Page</a>

</div>

> **Note:** Click the button above to open the installation page in your browser
> with a draggable bookmarklet button and detailed instructions.

## Usage

### Opening Page Analyzer

1. Navigate to any webpage you want to analyze
2. Click the "Page Analyzer" bookmarklet in your bookmarks bar
3. The analyzer panel will appear in the bottom-right corner

### Using the Panel

- **Drag**: Click and drag the header to move the panel
- **Resize**: Drag the bottom-right corner to resize
- **Minimize**: Click the minimize button (−) to collapse
- **Maximize**: Click the maximize button (□) to fill the screen
- **Close**: Click the close button (×) to hide the panel

### Navigating Tabs

Click any tab at the top to switch between tools:

- 🔍 **DOM** - Inspect page elements
- 🌐 **Network** - Monitor network requests
- ⚡ **Performance** - View performance metrics
- 💬 **Console** - View console logs
- 💾 **Storage** - Inspect storage
- ℹ️ **Info** - Page information
- ♿ **A11y** - Accessibility audit
- 🔎 **SEO** - SEO analysis
- 🔒 **Security** - Security check

### Keyboard Shortcuts

- **<kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd>** - Open command palette (quick access to
  all features)
- **<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd>** - Switch to DOM
  Inspector
- **<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>** - Switch to Network
  Monitor
- **<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>** - Switch to
  Performance
- **<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd>** - Switch to Console
- **<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>** - Switch to Storage
- **<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd>** - Toggle dark/light
  theme
- **<kbd>Escape</kbd>** - Close command palette or close panel

### Command Palette

Press <kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd> to open the command palette. Type to
search for:

- Open any tool tab
- Toggle theme
- Export data
- Take screenshots
- And more...

Use arrow keys to navigate, Enter to select, Escape to close.

### Exporting Data

Most tools include export functionality:

- **Network**: Export as HAR file
- **Performance**: Export as JSON
- **Console**: Export logs as JSON
- **Accessibility**: Export report as JSON
- **SEO**: Export report as JSON
- **Security**: Export report as JSON

Click the "Export" button in any tool to download the data.

### Taking Screenshots

- **Full Page**: Use command palette (<kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd>) →
  "Take Screenshot"
- **Element Screenshot**: In DOM Inspector, select an element, then click
  "Screenshot Element" button

### Theme

The analyzer automatically detects your system theme preference. You can
manually toggle between dark and light themes:

- Use keyboard shortcut: <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd>
- Or use command palette: <kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd> → "Toggle Theme"

Your theme preference is saved and will persist across sessions.

## Tips

1. **DOM Inspector**: Hover over elements on the page to see them highlighted.
   Click to select and view properties.
2. **Network Monitor**: Starts capturing immediately when opened. Click "Clear"
   to reset the log.
3. **Performance**: Metrics are calculated from page load. Refresh the page
   after opening the analyzer for most accurate results.
4. **Console**: Captures logs in real-time. Use the filter dropdown to show only
   specific log levels.
5. **Storage**: Double-click any value to edit it. Changes are saved
   immediately.
6. **Accessibility/SEO/Security**: Click "Export" to save detailed reports for
   documentation or sharing.

## Browser Compatibility

Page Analyzer works in all modern browsers:

- Chrome/Edge (Chromium) - Full support
- Firefox - Full support
- Safari - Full support

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
<li>Try manually toggling with <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></li>
</ul>
</dd>
</dl>

## Support

For issues, feature requests, or contributions, please visit the
[GitHub repository](https://github.com/damionrashford/page-analyzer).

## License

MIT License - See LICENSE file for details.
