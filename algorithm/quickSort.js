function quickSort(arr,left,right){
	var left = typeof left == 'number' ? left : 0,
		right = typeof right == 'number' ? right : arr.length-1,
		partitionIndex;
	if(left < right){
		partitionIndex = partition(arr,left,right);
		quickSort(arr,left,partitionIndex-1);
		quickSort(arr,partitionIndex+1,right);
	}

	return arr;
}

function partition(arr,left,right){
	var qivot = left,
	    index = left + 1;
	for(let i=index; i<arr.length; i++){
		if(arr[qivot] > arr[i]){
			swap(arr,index,i);
			index++;
		}
	}
	swap(arr,qivot,index-1);

	return index-1;
}

function swap(arr,i,j){
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}