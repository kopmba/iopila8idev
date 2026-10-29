//This script is essentially a helper and not tested
/*
function run(y) {
  const x = 1;
  var result = [];
  /**/
  if(y==0) {
    result.push(x+1);
    return result;
  }
  /**/
  if(y%2==0) {
    result.push(x+2);
  }/**/else {
    console.log("evaluate array");
    /***/
    for(let i=0; i<y; i++) {
      result.push(x-1);
      console.log("actual array->");
      console.log(result);
    }/***/
  }
  /**/
  return result;
}
*/

let content = null; //use script in comment
var exec = new Exec(content);
console.log(exec.content);
var ctx = new ExecCtx(exec);
exec.contentNode(exec.content);
console.log(exec.nodes);
console.log(exec.check(exec.nodes,0));
console.log(exec.check(exec.nodes,2));
exec.compile(ctx);

var count = 0;

function Exec(content) {
	this.content = getContent(content);
	this.nodes = [];
}

function ExecCtx(runner) {
	this.exec = runner;
}

Exec.prototype.contentNode = function(content) {
	var contents = content.split("/**/");
	if(!contents) {
		contents = content.split("/***/");
	}
	this.nodes = contents;
}

Exec.prototype.compile = function(ctx) {
	const runner = this;
	runner.nodes.forEach(function(node) {
		setTimeout(function() {
			ctx.invokeCtx(runner, node);
		},2000);
	});
	count = 0;
}

Exec.prototype.check = function(data,j) {
	const condIf = data[j].indexOf("if")!=-1 && data[j].indexOf("{")!=-1;
	const condElif = data[j].indexOf("else if")!=-1 && data[j].indexOf("{")!=-1;
	const condElse = data.indexOf("else")!=-1 && data[j].indexOf("{")!=-1;
	const condFor = data[j].indexOf("for")!=-1 && data[j].indexOf("{")!=-1;

	return condIf || condElif || condElse || condFor;
};

ExecCtx.prototype.applyCtx = function(data) {
	console.log("Applied Ctx id:"+count+" -> ");
	console.log(data);
}

ExecCtx.prototype.invokeCtx = function(runner,node) {
	const arrNode = node.split("\n");
	if(runner.check(arrNode,0)) {
		const newRunner = new Exec(node);
		newRunner.contentNode(node);
		newRunner.compile(this);
	} else {
		this.applyCtx(node);
	}
}

function getContent(block) {
	var result = "";
	var closed = 0;
	const lines = block.split("\n");
	
	for(let i=lines.length-1; i>-1; i--) {
		const line = lines[i].trim();
		if(line == "}") {
			closed = i;
			i = -1;
		}
	}
	
	for(let j=1; j<closed; j++) {
		const line = lines[j] + "\n";
		result = result + line;
	}
	
	return result;
}
