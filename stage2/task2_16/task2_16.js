/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var aqiData = {};
var $ = function(id){
    return document.getElementById(id);
}

/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
 */
function addAqiData() {
    var aqiCity = $('aqi-city-input').value.trim();
    var aqiValue = $('aqi-value-input').value.replace(/("\s|u00A0")+/g,"");
    if(!aqiCity.match(/^[A-Za-z\u4e00-\u9FA5]+$/)){
        alert('����������Ϊ��Ӣ���ַ�!');
        return;
    }
    if(!aqiValue.match(/^\d+$/)){
        alert('aqiָ������Ϊ����!');
        return;
    }else if(aqiValue>=1000 || aqiValue<=0){
        alert('aqiָ��������0-1000��Χ��');
        return;
    }
    aqiData[aqiCity]=aqiValue;
}

/**
 * ��Ⱦaqi-table���
 */
function renderAqiList() {
    var aqiList = '<tr><td>����</td><td>��������</td><td>����</td></tr>';
    for(var city in aqiData){
        aqiList += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='"+city+"'>ɾ��</button></td></tr>";
    }
    $('aqi-table').innerHTML = city ? aqiList : "";
}

/**
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
 */
function delBtnHandle(city) {
    // dataset��
    delete aqiData[city];

    //parent/child  node��
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

    // ���������add-btn��һ������¼������ʱ����addBtnHandle����
    var _btn = $('add-btn');
    $('aqi-value-input').onkeyup = function(event){
        if(($('aqi-city-input').value!=null) && event.keyCode === 13){
            addBtnHandle();
        }
    }
    eventUtil(_btn,addBtnHandle);
    // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����
    var _table = $('aqi-table');
    eventUtil(_table,function(event){
        if(event.target && event.target.nodeName.toLowerCase() === 'button'){
            //dataset��
            delBtnHandle.call(null,event.target.dataset.city);
            //node��
            //delBtnHandle(event.target);
        }
    })
}

init();