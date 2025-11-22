export function initSecurityChecker(panel) {
  const container = document.createElement('div');
  container.style.cssText = 'height: 100%; overflow-y: auto; padding: 16px;';

  const results = checkSecurity();

  const scoreCard = createSecurityScoreCard(results.score);
  const headersSection = createHeadersSection(results.headers);
  const issuesSection = createIssuesSection(results.issues);
  const recommendationsSection = createRecommendationsSection(results.recommendations);

  container.appendChild(scoreCard);
  container.appendChild(headersSection);
  container.appendChild(issuesSection);
  container.appendChild(recommendationsSection);

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Security Report';
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
  exportBtn.addEventListener('click', () => exportSecurityReport(results));

  container.appendChild(exportBtn);
  panel.appendChild(container);
}

function checkSecurity() {
  let score = 100;
  const issues = [];
  const recommendations = [];
  const headers = {};

  if (window.location.protocol !== 'https:') {
    issues.push({
      type: 'error',
      message: 'Not using HTTPS',
      fix: 'Use HTTPS for secure connections'
    });
    score -= 20;
  }

  if (!window.isSecureContext) {
    issues.push({
      type: 'error',
      message: 'Not in secure context',
      fix: 'Ensure page is served over HTTPS'
    });
    score -= 15;
  }

  const mixedContent = document.querySelectorAll('img[src^="http://"], script[src^="http://"], link[href^="http://"], iframe[src^="http://"]');
  if (mixedContent.length > 0) {
    issues.push({
      type: 'error',
      message: `${mixedContent.length} mixed content resource(s) detected`,
      fix: 'Use HTTPS for all resources'
    });
    score -= mixedContent.length * 5;
  }

  const insecureForms = document.querySelectorAll('form[action^="http://"]');
  if (insecureForms.length > 0) {
    issues.push({
      type: 'error',
      message: `${insecureForms.length} form(s) submitting to insecure endpoint`,
      fix: 'Use HTTPS for form submissions'
    });
    score -= insecureForms.length * 10;
  }

  const externalScripts = Array.from(document.querySelectorAll('script[src]')).filter(script => {
    const src = script.getAttribute('src');
    return src.startsWith('http') && !src.startsWith(window.location.origin);
  });

  if (externalScripts.length > 0) {
    recommendations.push({
      message: `${externalScripts.length} external script(s) loaded`,
      fix: 'Consider using Subresource Integrity (SRI) for external scripts'
    });
  }

  const inlineScripts = document.querySelectorAll('script:not([src])');
  if (inlineScripts.length > 0) {
    recommendations.push({
      message: `${inlineScripts.length} inline script(s) found`,
      fix: 'Consider using Content Security Policy to restrict inline scripts'
    });
  }

  if (score < 0) score = 0;

  return { score, headers, issues, recommendations };
}

function createSecurityScoreCard(score) {
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
  label.textContent = 'Security Score';
  label.style.cssText = 'font-size: 14px; color: var(--analyzer-text-secondary, #666);';

  card.appendChild(scoreValue);
  card.appendChild(label);
  return card;
}

function createHeadersSection(headers) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Security Headers';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const note = document.createElement('div');
  note.textContent = 'Note: Security headers are checked server-side. Some headers may not be visible from client-side JavaScript.';
  note.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #999); margin-bottom: 12px; padding: 8px; background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02)); border-radius: 4px;';

  const recommendedHeaders = [
    { name: 'Content-Security-Policy', description: 'Prevents XSS attacks' },
    { name: 'X-Frame-Options', description: 'Prevents clickjacking' },
    { name: 'X-Content-Type-Options', description: 'Prevents MIME sniffing' },
    { name: 'Strict-Transport-Security', description: 'Enforces HTTPS' },
    { name: 'Referrer-Policy', description: 'Controls referrer information' },
    { name: 'Permissions-Policy', description: 'Controls browser features' }
  ];

  const list = document.createElement('div');
  list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

  recommendedHeaders.forEach(header => {
    const item = document.createElement('div');
    item.style.cssText = 'padding: 12px; background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02)); border-radius: 4px;';

    const name = document.createElement('div');
    name.textContent = header.name;
    name.style.cssText = 'font-weight: 600; color: var(--analyzer-text, #333); font-size: 13px; margin-bottom: 4px;';

    const desc = document.createElement('div');
    desc.textContent = header.description;
    desc.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666);';

    item.appendChild(name);
    item.appendChild(desc);
    list.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(note);
  section.appendChild(list);
  return section;
}

function createIssuesSection(issues) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = `Security Issues (${issues.length})`;
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const list = document.createElement('div');
  list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

  issues.forEach(issue => {
    const item = document.createElement('div');
    item.style.cssText = `
      padding: 12px;
      background: rgba(244, 67, 54, 0.1);
      border-left: 3px solid #f44336;
      border-radius: 4px;
    `;

    const type = document.createElement('div');
    type.textContent = issue.type.toUpperCase();
    type.style.cssText = `
      font-size: 11px;
      font-weight: 600;
      color: #f44336;
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
    empty.textContent = 'No security issues detected!';
    empty.style.cssText = 'padding: 16px; text-align: center; color: var(--analyzer-text-secondary, #999);';
    list.appendChild(empty);
  }

  section.appendChild(title);
  section.appendChild(list);
  return section;
}

function createRecommendationsSection(recommendations) {
  const section = document.createElement('div');
  section.style.cssText = 'margin-bottom: 24px;';

  const title = document.createElement('h3');
  title.textContent = 'Recommendations';
  title.style.cssText = 'font-size: 16px; font-weight: 600; margin-bottom: 12px;';

  const list = document.createElement('div');
  list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

  const defaultRecommendations = [
    'Implement Content Security Policy (CSP)',
    'Use HTTPS for all connections',
    'Set secure cookie flags (HttpOnly, Secure, SameSite)',
    'Implement Subresource Integrity (SRI) for external scripts',
    'Use security headers (X-Frame-Options, X-Content-Type-Options, etc.)',
    'Regularly update dependencies to patch vulnerabilities',
    'Implement rate limiting for API endpoints',
    'Validate and sanitize all user inputs'
  ];

  defaultRecommendations.forEach(rec => {
    const item = document.createElement('div');
    item.textContent = rec;
    item.style.cssText = `
      padding: 8px 12px;
      background: var(--analyzer-bg-secondary, rgba(0, 0, 0, 0.02));
      border-radius: 4px;
      color: var(--analyzer-text, #333);
      font-size: 13px;
    `;
    list.appendChild(item);
  });

  recommendations.forEach(rec => {
    const item = document.createElement('div');
    item.style.cssText = `
      padding: 12px;
      background: rgba(33, 150, 243, 0.1);
      border-left: 3px solid #2196F3;
      border-radius: 4px;
    `;

    const message = document.createElement('div');
    message.textContent = rec.message;
    message.style.cssText = 'font-size: 13px; color: var(--analyzer-text, #333); margin-bottom: 4px;';

    const fix = document.createElement('div');
    fix.textContent = `Recommendation: ${rec.fix}`;
    fix.style.cssText = 'font-size: 12px; color: var(--analyzer-text-secondary, #666);';

    item.appendChild(message);
    item.appendChild(fix);
    list.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(list);
  return section;
}

function exportSecurityReport(results) {
  const report = {
    score: results.score,
    headers: results.headers,
    issues: results.issues,
    recommendations: results.recommendations,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    protocol: window.location.protocol,
    secureContext: window.isSecureContext
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `security-report-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

