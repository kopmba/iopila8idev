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
