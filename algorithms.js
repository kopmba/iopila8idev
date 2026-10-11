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
