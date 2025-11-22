import { initDOMInspector } from './dom-inspector.js';
import { initNetworkMonitor } from './network-monitor.js';
import { initPerformanceAnalyzer } from './performance.js';
import { initConsoleCapture } from './console-capture.js';
import { initStorageInspector } from './storage-inspector.js';
import { initPageInfo } from './page-info.js';
import { initAccessibilityAudit } from './accessibility.js';
import { initSEOAnalyzer } from './seo.js';
import { initSecurityChecker } from './security.js';

export function initTools(overlay) {
  const panels = {
    dom: document.getElementById('panel-dom'),
    network: document.getElementById('panel-network'),
    performance: document.getElementById('panel-performance'),
    console: document.getElementById('panel-console'),
    storage: document.getElementById('panel-storage'),
    info: document.getElementById('panel-info'),
    accessibility: document.getElementById('panel-accessibility'),
    seo: document.getElementById('panel-seo'),
    security: document.getElementById('panel-security')
  };

  if (panels.dom) initDOMInspector(panels.dom);
  if (panels.network) initNetworkMonitor(panels.network);
  if (panels.performance) initPerformanceAnalyzer(panels.performance);
  if (panels.console) initConsoleCapture(panels.console);
  if (panels.storage) initStorageInspector(panels.storage);
  if (panels.info) initPageInfo(panels.info);
  if (panels.accessibility) initAccessibilityAudit(panels.accessibility);
  if (panels.seo) initSEOAnalyzer(panels.seo);
  if (panels.security) initSecurityChecker(panels.security);
}

