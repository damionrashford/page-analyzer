export function createTabs() {
  const tabsContainer = document.createElement('div');
  tabsContainer.style.cssText = `
    display: flex;
    gap: 4px;
    padding: 8px 16px 0;
    border-bottom: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    overflow-x: auto;
  `;

  const tabs = [
    { id: 'dom', label: 'DOM', icon: '🔍' },
    { id: 'network', label: 'Network', icon: '🌐' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'console', label: 'Console', icon: '💬' },
    { id: 'storage', label: 'Storage', icon: '💾' },
    { id: 'info', label: 'Info', icon: 'ℹ️' },
    { id: 'accessibility', label: 'A11y', icon: '♿' },
    { id: 'seo', label: 'SEO', icon: '🔎' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  let activeTab = localStorage.getItem('analyzer-active-tab') || 'dom';

  tabs.forEach(tab => {
    const tabElement = document.createElement('analyzer-tab');
    tabElement.setAttribute('label', tab.label);
    tabElement.setAttribute('icon', tab.icon);
    if (tab.id === activeTab) {
      tabElement.setAttribute('active', '');
    }

    tabElement.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--analyzer-text-secondary, #666);
      font-size: 13px;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
      white-space: nowrap;
    `;

    tabElement.innerHTML = `${tab.icon} ${tab.label}`;

    tabElement.addEventListener('click', () => {
      tabsContainer.querySelectorAll('analyzer-tab').forEach(t => t.removeAttribute('active'));
      tabElement.setAttribute('active', '');
      activeTab = tab.id;
      localStorage.setItem('analyzer-active-tab', activeTab);
      
      const event = new CustomEvent('tab-change', { detail: { tabId: tab.id } });
      tabsContainer.dispatchEvent(event);
    });

    tabsContainer.appendChild(tabElement);
  });

  return tabsContainer;
}

