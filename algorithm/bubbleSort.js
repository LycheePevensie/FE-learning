/**
 * Created by Lychee on 2016/10/24.
 */
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
//����һ��ֱ����
function bubbleSort(arr){
    console.time('��ð�������ʱ');
    var temp;
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];arr[j] = arr[j+1];arr[j+1] = temp;
            }
        }
    }
    console.timeEnd('��ð�������ʱ');
    return arr;
}
console.log(bubbleSort(arr));

//���������Ż�������posֵ�����ٱȽϴ���
function bubbleSort2(arr){
    console.time('����pos�Ż���ð�������ʱ');
    var temp,i=arr.length- 1,pos=0;
    while(i>0){
        for(var j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];arr[j] = arr[j+1];arr[j+1] = temp;
                pos = j;
            }
        }
        i = pos;//pos֮�����źõĲ�������
    }
    console.timeEnd('����pos�Ż���ð�������ʱ');
    return arr;
}
console.log(bubbleSort2(arr));

//���������Ż���ÿ����������˫���һ�����ֵһ����Сֵ
function bubbleSort3(arr){
    console.time('˫��ð���Ż���ð�������ʱ');
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
    console.timeEnd('˫��ð���Ż���ð�������ʱ');
    return arr;
}
console.log(bubbleSort3(arr));