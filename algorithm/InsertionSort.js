/**
 * Created by Lychee on 2016/10/24.
 */
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

function InsertionSort(arr){
    console.time('���������㷨��ʱ');
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
    console.timeEnd('���������㷨��ʱ');
    return arr;
}
console.log(InsertionSort(arr));
