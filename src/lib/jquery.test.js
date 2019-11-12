console.log('this is a');

$('#app').html('Hello Word!')
// $('#app').click(() => {
//   alert('页面被点击了!');
// });

exports.getInfos = function (data) {
  console.log('获取信息:', data);
  return data;
}