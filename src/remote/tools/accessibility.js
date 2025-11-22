export function initAccessibilityAudit(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; overflow-y: auto; padding: 16px;';

  const results = runAccessibilityAudit();

  const scoreCard = createScoreCard(results.score);
  const issuesList = createIssuesList(results.issues);
  const recommendations = createRecommendations(results.recommendations);

  container.appendChild(scoreCard);
  container.appendChild(issuesList);
  container.appendChild(recommendations);

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Accessibility Report';
  exportBtn.style.cssText = `
    padding: 8px 16px;
    margin-top: 16px;
    border: 1px solid var(--analyzer-border, rgba(0, 0, 0, 0.1));
    border-radius: 4px;
    background: var(--analyzer-primary, #0066cc);
    color: white;
    cursor: pointer;
    font-size: 14px;
  `;
  exportBtn.addEventListener('click', () => exportAccessibilityReport(results));

  container.appendChild(exportBtn);
  panel.appendChild(container);
}

function runAccessibilityAudit() {
  const issues = [];
  const recommendations = [];
  let score = 100;

  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push({
        type: 'error',
        element: img,
        message: 'Image missing alt text',
        fix: 'Add alt attribute to image'
      });
      score -= 2;
    }
  });

  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  if (headings.length === 0) {
    issues.push({
      type: 'warning',
      message: 'No heading elements found',
      fix: 'Add heading elements to structure content'
    });
    score -= 5;
  }

  const h1Count = document.querySelectorAll('h1').length;
  if (h1Count === 0) {
    issues.push({
      type: 'error',
      message: 'No H1 heading found',
      fix: 'Add an H1 heading to the page'
    });
    score -= 5;
  } else if (h1Count > 1) {
    issues.push({
      type: 'warning',
      message: 'Multiple H1 headings found',
      fix: 'Use only one H1 heading per page'
    });
    score -= 2;
  }

  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach(el => {
    if (!el.getAttribute('aria-label') && !el.textContent.trim() && !el.getAttribute('title')) {
      if (el.tagName === 'BUTTON' || el.tagName === 'A') {
        issues.push({
          type: 'error',
          element: el,
          message: `${el.tagName} missing accessible label`,
          fix: 'Add aria-label, text content, or title attribute'
        });
        score -= 3;
      }
    }
  });

  const formInputs = document.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    if (!input.id && !input.getAttribute('aria-label')) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
        issues.push({
          type: 'error',
          element: input,
          message: 'Form input missing label',
          fix: 'Add label element or aria-label attribute'
        });
        score -= 2;
      }
    }
  });

  const colorContrastIssues = checkColorContrast();
  issues.push(...colorContrastIssues);
  score -= colorContrastIssues.length * 1;

  const ariaIssues = checkARIA();
  issues.push(...ariaIssues);
  score -= ariaIssues.length * 1;

  if (score < 0) score = 0;

  return { score, issues, recommendations };
}

function checkColorContrast() {
  const issues = [];
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, li, td, th');
  
  textElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    const color = styles.color;
    const bgColor = styles.backgroundColor;
    
    if (color && bgColor && color !== 'rgba(0, 0, 0, 0)' && bgColor !== 'rgba(0, 0, 0, 0)') {
      const contrast = calculateContrast(color, bgColor);
      if (contrast < 4.5) {
        issues.push({
          type: 'warning',
          element: el,
          message: `Low color contrast: ${contrast.toFixed(2)}:1`,
          fix: 'Increase contrast ratio to at least 4.5:1'
        });
      }
    }
  });

  return issues;
}

function calculateContrast(color1, color2) {
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0.5;
    const [r, g, b] = rgb.map(val => {
      val = parseInt(val) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function checkARIA() {
  const issues = [];
  
  const elementsWithAria = document.querySelectorAll('[aria-*]');
  elementsWithAria.forEach(el => {
    const ariaLabel = el.getAttribute('aria-label');
    const ariaLabelledBy = el.getAttribute('aria-labelledby');
    const ariaDescribedBy = el.getAttribute('aria-describedby');
    
    if (ariaLabelledBy && !document.getElementById(ariaLabelledBy)) {
      issues.push({
        type: 'error',
        element: el,
        message: 'aria-labelledby references non-existent element',
        fix: 'Fix or remove aria-labelledby attribute'
      });
    }
    
    if (ariaDescribedBy && !document.getElementById(ariaDescribedBy)) {
      issues.push({
        type: 'error',
        element: el,
        message: 'aria-describedby references non-existent element',
        fix: 'Fix or remove aria-describedby attribute'
      });
    }
  });

  return issues;
}

function createScoreCard(score) {
  const card = document.createElement('div');
  card.style.cssText = `
    padding: 24px;
    background: ${score >= 80 ? 'rgba(76, 175, 80, 0.1)' : score >= 60 ? 'rgba(255, 152, 0, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
    border-radius: 8px;
    text-align: center;
    margin-bottom: 24px;
  `;

  const scoreValue = document.createElement('div');
  scoreValue.textContent = score;
  scoreValue.style.cssText = `
    font-size: 48px;
    font-weight: 700;
    color: ${score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#f44336'};
    margin-bottom: 8px;
  `;

  const label = document.createElement('div');
  label.textContent = 'Accessibility Score';
  label.style.cssText = 'font-size: 14px; color: var(--analyzer-text-secondary, #666);';

  card.appendChild(scoreValue);
  card.appendChild(label);
  return card;
}

function createIssuesList(issues) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = `Issues Found (${issues.length})`;
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const list = document.createElement('div');
  list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

  issues.forEach(issue => {
    const item = document.createElement('div');
    item.style.cssText = `
      padding: 12px;
      background: ${issue.type === 'error' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 152, 0, 0.1)'};
      border-left: 3px solid ${issue.type === 'error' ? '#f44336' : '#ff9800'};
      border-radius: 4px;
    `;

    const type = document.createElement('div');
    type.textContent = issue.type.toUpperCase();
    type.style.cssText = `
      font-size: 11px;
      font-weight: 600;
      color: ${issue.type === 'error' ? '#f44336' : '#ff9800'};
      margin-bottom: 4px;
      text-transform: uppercase;
    `;

    const message = document.createElement('div');
    message.textContent = issue.message;
    message.style.cssText = 'font-size: 13px; color: var(--analyzer-text, #333); margin-bottom: 4px;';

    const fix = document.createElement('div');
    fix.textContent = `Fix: ${issue.fix}`;
    fix.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666);';

    item.appendChild(type);
    item.appendChild(message);
    item.appendChild(fix);
    list.appendChild(item);
  });

  if (issues.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No accessibility issues found!';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    list.appendChild(empty);
  }

  section.appendChild(title);
  section.appendChild(list);
  return section;
}

function createRecommendations(recommendations) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Recommendations';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const list = document.createElement('ul');
  list.style.cssText = 'list-style: none; padding: 0; margin: 0;';

  const defaultRecommendations = [
    'Ensure all images have descriptive alt text',
    'Use semantic HTML elements (header, nav, main, footer)',
    'Provide skip links for keyboard navigation',
    'Ensure form inputs have associated labels',
    'Use ARIA landmarks for page structure',
    'Test with keyboard-only navigation',
    'Test with screen readers'
  ];

  defaultRecommendations.forEach(rec => {
    const item = document.createElement('li');
    item.textContent = rec;
    item.style.cssText = `
      padding: 8px 0;
      padding-left: 20px;
      position: relative;
      color: var(--analyzer-text, #333);
      font-size: 13px;
    `;
    item.style.cssText += 'list-style: none;';
    item.style.cssText += '::before { content: "✓"; position: absolute; left: 0; }';
    list.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(list);
  return section;
}

function exportAccessibilityReport(results) {
  const report = {
    score: results.score,
    issues: results.issues.map(issue => ({
      type: issue.type,
      message: issue.message,
      fix: issue.fix
    })),
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `accessibility-report-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

