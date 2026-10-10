//lines with no return on line
function getContents(content) {
	//set content as list of data
  var lines = content.split("\n");
  return lines;
}

function asString(lines) {
  var strResult = "";
  if(lines!=null) {
    lines.forEach(function(line) {
      strResult += line + "\n";
    });
  }
  return strResult;
}

function getIndent(line) {
  var count = 0;
  for(let i=0; i<line.length; i++) {
    if(line.charAt(i) === ' ') {
      count++;
    }
  }
  return count;
}

function format(lines) {
   //remove array with " "
  var newLines = [];
  lines.forEach(function(data) {
    if(data != "") {
    //data.forEach(function(line) {
      newLines.push(data);
    //});
    }
  });
  return newLines;
}

function existsKeyword(line) {
  const keywords = {
    1:"function",
    2:"for",
    3:"foreach",
    4:"if",
    5:"else if",
    6:"else",
    7:"while",
    8:"switch"
  };
  for(let i=1; i<9; i++) {
    const key = keywords[i];
    if(line != null || line!=undefined) {
      if(line.indexOf(key) != -1) {
        return true;
      }
    }
  }
  return false;
}

function formatAll(lines) {
  var newLines = format(lines);
  console.log(newLines)
  var result = [];
  for(let i=0; i<newLines.length; i++) {
    const line1 = newLines[i];
    console.log("line1->"+line1)
    const line2 = newLines[i+1];
    console.log("line2->"+line2)
    console.log(line1.trim() === '}')
    console.log(existsKeyword(line2))
    if(line1.trim() === "}" && existsKeyword(line2)) {
      const indent1 = getIndent(line1);
      console.log("indent1 "+indent1);
      const indent2 = getIndent(line2);
      console.log("indent2 "+indent2);
      if(indent1+1 === indent2) {
        let data1 = newLines;
        var slice1 = data1.slice(0, i+1);
        console.log(slice1);
        let data2 = newLines;
        var slice2 = data2.slice(i+1, data2.length);
        console.log(slice2)
        const insert = "//###\n";
        result = concatStr(slice1, insert, slice2);
        
        console.log(format(result))
        console.log("\n")
      }

    } 
  
  }
  return asString(format(result));
}

function concatStr(arr1,insert,arr2) {
  return arr1.concat([insert]).concat(arr2);
}
