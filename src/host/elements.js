export function defineHostElements() {
  if (customElements.get('analyzer-panel')) {
    return;
  }

  class AnalyzerPanel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: block;
          position: fixed;
          background: var(--analyzer-bg, rgba(255, 255, 255, 0.95));
          backdrop-filter: blur(10px);
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .panel-content {
          padding: 16px;
        }
      `;

      const content = document.createElement('div');
      content.className = 'panel-content';
      content.innerHTML = '<slot></slot>';

      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(content);
    }
  }

  class AnalyzerTab extends HTMLElement {
    static get observedAttributes() {
      return ['active', 'label'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }

      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: inline-block;
          padding: 8px 16px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          color: var(--analyzer-text, #333);
        }
        :host([active]) {
          border-bottom-color: var(--analyzer-primary, #0066cc);
          color: var(--analyzer-primary, #0066cc);
        }
      `;

      const slot = document.createElement('slot');
      
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(slot);
    }
  }

  class AnalyzerButton extends HTMLElement {
    static get observedAttributes() {
      return ['variant', 'disabled'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }

      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: inline-block;
        }
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.2s;
        }
        button:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        button.primary {
          background: var(--analyzer-primary, #0066cc);
          color: white;
        }
        button.secondary {
          background: var(--analyzer-secondary, #f0f0f0);
          color: var(--analyzer-text, #333);
        }
      `;

      const button = document.createElement('button');
      button.className = this.getAttribute('variant') || 'primary';
      button.disabled = this.hasAttribute('disabled');
      button.innerHTML = '<slot></slot>';

      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(button);
    }
  }

  customElements.define('analyzer-panel', AnalyzerPanel);
  customElements.define('analyzer-tab', AnalyzerTab);
  customElements.define('analyzer-button', AnalyzerButton);
}

