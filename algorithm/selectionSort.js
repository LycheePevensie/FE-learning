/**
 * Created by Lychee on 2016/10/24.
 */
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

//找最小值
function selectionSort(arr){
    console.time('1选择排序耗时');
    var temp,minIndex;
    for(var i=0;i<arr.length;i++){
        minIndex=i;
        for(var j=i+1;j<arr.length;j++){
            if(arr[j]<arr[minIndex]){
                minIndex=j;
            }
        }
        temp=arr[i];arr[i]=arr[minIndex];arr[minIndex]=temp;
    }
    console.timeEnd('1选择排序耗时');
    return arr;
}
console.log(selectionSort(arr));

//找最大值
function selectionSort2(arr){
    console.time('2选择排序耗时');
    var temp,maxIndex;
    for(var i=arr.length;i>0;--i){
        maxIndex=i;
        for(var j=0;j<i;j++){
            if(arr[j]>arr[maxIndex]){
                maxIndex=j;
            }
        }
        temp=arr[i];arr[i]=arr[maxIndex];arr[maxIndex]=temp;
    }
    console.timeEnd('2选择排序耗时');
    return arr;
}
console.log(selectionSort2(arr));