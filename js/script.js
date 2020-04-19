var index = 0;  

// 封装getElementById()
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id;
}

/*  浏览器兼容 封装通用事件绑定方法
    element绑定事件的DOM元素
    事件名
    事件处理程序
*/
function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler)
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler)
    }else{
        element["on"+type] = handler;
    }
}

var options = byId("option-box").getElementsByTagName("span"),
    pics = byId("banner").getElementsByTagName("div"),
    size = pics.length;

// 封装切换图片
function changeImg(){
    // 遍历所有图片,将图片隐藏,将选项卡的类清除
    for(var j=0;j<size;j++){
        pics[j].style.display = "none";
        options[j].className = "";
    }
    // 显示当前图片
    pics[index].style.display = "block";
    // 显示当前选项卡
    options[index].className = "active";
}


// 点击选项卡切换图片
for(var i=0;i<size;i++){
    // 给选项卡设置索引
    options[i].setAttribute("data-id",i);
    // 给选项卡点击事件,获取点击索引,切换图片
    addHandler(options[i],"click",function(){
        index = this.getAttribute("data-id");
        changeImg();
    })
}

var timer = null;
    main = byId("main");
// 自动轮播
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index >= size){
            index = 0;
        }
        changeImg();
    },1000)
}

startAutoPlay();

// 停止轮播
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }

}

// 鼠标滑入main,停止轮播
addHandler(main,"mouseover",stopAutoPlay);
// 鼠标离开main,继续轮播
addHandler(main,"mouseout",startAutoPlay);
