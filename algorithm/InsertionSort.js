/**
 * Created by Lychee on 2016/10/24.
 */
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

function InsertionSort(arr){
    console.time('插入排序算法耗时');
    var key;
    for(var i=1;i<arr.length;i++){
        key=arr[i];
        var j=i-1;
        while(j>=0 && arr[j]>key){
            arr[j+1]=arr[j];
            j--;
        }
        arr[j+1]=key;
    }
    console.timeEnd('插入排序算法耗时');
    return arr;
}
console.log(InsertionSort(arr));
