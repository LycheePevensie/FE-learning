var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
function quickSort(arr,left,right){
    console.time('快速排序耗时:')
    if(left<right){
        var x=arr[right],i=left-1,temp;
        for(var j=left;j<=right;j++){
            if(arr[j]<=x){
                i++;
                temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
        quickSort(arr,left,i-1);
        quickSort(arr,i+1,right)
    }
    console.timeEnd('快速排序耗时:')
    return arr;
}
console.log(quickSort(arr,0,arr.length-1));

function quickSort2(arr){
    console.time('快速排序2耗时');
    if(arr.length<=1){return arr};
    var left=[],right=[],
        pivotIndex = Math.floor(arr.length/2),
        pivot = arr.splice(pivotIndex, 1)[0];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    console.timeEnd('快速排序2耗时');
    return quickSort2(left).concat([pivot],quickSort2(right));
}
console.log(quickSort2(arr));