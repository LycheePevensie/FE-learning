function findGreatestSumOfSubArray(arr){
	let currentSum = 0, maxSum = 0, 
	currentArr = arr.slice(0,1), maxArr = arr.slice(0,1);
	for(let i=0;i<arr.length;i++){
		if(currentSum<=0){
			currentSum = arr[i];
			currentArr = arr.slice(i,i+1);
		}else{
			currentSum += arr[i];
			currentArr.push(arr[i]);
		}
		if(maxSum < currentSum){
			maxSum = currentSum;
			maxArr = currentArr.slice();
		}
	}
	console.log("maxSum=" + maxSum + "\n" + "maxArr:");
	return maxSum,maxArr;
}
