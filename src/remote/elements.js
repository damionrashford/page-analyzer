import { RemoteElement } from '@remote-dom/core/elements';

export function defineRemoteElements() {
  if (customElements.get('analyzer-panel')) {
    return;
  }

  class AnalyzerPanel extends RemoteElement {
    static get remoteAttributes() {
      return ['position', 'width', 'height', 'theme'];
    }

    static get remoteProperties() {
      return {
        minimized: { type: Boolean },
        draggable: { type: Boolean }
      };
    }
  }

  class AnalyzerTab extends RemoteElement {
    static get remoteAttributes() {
      return ['active', 'label', 'icon'];
    }

    static get remoteEvents() {
      return ['click', 'close'];
    }
  }

  class AnalyzerButton extends RemoteElement {
    static get remoteAttributes() {
      return ['variant', 'disabled', 'icon'];
    }

    static get remoteEvents() {
      return ['click'];
    }
  }

  class AnalyzerInput extends RemoteElement {
    static get remoteAttributes() {
      return ['type', 'placeholder', 'value'];
    }

    static get remoteEvents() {
      return ['input', 'change', 'focus', 'blur'];
    }
  }

  class AnalyzerSelect extends RemoteElement {
    static get remoteAttributes() {
      return ['value', 'multiple'];
    }

    static get remoteEvents() {
      return ['change'];
    }
  }

  class AnalyzerTable extends RemoteElement {
    static get remoteAttributes() {
      return ['sortable', 'filterable'];
    }
  }

  class AnalyzerTree extends RemoteElement {
    static get remoteAttributes() {
      return ['expanded'];
    }

    static get remoteEvents() {
      return ['select', 'expand', 'collapse'];
    }
  }

  class AnalyzerCode extends RemoteElement {
    static get remoteAttributes() {
      return ['language', 'theme'];
    }
  }

  class AnalyzerCommandPalette extends RemoteElement {
    static get remoteEvents() {
      return ['command', 'close'];
    }
  }

  customElements.define('analyzer-panel', AnalyzerPanel);
  customElements.define('analyzer-tab', AnalyzerTab);
  customElements.define('analyzer-button', AnalyzerButton);
  customElements.define('analyzer-input', AnalyzerInput);
  customElements.define('analyzer-select', AnalyzerSelect);
  customElements.define('analyzer-table', AnalyzerTable);
  customElements.define('analyzer-tree', AnalyzerTree);
  customElements.define('analyzer-code', AnalyzerCode);
  customElements.define('analyzer-command-palette', AnalyzerCommandPalette);
}

