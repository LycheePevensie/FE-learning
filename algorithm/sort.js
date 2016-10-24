/**
 * Created by Lychee on 2016/10/24.
 */
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
//方法一：直接排
function bubbleSort(arr){
    console.time('纯冒泡排序耗时');
    var temp;
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];arr[j] = arr[j+1];arr[j+1] = temp;
            }
        }
    }
    console.timeEnd('纯冒泡排序耗时');
    return arr;
}
console.log(bubbleSort(arr));

//方法二：优化，设置pos值，减少比较次数
function bubbleSort2(arr){
    console.time('设置pos优化后冒泡排序耗时');
    var temp,i=arr.length- 1,pos=0;
    while(i>0){
        for(var j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];arr[j] = arr[j+1];arr[j+1] = temp;
                pos = j;
            }
        }
        i = pos;//pos之后已排好的不再排序
    }
    console.timeEnd('设置pos优化后冒泡排序耗时');
    return arr;
}
console.log(bubbleSort2(arr));

//方法三：优化，每趟排序正反双向的一个最大值一个最小值
function bubbleSort3(arr){
    console.time('双向冒泡优化后冒泡排序耗时');
    var temp, j,low= 0,high=arr.length-1;
    while(low<high){
        for(j=low;j<high;++j){
            if(arr[j]>arr[j+1]){
                temp = arr[j];arr[j] = arr[j+1];arr[j+1] = temp;
            }
        }
        --high;
        for(j=high;j>low;--j){
            if(arr[j]<arr[j-1]){
                temp = arr[j];arr[j] = arr[j-1];arr[j-1] = temp;
            }
        }
        ++low;
    }
    console.timeEnd('双向冒泡优化后冒泡排序耗时');
    return arr;
}
console.log(bubbleSort3(arr));