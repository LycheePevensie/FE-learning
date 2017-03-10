/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    var found = false;
    if(!matrix.length){
	    // alert("This matrix is empty");
	    return found;
	}else{
		var columns = 0;
		matrix.forEach(function(ele){
			if(ele.length > columns){
				columns = ele.length;
			}
		})
		if(!columns){
			// alert("This matrix is empty");
			return found;
		}
		var rows = matrix.length - 1,
			row = 0,
			column = columns - 1;
		while (row <= rows && column >= 0){
			if(matrix[row][column] && matrix[row][column] == target){
				// console.log('matrix[' + row + '][' + column + ']=' + target);
				found = true;
				break;
			}else if(matrix[row][column] > target){
				--column;
			}else{
				++row;
			}
		}
		return found;
	}
		
			
	
};
