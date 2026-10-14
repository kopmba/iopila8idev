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
