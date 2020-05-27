var data = createData().stu;
var showcon = document.getElementById("showCon");
var hiddenDiv = showcon.getElementsByClassName('rect');
var countdown = document.getElementById("countdown"); //倒计时

var startBtn = document.getElementById("start"); //

var confirmBtn = document.getElementById("confirm");

var selectGroup = document.getElementById("selectGroup");
var result = document.getElementById("result"); //选课结果文本

var subChartBtn = document.getElementById("subChart"); //单科统计图按钮
var arrChartBtn = document.getElementById("arrChart"); //科目组合统计图按钮

var subjects = ["物理", "历史", "生物", "化学", "地理", "政治"]; //化学,历史,地理,政治,物理,生物
var allSubject = ["历史,生物,化学", "历史,生物,地理", "历史,生物,政治", "历史,地理,化学", "历史,政治,化学", "历史,地理,政治",
  "物理,生物,化学", "物理,生物,地理", "物理,生物,政治", "物理,地理,化学", "物理,政治,化学", "物理,地理,政治", "未选课"
];
var chartShow = echarts.init(document.getElementById("chartShow")); //统计图容器
var navUl = document.getElementById("navUl");
var navLi = navUl.getElementsByTagName("li")[1];



startBtn.onclick = function () {
  setCountdown();
  toTop(1);
}

confirmBtn.onclick = function () {
  var arr = selectedVal(selectGroup);
  result.innerHTML = '[' + arr.join(',') + ']';
  toTop(2);
}


//指定div的z-index置顶
function toTop (index) {
  for (var i = 0; i < hiddenDiv.length; i++) {
    hiddenDiv[i].style.zIndex = "0"
  }
  hiddenDiv[index].style.zIndex = "1";
}

//倒计时
function setCountdown () {
  var count = 1800;
  setInterval(function () {
    count = count - 1;
    var minute = parseInt(count / 60);
    var second = parseInt(count % 60);
    second = second > 10 ? second : "0" + second;
    countdown.innerHTML = minute + ':' + second;
  }, 1000);
}


changeSel.onchange = function () {
  var subjects = ["生物", "化学", "地理", "政治"]; //下拉框预设科目
  subjects.splice(isExist(subjects, this.value), 1) //从预设科目中删除选中科目
  createOption(insertOpiton, subjects);
}

//获取div下所有下拉框选中的值
function selectedVal (oDiv) {
  var arr = [];
  var selects = oDiv.getElementsByTagName("select");
  for (var i = 0; i < selects.length; i++) {
    arr.push(selects[i].value);
  }
  return arr;
}



//给指定下拉框插入选项
function createOption (oSelect, arr) {
  oSelect.options.length = 0;
  for (var i in arr) {
    oSelect.options.add(new Option(arr[i], arr[i]));
  }
}


//查询数组中是否含有指定值
function isExist (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (val === arr[i]) {
      return i;
    }
  }
  return -1;
}

//点击左侧列表刷新表格
navLi.onclick = function () {
  show();
}

//单科统计图按钮
subChartBtn.onclick = function () {
  show(); //显示单科图

}
//显示单科统计图
function show () {
  chartShow.clear();
  var count = subjectCount(subjects, data); //每科人数
  var arr = toArray(subjects, count);
  chartShow.setOption(createChart(arr));
}

//组合统计图按钮
arrChartBtn.onclick = function () {
  var count = AllsubCount(allSubject, data);
  var arr = toArray(allSubject, count);
  chartShow.setOption(createChart(arr));
}

//统计每个组合的人数
function AllsubCount (cols, data) {
  //遍历cols,查询每个组合的人数,存入数组]
  var tempCols = []; //不能在原来数组上修改
  var count = [];
  for (var i = 0; i < cols.length; i++) {
    tempCols[i] = cols[i].split(",");
  }

  for (var i = 0; i < tempCols.length; i++) {
    var temp = findAll(tempCols[i], data);
    count.push(temp.length);
  }

  return count;
}


//查找组合 (返回含有指定组合的学生集合)
function findAll (subArray, tbodyData) {
  var returnObj = [];
  for (var i = 0; i < tbodyData.length; i++) {
    var str = tbodyData[i].subjects;
    var arr = str.replace().split(","); //subjects为字符串，要转成数组
    arr = arr.sort();
    subArray = subArray.sort();
    if (subArray.join("") == arr.join("")) {
      returnObj.push(tbodyData[i]);
    }
  }
  return returnObj;
}

//生成二维组数 (科目,人数)
function toArray (subjects, count) {
  var arr = [];
  for (var i = 0; i < subjects.length; i++) {
    var temp = [];
    temp.push(subjects[i]);
    temp.push(count[i]);
    arr.push(temp);
  }
  return arr;
}


//统计每个科目的人数 
function subjectCount (cols, data) {
  var count = [];
  for (var i = 0; i < cols.length; i++) {
    var objs = findOne(cols[i], data);
    count.push(objs.length);
  }
  return count;
}


//查找单科 (返回含有指定科目的学生集合)
function findOne (sub, tbodyData) {
  var returnObj = [];
  for (var i = 0; i < tbodyData.length; i++) {
    var str = tbodyData[i].subjects;
    var arr = str.replace().split(","); //subjects为字符串，要转成数组
    if (isExist(arr, sub) != -1) {
      returnObj.push(tbodyData[i]);
    }
  }
  return returnObj;
}