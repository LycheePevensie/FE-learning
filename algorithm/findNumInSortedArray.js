var arr = [
			[1,2,8,9],
			[2,4,9,12],
			[4,7,10,13],
			[6,8,11,15]
		  ]
function findNum(arr,num){
	var rows = arr.length - 1,
		row = 0,
		column = arr[0].length - 1,
		found = false;
	while (row < rows && column >= 0){
		if(arr[row][column] == num){
			console.log('arr[' + row + '][' + column + ']=' + num);
			found = true;
			break;
		}else if(arr[row][column] > num){
			--column;
		}else{
			++row;
		}
	}
	return found;
}
findNum(arr,7);
