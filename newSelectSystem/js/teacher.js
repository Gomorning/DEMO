var data = createData().stu;

var stuList = document.getElementsByClassName('stuList');
var searchByNumBtn = document.getElementById("searchByNum"); //查找学号按钮
var searchBySubBtn = document.getElementById("searchBySub"); //查找单科按钮
var searchByArrBtn = document.getElementById("searchByArr"); //查找组合按钮
var noneSubBtn = document.getElementById("noneSub"); //查找未选课按钮
var resetBtns = document.getElementsByClassName("reset"); //重置按钮
var subChartBtn = document.getElementById("subChart"); //单科统计图按钮
var arrChartBtn = document.getElementById("arrChart"); //科目组合统计图按钮
var popDiv = document.getElementById("popBox"); //修改弹框
var submitBtn = document.getElementById("submit"); //修改信息提交按钮;



var selectGroup = document.getElementById("selectGroup");
var selectGourp2 = document.getElementById("selectGroup2"); //修改界面下拉框

var changeSel = document.getElementById("changeSel");
var insertOpiton = document.getElementById("insertOpiton");
var changeSel2 = document.getElementById("changeSel2");
var insertOpiton2 = document.getElementById("insertOpiton2");


var chartShow = echarts.init(document.getElementById("chartShow")); //统计图容器


var navUl = document.getElementById("navUl");
var navLi = navUl.getElementsByTagName("li")[3];
var newIndex = 0; //修改选课学生在数据中的下标


var subjects = ["物理", "历史", "生物", "化学", "地理", "政治"]; //化学,历史,地理,政治,物理,生物
var title = ["学号", "姓名", "性别", "年龄", "籍贯", "选课", "操作"]; //表头信息
var allSubject = ["历史,生物,化学", "历史,生物,地理", "历史,生物,政治", "历史,地理,化学", "历史,政治,化学", "历史,地理,政治",
    "物理,生物,化学", "物理,生物,地理", "物理,生物,政治", "物理,地理,化学", "物理,政治,化学", "物理,地理,政治", "未选课"
];

//修改信息提交按钮
submitBtn.onclick = function() {
    var newSubject = selectedVal(selectGourp2); //获取修改的值
    newSubject = newSubject.join(",");
    data[newIndex].subjects = newSubject; //修改选课
    closeBox();
    reset(stuList, title, data); //刷新
}


//点击左侧列表刷新表格
navLi.onclick = function() {
    show();
}

//单科统计图按钮
subChartBtn.onclick = function() {
    show(); //显示单科图

}


//显示单科统计图
function show() {
    chartShow.clear();
    var count = subjectCount(subjects, data); //每科人数
    var arr = toArray(subjects, count);
    chartShow.setOption(createChart(arr));
}


//组合统计图按钮
arrChartBtn.onclick = function() {
    var count = AllsubCount(allSubject, data);
    var arr = toArray(allSubject, count);
    chartShow.setOption(createChart(arr));
}




//生成二维组数 (科目,人数)
function toArray(subjects, count) {
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
function subjectCount(cols, data) {
    var count = [];
    for (var i = 0; i < cols.length; i++) {
        var objs = findOne(cols[i], data);
        count.push(objs.length);
    }
    return count;
}



//统计每个组合的人数
function AllsubCount(cols, data) {
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




//表格初始化数据
reset(stuList, title, data);

//还原数据按钮
for (var i = 0; i < resetBtns.length; i++) {
    resetBtns[i].onclick = function() {
        reset(stuList, title, data);
    }
}

//导航栏点击
navUl.onclick = function() {
    reset(stuList, title, data);
}

//查找学号按钮
searchByNumBtn.onclick = function() {
    var num = document.getElementById("num");
    var numValue = num.value;
    if (numValue == "") {
        alert("⊙︿⊙请输入查找的学号");
        return;
    }
    var obj = selectByStuNum(numValue, data); //获得该学号匹配的学生对象

    if (!obj) {
        alert("⊙︿⊙找不到该学号的学生,请检查输入是否有误");
        return;
    } else {
        var objString = '[' + JSON.stringify(obj) + ']';
        reset(stuList, title, JSON.parse(objString));
    }

    num.value = "";
}


//查找未选课的学生
noneSubBtn.onclick = function() {
    var objs = findOne("未选课", data);
    reset(stuList, title, objs);
}




//查找单科按钮
searchBySubBtn.onclick = function() {
    var objs = [];
    var singleSub = document.getElementById("singleSub");
    var subject = singleSub.getElementsByTagName("input");
    for (var i = 0; i < subject.length; i++) {
        if (subject[i].checked) {
            objs = findOne(subject[i].value, data);
        }
    }
    // alert(objs.length);
    reset(stuList, title, objs);
}

//查找组合按钮
searchByArrBtn.onclick = function() {
    var subjects = selectedVal(selectGroup); //获取div下三个下拉框选中的科目
    var objs = findAll(subjects, data); //在数据中寻找科目组合
    reset(stuList, title, objs); // 生成数据表格
}






function reset(stuList, theadData, tbodyData) {
    for (var i = 0; i < stuList.length; i++) {
        studentList(stuList[i], theadData, tbodyData);
    }
}


//改变下拉框的值
changeSel.onchange = function() {
    var subjects = ["生物", "化学", "地理", "政治"]; //下拉框预设科目
    subjects.splice(isExist(subjects, this.value), 1) //从预设科目中删除选中科目
    createOption(insertOpiton, subjects);
}


changeSel2.onchange = function() {
    var subjects = ["生物", "化学", "地理", "政治"]; //下拉框预设科目
    subjects.splice(isExist(subjects, this.value), 1) //从预设科目中删除选中科目
    createOption(insertOpiton2, subjects);
}



//给指定下拉框插入选项
function createOption(oSelect, arr) {
    oSelect.options.length = 0;
    for (var i in arr) {
        oSelect.options.add(new Option(arr[i], arr[i]));
    }
}


//获取div下所有下拉框选中的值
function selectedVal(oDiv) {
    var arr = [];
    var selects = oDiv.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
        arr.push(selects[i].value);
    }
    return arr;
}


//查找单科 (返回含有指定科目的学生集合)
function findOne(sub, tbodyData) {
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

//查找组合 (返回含有指定组合的学生集合)
function findAll(subArray, tbodyData) {
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



//传入学号返回学生对象
function selectByStuNum(stuNum, data) {
    var obj = null;
    for (var i = 0; i < data.length; i++) {
        for (let j in data[i]) {
            if (data[i][j] == stuNum) {
                obj = data[i];
            }
        }
    }
    return obj;
}

//传入学号返回学生下标
function selectByStuNum2(stuNum, data) {
    var index = 0;
    for (var i = 0; i < data.length; i++) {
        for (let j in data[i]) {
            if (data[i][j] == stuNum) {
                index = i;
            }
        }
    }
    return index;
}





//Json数据打印表格   
function studentList(oDiv, theadData, tbodyData) {
    //删除oDiv中已存在的表格
    var delTable = oDiv.getElementsByTagName("table")[0];
    if (delTable) {
        delTable.parentNode.removeChild(delTable);
    }

    //创建表格
    var otable = document.createElement("table");

    //创建表头
    var tr = document.createElement("tr"); //
    for (var i in theadData) {
        var th = document.createElement("th");
        var txt = document.createTextNode(theadData[i]);
        th.appendChild(txt);
        tr.appendChild(th);
    }
    otable.appendChild(tr);

    //创建表体
    for (var i = 0; i < tbodyData.length; i++) {
        var tr = document.createElement("tr");

        for (let j in tbodyData[i]) {
            var td = document.createElement("td");
            var txt = document.createTextNode(tbodyData[i][j]);
            td.appendChild(txt);
            tr.appendChild(td);
            otable.appendChild(tr);
        }

        //每行添加一个修改按钮         
        var td = document.createElement("td");
        var modifyBtn = document.createElement("button");
        modifyBtn.className = "btn btn-warning";
        modifyBtn.innerHTML = "修改";
        modifyBtn.onclick = modifyBtnClick; //给每个修改按钮添加点击事件
        td.appendChild(modifyBtn);
        tr.appendChild(td);
    }
    oDiv.appendChild(otable);
}




//查询数组中是否含有指定值
function isExist(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (val === arr[i]) {
            return i;
        }
    }
    return -1;
}



/*点击弹出按钮*/
function popBox() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    popBox.style.display = "block";
    popLayer.style.display = "block";
};

/*点击关闭按钮*/
function closeBox() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    popBox.style.display = "none";
    popLayer.style.display = "none";
}


//学生表格中修改按钮的点击事件
function modifyBtnClick() {
    popBox();
    var parent = this.parentNode.parentNode
    var stuNum = parent.firstChild.innerHTML;
    newIndex = selectByStuNum2(stuNum, data); //获取该学生在json数据里的下标
}