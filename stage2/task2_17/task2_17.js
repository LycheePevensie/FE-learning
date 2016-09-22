/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

var $ = function(id){
  return document.getElementById(id);
}

function addHandler(ele,type,handler){
  if(ele.addEventListener) {
    ele.addEventListener(type, handler, false);
  }else if(ele.attachEvent){
    ele.attachEvent('on'+type,handler);
  }else{
    ele['on'+type]=handler;
  }
}

function getWidth(width,num){
  var posObj = {};
  posObj.width = Math.floor(width/(2*num));
  posObj.left = Math.floor(width/num);
  posObj.offsetLeft = (width - posObj.left*(num-1) - posObj.width)/2;
  return posObj;
}

function getHintLeft(posObj,i,width){
  var centerLeft = posObj.left*i + posObj.offsetLeft + posObj.width/2;
  if(centerLeft - 60 <=0){
    return 5;
  }else if(centerLeft + 60 >= width){
    return centerLeft - 110;
  }else{
    return centerLeft-60;
  }
}

function getTitle(){
  switch (pageState.nowGraTime){
    case "day":
          return "每日";
    case "week":
          return "周平均";
    case "month":
          return "月平均";
  }
}
/**
 * 渲染图表
 */
function renderChart() {
  var str = "",i=0;
  var width = $('aqi-chart-wrap').clientWidth;
  var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  var nums =Object.keys(selectedData).length;
  var posObj = getWidth(width,nums);
  var colors = ['#edae9e','#bec3cb','#99b4ce','#393f65','#5a4563','#000'];
  str += '<div class="title">' + pageState.nowSelectCity + '市01-03月' + getTitle() + '空气质量报告</div>';
  for (var key in selectedData){
    var thisColor = colors[Math.floor(selectedData[key]/500*5)];
    str += '<div class="aqi-bar ' + pageState.nowGraTime + '"style="height:' + selectedData[key] + 'px; width:' + posObj.width + 'px; left:' + (posObj.left*i +posObj.offsetLeft) + 'px; background-color:' + thisColor + ';"></div>';
    str += '<div class="aqi-hint " style="bottom:' + (selectedData[key]+10) + 'px; left:' + getHintLeft(posObj,i++,width) + 'px;">' + key +'<br/> [AQI]:' + selectedData[key] + '</div>';
  }
  $('aqi-chart-wrap').innerHTML = str;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
  var value = radio.value;
  var item = radio.previousElementSibling;
  var items = $('form-gra-time').getElementsByTagName('span');
  // 确定是否选项发生了变化
  for(var i= 0;i<items.length;i++){
    items[i].className = "";
  }
  item.className = "selected";
  if(value !== pageState.nowGraTime) {
    // 设置对应数据
    pageState.nowGraTime = value;
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city = this.value;
  // 设置对应数据
  if(city !== pageState.nowSelectCity){
    pageState.nowSelectCity = city;
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio = document.getElementsByName('gra-time');
  for (var i = 0; i < radio.length; i++) {
    (function (m) {
      addHandler(radio[m], 'click', function () {
        graTimeChange(radio[m])
      })
    })(i);
  }
  //radio.forEach(function(ele){
  //  addHandler(ele,'click',function(){graTimeChange(ele)});
  //  });
  addHandler(document,'mouseover',function(event){
    var ele = event.target;
    ele.className += " show";
  });
  addHandler(document,'mouseout',function(event){
    var ele = event.target;
    ele.className = ele.className.replace(/show/,"");
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityArr = Object.getOwnPropertyNames(aqiSourceData);
  var htmlArr = cityArr.map(function(item){
    return "<option>" + item + "</option>";
  });
  pageState.nowSelectCity = cityArr[0];
  $('city-select').innerHTML = htmlArr.join("");
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addHandler($('city-select'),'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var week = {}, count = 0, singleWeek = {},
      month ={}, mcount = 0, singleMonth ={};
  for(var key in aqiSourceData){
    var records = aqiSourceData[key];
    var dataArr = Object.getOwnPropertyNames(records);
    var tempMonth = dataArr[0].slice(5,7);
    var weekInit = 4, weekCount = 0;
    for(var i=0;i<dataArr.length;i++,weekInit++){
      count += records[dataArr[i]];
      mcount += records[dataArr[i]];
      weekCount++;
      if((weekInit+1)%7==0 || i==dataArr.length-1 || dataArr[i+1].slice(5,7)!==tempMonth){
        var tempKey = dataArr[i].slice(0,4) + "年" + dataArr[i].slice(5,7) + "月第" +(Math.floor(weekInit/7)+1) + "周";
        singleWeek[tempKey] = Math.floor(count/weekCount);
        if(i!=dataArr.length-1 && dataArr[i+1].slice(5,7)!==tempMonth){
          weekInit = weekCount % 7;
        }
        count = 0;
        weekCount = 0;

        if(i==dataArr.length-1 || dataArr[i+1].slice(5,7)!==tempMonth){
          tempMonth = (i==dataArr.length-1) ? dataArr[i].slice(5,7) : dataArr[i+1].slice(5,7);
          var tempMkey = dataArr[i].slice(0,4) + "年" + dataArr[i].slice(5,7) + "月";
          var tempDays = dataArr[i].slice(-2);
          singleMonth[tempMkey] = Math.floor(mcount/tempDays);
          mcount = 0;
        }
      }
    }
    week[key]=singleWeek;
    month[key]=singleMonth;
    singleMonth={};
    singleWeek={};
  }

  // 处理好的数据存到 chartData 中
  chartData.day = aqiSourceData;
  chartData.week = week;
  chartData.month = month;
  //console.log(chartData);
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();

}

init();