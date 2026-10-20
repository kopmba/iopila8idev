//Multi test running without crash

var content = '//comment script to add \n\n function callMethod(methodName,params) {\n\t\t  var result = eval(methodName' + '(' + '"'+'params+'"'+')');\n\t\treturn result;\n}';

function runTest(filename, contentScript, testCase, fname,params,inputKey) {
  
  var result = null;
  var strEval = null;
  var testResult = false
  var i=0;
  testCase.input.forEach(function(v) {
    const options = inputKey.options
    params = params.replace(inputKey.v,v);
    strEval = content + '\ncallMethod('+'"'+fname+'"'+','+'"'+params+'"'+')';
    try {
      result = eval(strEval)
      console.log("result->"+result)
      if(inputKey.fn!="void") {
        testResult = output(testCase,result,i)
      } else {
        testResult = params === testCase.output[i]
      }
    } catch(error) {
      console.error(error);
    } finally {
      if(testResult) {
        console.log("Test "+fname+ "-> Success")
      } else {
        console.warn("Test "+fname+ "-> Fail")
      }
    }
    i++;
  });
}

function output(testCase, result,index) {
  return testCase.output[index] === result;
}
