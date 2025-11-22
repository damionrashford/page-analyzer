export async function captureScreenshot(element = null) {
  if (element) {
    return captureElementScreenshot(element);
  } else {
    return captureFullPageScreenshot();
  }
}

async function captureElementScreenshot(element) {
  try {
    const html2canvas = await loadHtml2Canvas();
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    return fallbackScreenshot(element, canvas, ctx);
  }
}

async function captureFullPageScreenshot() {
  try {
    const html2canvas = await loadHtml2Canvas();
    const canvas = await html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: document.body.scrollHeight
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return fallbackFullScreenshot(canvas, ctx);
  }
}

function fallbackScreenshot(element, canvas, ctx) {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  
  ctx.fillStyle = style.backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = style.color || '#000000';
  ctx.font = `${style.fontSize || '14px'} ${style.fontFamily || 'Arial'}`;
  ctx.fillText(element.textContent || element.tagName, 10, 20);
  
  return canvas.toDataURL('image/png');
}

function fallbackFullScreenshot(canvas, ctx) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#000000';
  ctx.font = '14px Arial';
  ctx.fillText('Screenshot capture failed. Please try again.', 10, 20);
  
  return canvas.toDataURL('image/png');
}

async function loadHtml2Canvas() {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) {
      resolve(window.html2canvas);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = () => resolve(window.html2canvas);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function downloadScreenshot(dataUrl, filename = `screenshot-${Date.now()}.png`) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
