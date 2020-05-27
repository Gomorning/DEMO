data = createData();  //初始化学生选课假数据
console.log(data);
var loginBtn = document.getElementById("login");
var singleSub = document.getElementById("singleSub");
var subject = singleSub.getElementsByTagName("input");//选项
var username = document.getElementById('username');
var password = document.getElementById('password');


loginBtn.onclick = function () {
  window.event.returnValue = false;  //取消请求
  if (!username.value || !password.value) {
    alert('用户名和密码不能为空哦')
  } else {
    for (var i = 0; i < subject.length; i++) {
      if (subject[i].checked) {
        //学生账号密码
        if (subject[i].value == 'student') {
          if (username.value == '123' && password.value == '123') {
            window.location.href = 'html/' + subject[i].value + '.html';
          } else {
            alert('用户名或密码错误')
          }
        }
        //老师账号密码
        if (subject[i].value == 'teacher') {
          if (username.value == '1234' && password.value == '1234') {
            window.location.href = 'html/' + subject[i].value + '.html';
          } else {
            alert('用户名或密码错误')
          }

        }
      }
    }
  }
}
