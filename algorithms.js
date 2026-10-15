//Bits counter

fn BitsCounter(n) {
  var bits = 1;
	if(n==0) {
		console.log("You cannot use 0 to generate seq of bits");
	}

	if(n===1) {
		return bits;
	}

	if(n%2===0) {
		const half = parseInt(n/2) + 1;
    bits = parseInt(BitsCounter(n-half) + "0");
	} else {
    const half = parseInt(n/2) + 1;
    bits = parseInt(BitsCounter(n-half) + "1");
	}
  return bits;
}

//Hashmap
var HashMap = {
	items: [],
	size: 0,
	iterator: Iterator,
	
	keys : function() {
		return Object.keys(this.items);
	},

	values : function() {
		var result = [];
		this.items.forEach(function(item) {
			result.push(item.value);
		});
		return values;
	},

	hasKey : function(key) {
		var has = false;
		this.items.forEach(function(item) {
			has = item.key === key;
		});
		return has;
	},

	get : function(key) {
		var value = null;
		this.items.forEach(function(item) {
			if(item.key === key) {
				value = item.value;
			}
		});
		return value;
	},

	empty : function() {
		this.items.length = 0;
	}

	size : function() {
		return this.size;
	},

	put : function(key, value) {
		this.item.push({
			key:key,
			value:value
		};
	},

	ItemSet : function() {
		//TODO
	}

	
}

//Removes duplicates int from linked list
var Iterator = {
	items : [],
	pos: 0,

	next : function() {
		this.pos = this.pos + 1;
		return this.items[this.pos];
	},

	hasNext : function() {
		return this.pos < this.items.length - 1;
	},

	getPos : function() {
		return this.pos;
	},
  
  setPos : function(pos) {
    this.pos = pos;
  },
  
  getItems : function() {
    return this.items;
  },

	setItems : function(arr) {
		this.items = arr;
	}
};

var LinkedList = {
	items : [],
	iterator : Iterator,
  
  print: function() {
    console.log("Print ->");
    console.log(this.items)
  },

	add : function(v) {
		this.items.push(v);
	},

	get : function(index) {
		var i=0;
    var result = null
    const data = this.items;
		data.forEach(function(item) {
			if(i === index) {
				result = item;
			}
			i++;
		});
    return result
	},

	contains : function(v) {
    var cond = false;
		this.items.forEach(function(item) {
			if(item === v) {
				cond = true;
			}
		});
		return cond;
	},

	indexOf : function(v) {
		var i = 0;
    var index = -1
		this.items.forEach(function(item) {
			if(item === v) {
				index = i;
			}
			i++;
		});
		return index
	},
  
  setItems : function(items) {
    this.items = items;
  },

	removeAt : function(index) {
		var result = [];
		var i=0;
		this.items.forEach(function(item) {
			if(i != index) {
				result.push(item)
			}
			i++;
		});
		this.items = result;
    console.log(this.items)
	},

	getIterator : function() {
		this.iterator.items = this.items;
		return this.iterator;
	},

	removeDuplicates : function(list,isStart,start) {
		var iterator = list.getIterator();
		var previous = -1;
		var count = 0;
    var data = list.items;
    iterator.setItems(data)
		while(start < list.items.length-1 && iterator.hasNext()) {
			const item = iterator.next();
      if(count === 0) {
    		  previous = iterator.getItems()[0];
				count = count + 1;
        if(isStart) {
    				start = start + 1;
        }
			} else {
        if(previous === item) {
          isStart = false;
      		  list.removeAt(iterator.getPos());
          data = list.items;
        		const k = data[start];
        		data[start] = data[0];
        		data[0] = k;
        		iterator.setItems(data);
        		start = start + 1;
        		count = 0;
          iterator.setPos(0);
          list.removeDuplicates(list,isStart,start);
        }
        
    		} 
    }
    
    if(start < list.items.length-1) {
      console.log("start->"+start)
      console.log("len->"+list.items.length-1)
      const k = list.items[start];
      list.items[start] = list.items[0];
      list.items[0] = k;
      start = start + 1;
      count = 0;
      iterator.setPos(0);
      list.removeDuplicates(list,isStart,start);
    }
    
    console.log("Output ->");
    console.log(list.items);
    
  }
  
}

var linked = LinkedList;
linked.items = [1,2,4,2,3,5,1,3,6]
console.log(linked.print())
console.log(linked.contains(5))
console.log(linked.get(6))
console.log(linked.indexOf(6))
console.log(linked.removeAt(8))
console.log(linked.getIterator().getItems()[0])
linked.removeDuplicates(linked,true,0)

//BufferReader
function Reader(path,content) {
  this.path = path;
  this.content = content;
  this.pos = 0;
  this.n = 0;
  this.c = 0;
}

Reader.prototype.lines = function() {
  const arrStr = this.content.split("\n");
  return arrStr;
}

Reader.prototype.readLine = function() {
  const lines = this.lines();
  var line = lines[this.pos];
  this.pos = this.pos + 1;
  if(this.pos > this.length - 1) {
    line = null;
  }
  return line;
}

Reader.prototype.getContent = function() {
  return this.content;
}

function BufferedReader(reader) {
  this.reader = reader;
}

BufferedReader.prototype.readAll = function() {
  return this.reader.getContent().length;
}

BufferedReader.prototype.readByValue = function(value) {
  var data = this.reader.getContent();
  var result = [];
  while(data.indexOf(value)!=-1) {
    const index = data.indexOf(value);
    result.push(index);
    data = data.substring(index+value.length+1, data.length-1);
  }
  
  return result;
  
}

BufferedReader.prototype.readResult = function() {
  const data = this.reader.getContent();
  if(this.reader.n < data.length) {
    var charAt = data[this.reader.n];
    this.reader.c = this.reader.n;
    this.reader.n = this.reader.n + 1;
    const result = this.readByValue(charAt);
  }
}

BufferedReader.prototype.read = function() {
  this.readResult();
  return this.reader.c;
}

BufferedReader.prototype.skip = function(len) {
  this.reader.n = this.reader.n + len;
}

BufferedReader.prototype.skipLine = function(len) {
  this.reader.pos = this.reader.pos + 1;
}
