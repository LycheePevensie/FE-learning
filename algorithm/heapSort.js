var len;
function buildMaxHeap(arr){
	len = arr.length;
	for(let i = Math.floor(len/2);i>=0;i--){
		heapify(arr,i);
	}
}
function heapify(arr,i){
	let left = 2*i+1,
		right = 2*i+2,
		largest =i;
	if(left<len && arr[left]>arr[largest]){
		largest = left;
	}
	if(right<len && arr[right]>arr[largest]){
		largest = right;
	}
	if(largest!=i){
		swap(arr,i,largest);
		heapify(arr,largest);
	}
}
function swap(arr,i,j){
	let temp=arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
function heapSort(arr){
	buildMaxHeap(arr);
	for(let i=arr.length-1;i>=0;i--){
		swap(arr,i,0);
		len--;
		heapify(arr,0);
	}
	return arr;
}
