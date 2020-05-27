var info = document.getElementById('info')
var shadow = document.getElementById('shadow');
var content = document.getElementById('content');
var resultInfo = document.getElementById('resultInfo');
var count = document.getElementById('count');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = 540;
var height = canvas.height = 540;

var map = [];   //储存所有地图块元素
var mouse = { x: 0, y: 0 };  //鼠标位置
var MAXN = 16;   //地图尺寸 16*16
var size = 32;  //地图块单位尺寸
var role = new Role(0, 0); //新建角色
var start = new mapRect(0, 0);
var timer = null;
var restartMaze = null;
var targ;
var speed = 400;

//地图数组
var Maze =
  [
    ['O', 'X', 'X', '1', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['O', 'O', 'O', 'O', 'O', '1', 'X', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'X'],
    ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'X'],
    ['X', 'O', '2', 'X', 'O', 'X', 'X', 'O', 'O', '2', 'X', 'O', 'X', '1', 'X', 'X'],
    ['X', 'O', 'X', 'X', '1', 'O', '2', 'X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
    ['X', '3', '1', '1', 'O', 'O', 'O', 'X', '2', 'O', 'O', '2', 'X', 'X', 'O', 'X'],
    ['X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', '3', 'X', 'O', 'O', 'X', 'X', 'O', 'X'],
    ['X', 'X', 'X', 'O', 'X', '1', 'X', '1', 'X', 'X', 'X', 'O', 'X', 'O', 'O', 'X'],
    ['X', 'O', 'O', '1', 'O', 'O', 'O', 'X', 'O', '2', '3', '1', 'X', '1', 'O', 'X'],
    ['X', 'O', 'O', '3', 'O', '1', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X'],
    ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'X', 'O', 'O', 'X', '3', 'X'],
    ['X', 'O', '2', 'X', 'O', 'X', 'X', 'O', '3', '2', 'X', 'X', 'O', '1', 'O', 'X'],
    ['X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'X', 'O', '1', 'O', 'X', 'X', 'X'],
    ['X', 'O', '1', 'X', '3', 'O', 'O', 'X', 'O', 'O', 'X', 'X', 'O', 'O', '1', 'X'],
    ['X', 'O', 'O', 'O', 'X', 'O', 'O', 'X', 'O', '1', 'O', 'O', 'O', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ];
var Mazebak =
  [
    ['O', 'X', 'X', '1', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['O', 'O', 'O', 'O', 'O', '1', 'X', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'X'],
    ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'X'],
    ['X', 'O', '2', 'X', 'O', 'X', 'X', 'O', 'O', '2', 'X', 'O', 'X', '1', 'X', 'X'],
    ['X', 'O', 'X', 'X', '1', 'O', '2', 'X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
    ['X', '3', '1', '1', 'O', 'O', 'O', 'X', '2', 'O', 'O', '2', 'X', 'X', 'O', 'X'],
    ['X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', '3', 'X', 'O', 'O', 'X', 'X', 'O', 'X'],
    ['X', 'X', 'X', 'O', 'X', '1', 'X', '1', 'X', 'X', 'X', 'O', 'X', 'O', 'O', 'X'],
    ['X', 'O', 'O', '1', 'O', 'O', 'O', 'X', 'O', '2', '3', '1', 'X', '1', 'O', 'X'],
    ['X', 'O', 'O', '3', 'O', '1', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X'],
    ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'X', 'O', 'O', 'X', '3', 'X'],
    ['X', 'O', '2', 'X', 'O', 'X', 'X', 'O', '3', '2', 'X', 'X', 'O', '1', 'O', 'X'],
    ['X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'X', 'O', '1', 'O', 'X', 'X', 'X'],
    ['X', 'O', '1', 'X', '3', 'O', 'O', 'X', 'O', 'O', 'X', 'X', 'O', 'O', '1', 'X'],
    ['X', 'O', 'O', 'O', 'X', 'O', 'O', 'X', 'O', '1', 'O', 'O', 'O', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ];


/***************算法部分**********************/
var MAXQ = 200;		//队列大小
var newRoute = [];   //人物行走的完整路径

var tools = 0;//获得道具数量
var coins = 0;//获得金币数量
var life = 3;//生命值初始化为3 ，遇到伤害-1, 值为0时，表示死亡
var H = [0, 1, 0, -1];			//水平偏移量
var V = [-1, 0, 1, 0];			//垂直偏移量
var passed = [];  //储存角色走过的路
passed[0] = new Position(role.x + size / 2, role.y + size / 2);


function Position (x, y, pre) {
  this.x = x;
  this.y = y;
  this.pre = pre;
}

var qu = [];					//定义一个队列qu
var front = -1, rear = -1;				//定义队头和队尾
var curr = new Position(0, 0);
var dex = new Position(7, 7);


function disppath (front) {
  newRoute = [];  //清空路径
  for (let i = 0; i < MAXN; i++)				//将所有'*'改为'O'
    for (let j = 0; j < MAXN; j++)
      if (Maze[i][j] == '*')
        Maze[i][j] = 'O';
  let k = front;
  while (k != -1)					//即路径上的方块改为' '
  {
    let mark = Mazebak[qu[k].x][qu[k].y];
    newRoute.push(qu[k])    //把完整的迷宫路径添加到数组
    k = qu[k].pre;
  }
  newRoute.reverse();

}


function BFS (curr, des)			 //求从(x,y)出发的一条迷宫路径
{
  front = -1;
  rear = -1;				//初始化队头和队尾
  var p = curr;
  var p1 = new Position();
  var p2 = new Position();
  p.pre = -1;			//建立入口结点
  Maze[p.x][p.y] = '*';				//改为'*'避免重复查找
  rear++;
  qu[rear] = p;				//入口方块进队
  while (front != rear)				//队不空循环
  {
    //console.log("BFS-front:" + front);

    front++; p1 = qu[front];		//出队方块p1;
    if (p1.x == des.x && p1.y == des.y)	//找到出口
    {
      disppath(front);		//输出路径
      return;
    }
    for (let k = 0; k < 4; k++)		//试探p1的每个相邻方位
    {
      p2.x = p1.x + V[k];			//找到p1的相邻方块p2
      p2.y = p1.y + H[k];
      if (p2.x >= 0 && p2.y >= 0 && p2.x < MAXN && p2.y < MAXN && (Maze[p2.x][p2.y] != 'X' && Maze[p2.x][p2.y] != '*')) {	//方块p2有效并且可走
        Maze[p2.x][p2.y] = '*';	//改为'*'避免重复查找
        p2.pre = front;
        rear++;
        var temp = new Position(p2.x, p2.y, p2.pre);
        qu[rear] = temp;	//方块进队
      }
    }
  }
}
/**********算法部分****************/

//定义角色   x,y记录坐标
function Role (x, y) {
  this.x = x;
  this.y = y;
}

//绘制角色
Role.prototype.draw = function () {
  var img = new Image();
  img.src = loader.P;
  ctx.drawImage(img, this.x, this.y, size, size);
}

Role.prototype.eat = function () {
  for (let i = 0; i < map.length; i++) {
    //检测是否鼠标点击到路径上
    if (isTouch(map[i], this.x + 5, this.y + 5) && map[i].mark != "O") {
      Mazebak[map[i].i][map[i].j] = "O";  //当角色触碰到道具或者金币，让其消失
      switch (map[i].mark) {
        case '1':
          coins++;
          if (coins >= 10) {
            resultInfo.innerHTML = "游戏胜利";
            clearInterval(timer);
            count.innerHTML = coins;
            content.style.filter = 'blur(5px)';
            shadow.style.display = 'block';
          }
          break;
        case '2':
          tools++;
          speed -= 50;   //加速50
          break;
        case '3':
          life--;
          if (life == 0) {
            resultInfo.innerHTML = "游戏结束";
            clearInterval(timer);
            count.innerHTML = coins;
            content.style.filter = 'blur(5px)';
            shadow.style.display = 'block';
          }
          break;
      }
    }
  }
}



canvas.addEventListener('click', function (event) {
  targ = 0;
  clearInterval(timer);
  ctx.strokeStyle = randomColor();  //改变路线颜色
  passed = [];    //清空上一次路线
  passed[0] = new Position(role.x, role.y);//把路径起点设为人物的坐标


  getMouse(canvas, event);   //获取鼠标相对坐标
  for (let i = 0; i < map.length; i++) {
    //检测是否鼠标点击到路径上
    if (isTouch(map[i], mouse.x, mouse.y) && map[i].mark != "X") {
      // console.log("起点：" + start.i + "," + start.j + "   终点：" + map[i].i + "," + map[i].j);
      curr.x = start.i; curr.y = start.j; dex.x = map[i].i; dex.y = map[i].j;
      BFS(curr, dex);
      // console.log(newRoute)
      timer = setInterval(move, speed);//让人物沿着最短路径走
      start = map[i];  //把当前鼠标点设置成起点
      //console.log(map[i].mark);
    }

    if (isTouch(map[i], mouse.x, mouse.y) && map[i].mark == "X")
      alert("墙壁不可以点击哦！");
  }
});

function move () {
  targ++;
  if (targ < newRoute.length) {
    role.x = newRoute[targ].y * size;
    role.y = newRoute[targ].x * size;
    role.draw();
    passed.push(new Position(newRoute[targ].y * size, newRoute[targ].x * size));
    // console.log(passed);//显示走过的路径
  } else {
    clearInterval(timer);
  }
}


//返回(min,max)的随机数
function random (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//返回随机颜色
function randomColor () {
  return 'rgb(' +
    random(0, 255) + ', ' +
    random(0, 255) + ', ' +
    random(0, 255) + ')';
}



//绘制人物走过的路径
function drawPassed () {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.moveTo(passed[0].x + size / 2, passed[0].y + size / 2);
  for (var i = 0; i < passed.length; i++) {
    ctx.lineTo(passed[i].x + size / 2, passed[i].y + size / 2);
    ctx.stroke();
  }
}

//获取鼠标在canvas里的相对坐标
function getMouse (canvas, event) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left * (canvas.width / rect.width);
  mouse.y = event.clientY - rect.top * (canvas.height / rect.height);
}


//检测是否触碰到地图块    
function isTouch (body, x, y) {
  return !(x < body.x || x > (body.x + body.size)
    || y < body.y || y > (body.y + body.size));
}


//根据标记取图片地址
var loader = {
  X: "./img/wall.png",
  O: "./img/route.png",
  1: "./img/coin.png",
  2: "./img/strawberry.png",
  3: "./img/monster.png",
  P: "./img/people.png",
};

//定义地图块   i,j为地图块在数组中对应的下标
function mapRect (i, j, size, mark) {
  this.i = i;
  this.j = j;
  this.x = 0;
  this.y = 0;
  this.size = size;
  this.mark = mark;
}

//绘制地图块
mapRect.prototype.draw = function () {
  var img = new Image();
  this.x = this.j * this.size;  //横坐标
  this.y = this.i * this.size;  //纵坐标
  img.src = loader[this.mark];  //加载图片

  ctx.drawImage(img, this.x, this.y, this.size, this.size);
}


//绘制地图
function initMap (theMap) {
  map.splice(0, map.length);   //清空map里原有的地图块
  for (let i = 0; i < MAXN; i++) {
    for (let j = 0; j < MAXN; j++) {
      var rect = new mapRect(i, j, size, theMap[i][j]);
      rect.draw();
      map.push(rect); //把每个地图块信息存入map
    }
  }
}



//实时刷新函数
function loop () {
  ctx.clearRect(0, 0, 500, 500); //清空画布
  initMap(Mazebak);//绘制地图
  drawPassed();
  role.draw();//绘制人物;
  role.eat();

  info.innerHTML = "当前获得金币:" + coins + " 道具:" + tools + " 生命:" + life;
  window.requestAnimationFrame(loop);
}

loop();