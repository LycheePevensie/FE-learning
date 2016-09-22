/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var $ = function(id){
    return document.getElementById(id);
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqiCity = $('aqi-city-input').value.trim();
    var aqiValue = $('aqi-value-input').value.replace(/("\s|u00A0")+/g,"");
    if(!aqiCity.match(/^[A-Za-z\u4e00-\u9FA5]+$/)){
        alert('城市名必须为中英文字符!');
        return;
    }
    if(!aqiValue.match(/^\d+$/)){
        alert('aqi指数必须为整数!');
        return;
    }else if(aqiValue>=1000 || aqiValue<=0){
        alert('aqi指数必须在0-1000范围内');
        return;
    }
    aqiData[aqiCity]=aqiValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiList = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for(var city in aqiData){
        aqiList += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='"+city+"'>删除</button></td></tr>";
    }
    $('aqi-table').innerHTML = city ? aqiList : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // dataset法
    delete aqiData[city];

    //parent/child  node法
    //var strCity = city.parentElement.parentElement.firstChild.innerHTML;
    //delete aqiData[strCity];

    renderAqiList();
}

function eventUtil(ele,handler){
    if(ele.addEventListener) {
        ele.addEventListener('click', handler, false);
    }else if(ele.attachEvent){
        ele.attachEvent('onclick',handler);
    }else{
        ele['on'+'click']=handler;
    }
}
function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var _btn = $('add-btn');
    $('aqi-value-input').onkeyup = function(event){
        if(($('aqi-city-input').value!=null) && event.keyCode === 13){
            addBtnHandle();
        }
    }
    eventUtil(_btn,addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var _table = $('aqi-table');
    eventUtil(_table,function(event){
        if(event.target && event.target.nodeName.toLowerCase() === 'button'){
            //dataset法
            delBtnHandle.call(null,event.target.dataset.city);
            //node法
            //delBtnHandle(event.target);
        }
    })
}

init();