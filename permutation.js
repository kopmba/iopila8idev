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

function permutation(str) {
	var result = []
	const len = str.length;
  
  if(str.length === 1) {
    result.push(str);
  }
  
	if(str.length === 2) {
		result.push(str,str[1]+str[0])
	}
  
  if(str.length > 2) {
    console.log(str.length>2)
		for(let i=0; i<str.length; i++) {
			var data = str;
			if(i===0) {
				const c = str[0];
        console.log("c->"+c)
				const slice = data.slice(1,len);
        console.log("slice->")
        console.log(slice)
				const val = concat(c,permutation(slice));
      		console.log("val->"+val)
      		result.push(val);
        console.log("push at "+i+"->")
        console.log(result)
			} else {
          //javascript issue which dont set the value of str because abc after permutation is always abc instead of bac
    				/*const c = data[0];
			    data[0] = data[i]
		      data[i] = c;
          console.log("new str->"+data)*/
          //create method permutString to permut char by index abc become bac at index 1
          console.log("data->"+data)
          var newStr = permutString(data, i)
          const c = newStr[0];
          console.log("new str->"+newStr)
          const slice = newStr.slice(1,len);
          console.log("slice->")
          console.log(slice)
          const val = concat(c,permutation(slice));
          console.log("val->"+val)
    				result.push(val);
          console.log("push at "+i+"->")
          console.log(result)
			}
		}
	}
	return result;
}

function permutString(str,index) {
  var result = ""
  var data = [];
  const c = str[0]

  var _str = toArray(str);
  data[0] = str[index];
 
  _str.splice(index,index)
  toConcat(data, _str)

  for(let i=0; i<data.length; i++) {
    
    result = result + data[i]
  }
  
  return result;
  
}

function toConcat(arr1,arr2) {
  arr2.forEach(function(v) {
    arr1.push(v)
  })
}

function toArray(str) {
  const result = [];
  for(let i=0; i<str.length; i++) {
    result.push(str.charAt(i))
  }
  return result
}

console.log(permutation("a"))
console.log(permutation("cab"))
