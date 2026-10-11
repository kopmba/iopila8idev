//This is a helper you can test, see result at console and modify

// In this example, we need to provide set of permutations corresponding
// to a number v = 15 using array of size k = 4
// output : permutations of sets => 1 2 3 9 | 1 2 8 4 | 1 7 3 4 | 6 2 3 4

function permutationsOf(v,k) {
	var result = [];

	if(k < 3) {
    console.log("Number to small");
    return;
	} else {
		if(k <= 5) {
			var data = toPermut(fill(k,v,result));
		} else {
      console.log("Number to big");
      return;
    }
	}
	console.log(result.flat(Infinity));
	
}

function permut(arr) {
	var result = [];
	for(let i=0; i < arr.length; i++) {
		for(let j=0; j<arr.length; j++) {
			for(let m=0; m<arr.length; m++) {
				if(i!=j && j!=m && i!=m) {
					result.push([i,j,m]);
				}
			}
		}
	}
	return result;
}

function toPermut(arr) {
	var result = [];
	for(let i=0; i<arr.length; i++) {
		var data = arr;
		if(i==0) {
			result.push([data[0]],permut(data.slice(1,arr.length)));
		} else {
			//overloading
			var head = data[0];
			var tail = data[data.length-1];
			data[0] = tail;
			data[data.length-1] = head;
	result.push([data[0]],permut(data.slice(1,arr.length)));
		}
	}
	
	//result to flat
	return result;
}

function fill(k,v,arr) {
	arr.push(1);
	var result = [];
	for(let i=1; i<k; i++) {
		arr[i] = arr[i-1] + 1;
	}
	var index = arr.length -1;
	while(index > -1) {
		var data = arr; 
		for(let j=0; j<v; j++) { 
			data[index] = data[index] + j;
      //create the sum
			if(sum(data) === v) {
				result.push(data);
				index = index - 1; 
			}
		}
	}
	return result;
	console.log(arr)
	console.log(result)
}
