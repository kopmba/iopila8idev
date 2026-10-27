//These functions are very very helper methods you can use to
//get, test data from object, manipulate array or string value

function getKeyword(line) {
  var lkey = null;
  
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
    const k = keywords[i];
    if(line != null || line!=undefined) {
      if(line.indexOf(k) != -1) {
        lkey = k;
      }
    }
  }
  return lkey;
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

function fmtSep(lines, parent) {
  const ind = getIndent(parent)
  for(let i=0; i<lines.length; i++) {
    const line = lines[i];
    console.log("line "+i+" ->"+line)
    
    const cind = getIndent(line);
    if(ind === cind + 2) {
      
      lines[i] = line.replace(line,"### "+line)

    }
  }
}

function getIndent(line) {
  var count = 0;
  var data = line.split(" ");
  for(let i=0; i<data.length; i++) {
    if(data[i] != "") {
      i = data.length;
    } else {
      count++;
    }
  }
  return count;
}

function format(lines) {
  var newLines = [];
  lines.forEach(function(data) {
    if(data != "") {
   {
      newLines.push(data);
    }
  });
  return newLines;
}

function getDeclKey(str, sep) {
  var left = str.split(sep)[0].trim()
  const decl = left.split(" ")[1]
}

function getDeclValue(str, sep) {
  const value = str.split(sep)[1].trim()
  return value
}

function setObjName(line) {
  if(line.indexOf(".") === -1 || line.indexOf(".") + 1 === line.indexOf(")") - 1) {
    line = "this." + line;
    if(line.indexOf("=")===-1) {
      line = "_ = "+line;
    }
  }
}

function getOperator(cond) {
  const exist = cond.indexOf("==")!=-1 || cond.indexOf("<=")!=-1 || cond.indexOf(">=")!=-1 || cond.indexOf("<")!=-1 || cond.indexOf(">")!=-1 || cond.indexOf("!=")!=-1
  
  var operator = null
  
  if(exist) {
    operator = cond.split(" ")[1]
  }
  return operator;
}

function getOperatorFromLogic(cond) {
  const exist = cond.indexOf("&&")!=-1 || cond.indexOf("||")!=-1
  var logic = null
  var logicOperator = {}
  if(exist) {
    logic = cond.split(" ")[1]
    logicOperator.logic = logic
    logicOperator.conds = sliceEven(logic)
  }
  return logicOperator;
}

function sliceEven(arr) {
  var result = {}
  var _arr = []
  
  for(let i=0; i<arr.length; i++) {
    if(i%2 === 1) {
      _arr.push(i)
    }
  }
  
  var j=0;
  _arr.forEach(function(v) {
    result[j] = v;
    j++
  })
}

function methodName(str) {
  const start = str.indexOf(".");
  const end = str.indexOf("(");
  const name = str.substring(start+1, end);
  return name;
}

function paramsName(line) {
  const start = line.indexOf("(");
  const end = line.indexOf(")");
  var names = line.substring(start+1,end).split(",");
  return names;
}

function existsVarKey(line) {
  const keywords = {
    1:"const",
    2:"var"
  };
  var cond = false;
  if(line != null || line!=undefined) {
    if(line.indexOf(keywords[1]) != -1 || line.indexOf(keywords[2]) != -1) {
      cond = true;
    }
  }
  return cond;
}

function getVarKey(line) {
  const keywords = {
    1:"const",
    2:"var"
  };
  var key = null;
  if(line != null || line!=undefined) {
    if(line.indexOf(keywords[1]) != -1) {
      key = "const";
    } else {
      key = "var";
    }
  }
  return key;
}

function getCondValue(line,directive,existIf,current) {
  var keyword = getKeyword(line);
  var result = "";
  
  if(keyword === "while" || keyword === "foreach" || keyword === "switch" || keyword === "if" || keyword === "else if") {
    const start = line.indexOf("(")+1
    const end = line.indexOf(")");
    result = result + line.substring(start,end);
    console.log("cond->"+result)
  }
  
  if(keyword === "if") {
    directive.tribe = "if"
    existIf = true
    current = result
  }
}

function exists(arr,e) {
	var exist = false;
	if(arr != null || arr != undefined) {
    var i = 0
		for(let i=0; i<arr.length; i++) {
      //console.log(e === arr[i])
			if(e === arr[i]) {
				exist = true;
        i = arr.length
			}
		}
	}
	return exist;
}

function contains(arr, v) {
  var cond = false;
  if(arr.length > 0) {
    arr.forEach(function(item) {
  		if(item === v) {
      		cond = true;
  		}
    });
  }
  return cond;
}
