// 动态加载 html2canvas
(function loadHtml2Canvas() {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  script.onload = function () {
    console.log("html2canvas loaded successfully.");
    setupScreenshotListener();
  };
  document.head.appendChild(script);
})();

// 设置截图功能
function setupScreenshotListener() {
  function captureScreenshot() {
    html2canvas(document.body, {
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `fullpage_screenshot_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  // 监听用户交互事件
  window.addEventListener('click', captureScreenshot);
  window.addEventListener('keydown', captureScreenshot);
  //window.addEventListener('mousemove', captureScreenshot);

  console.log("Screenshot functionality is ready. Interact with the page to capture.");
}
