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

  // 如果需要提交表单，可以在此添加逻辑，例如调用 form.submit()
});
