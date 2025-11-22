export function createPanels() {
  const panelsContainer = document.createElement('div');
  panelsContainer.style.cssText = `
    flex: 1;
    overflow: hidden;
    position: relative;
  `;

  const panels = {
    dom: createDOMPanel(),
    network: createNetworkPanel(),
    performance: createPerformancePanel(),
    console: createConsolePanel(),
    storage: createStoragePanel(),
    info: createInfoPanel(),
    accessibility: createAccessibilityPanel(),
    seo: createSEOPanel(),
    security: createSecurityPanel()
  };

  Object.values(panels).forEach(panel => {
    panel.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      display: none;
      padding: 16px;
    `;
    panelsContainer.appendChild(panel);
  });

  const activeTab = localStorage.getItem('analyzer-active-tab') || 'dom';
  if (panels[activeTab]) {
    panels[activeTab].style.display = 'block';
  }

  panelsContainer.addEventListener('tab-change', (e) => {
    Object.values(panels).forEach(panel => {
      panel.style.display = 'none';
    });
    const tabId = e.detail.tabId;
    if (panels[tabId]) {
      panels[tabId].style.display = 'block';
    }
  });

  return panelsContainer;
}

function createDOMPanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-dom';
  panel.innerHTML = '<div>DOM Inspector Panel</div>';
  return panel;
}

function createNetworkPanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-network';
  panel.innerHTML = '<div>Network Monitor Panel</div>';
  return panel;
}

function createPerformancePanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-performance';
  panel.innerHTML = '<div>Performance Analyzer Panel</div>';
  return panel;
}

function createConsolePanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-console';
  panel.innerHTML = '<div>Console Panel</div>';
  return panel;
}

function createStoragePanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-storage';
  panel.innerHTML = '<div>Storage Inspector Panel</div>';
  return panel;
}

function createInfoPanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-info';
  panel.innerHTML = '<div>Page Information Panel</div>';
  return panel;
}

function createAccessibilityPanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-accessibility';
  panel.innerHTML = '<div>Accessibility Audit Panel</div>';
  return panel;
}

function createSEOPanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-seo';
  panel.innerHTML = '<div>SEO Analyzer Panel</div>';
  return panel;
}

function createSecurityPanel() {
  const panel = document.createElement('div');
  panel.id = 'panel-security';
  panel.innerHTML = '<div>Security Headers Panel</div>';
  return panel;
}

