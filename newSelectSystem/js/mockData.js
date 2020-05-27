//需要数据的页面在头部引用这个文件

//生成假数据
function createData(){
    data = Mock.mock({
        "stu|100": [{
            "stuNum|+1": 5187101201,
            "stuName": "@cname",
            "gender|1": ["男", "女"],
            "age|20-25": 1,
            "fromCity": "@province" + "@city",
            "subjects|1":["历史,生物,化学","历史,生物,地理","历史,生物,政治","历史,地理,化学","历史,政治,化学","历史,地理,政治",
                        "物理,生物,化学","物理,生物,地理","物理,生物,政治","物理,地理,化学","物理,政治,化学","物理,地理,政治","未选课",
                        "未选课","未选课","未选课",],
        }]
    });
    return data;
}


//生成柱状图  传入二维数组形如[["attribute ",number],["attribute",number]]
function createChart(arr) {
    var option = {
        legend: {},
        tooltip: {},
        dataset: {
            source: arr
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
            { type: 'bar' },
        ]
    };
    return option;
}


