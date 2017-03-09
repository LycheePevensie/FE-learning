function mergeSort(arr) {
	let len = arr.length;
	if(len < 2){
		return arr;
	}

	let middle = Math.floor(len/2);
	return merge(mergeSort(arr.slice(0,middle)),mergeSort(arr.slice(middle)));
}

function merge (left,right){
	let result = [];

	while (left.length>0 && right.length > 0){
		if(left[0] <= right[0]){
			result.push(left.shift());
		}else{
			result.push(right.shift());
		}
	}
	while (left.length){
		result.push(left.shift());
	}
	while (right.length){
		result.push(right.shift())
	}

	return result;
}