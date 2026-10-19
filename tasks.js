//This script is a non tested script but a helper script

const agents = [
  new Agent(1,["create data array"],[]),
  new Agent(2,["find repeated values in array","print"],[1]),
  new Agent(3,["remove duplicate from initial array"],[1]),
  new Agent(4,["sum of initial array", "compute multiply of duplicate array", "compare both"],[1,3])
]

function createDataArray() {
  var arr = [1,2,8,2,1,3,4,2,1,9,5,6,7,4,7,8];
  return arr;
}

function print(arr) {
  console.log(arr);
}

function removeDuplicates(arr) {
  var input = arr[0];
  var count = 0;
  while(count < arr.length) {
    for(let i=0; i<arr.length;i++) {
      if(!contains(input, arr[i])) {
        input.push(arr[i])
      }
      count++;
    }
  }
  return input;
}

function sum(arr) {
  var result = 0;
  arr.forEach(function(v) {
    result = result + v;
  });
  return result;
}

function multiply(arr) {
  var result = 0;
  arr.forEach(function(v) {
    result = result * v;
  });
  return result;
}

function compare(arr1,arr2) {
  if(sum(arr1) > multiply(arr2)) {
    console.log("Sum of initial is > multiply of duplicate")
  } else {
    console.log("Sum of initial is < multiply of duplicate")
  }
}

const _tasks = {
  1:[createDataArray()],
  2:[findRepeated(createDataArray()),print(findRepeated(createDataArray()))],
  3:[removeDuplicates(createDataArray())],
  4:[sum(createDataArray()),multiply(removeDuplicates(createDataArray())),compare(sum(createDataArray()), removeDuplicates(createDataArray()))]
}

function Agent(id,tasks,dependsOn) {
  this.id = id;
  this.tasks = tasks;
  this.dependsOn = dependsOn;
  this.input = null;
  this.output = null;
  this.completed = false;
  this.subs = [];
}

function manage(agents) {
  const data = agents;
  agents.forEach(function(agent) {
    data.forEach(function(sub) {
      addDependance(agent, sub)
    })
  })
}

function checkCompletedAndApply(agent,tasks) {
  //TODO
}

function computeTask(agent,tasks) {
  if(agent.id != 1) {
    const principal = agents[0];
    if(principal.completed) {
      if(agent.dependsOn.length > 1) {
        //TODO
        checkCompletedAndApply(agent,tasks);
      } else {
        applyingTask(agent,tasks[agent.id]);
      }
    }
  } else {
    applyingTask(agent,tasks[agent.id]);
  }
}

function applyingTask(agent,task) {
  var taskResult = null;
  try {
    taskResult = task;
  } catch(err) {
    if(err) {
      console.error("Task not complete from principal agent!")
    } else {
      agent.output = taskResult;
      agent.completed = true;
    }
  }
}

function addDependance(agent, sub) {
  const exist = contains(agent.dependsOn,sub.id);
  if(exist) {
    agent.subs.push(sub);
  }
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

function findRepeated(arr) {
	var count = 0;
	var input = [];
	var counter = [];
	for(let i=0; i<arr.length; i++) {
		const element = arr[i];
		if(!exists(input,element) || input.length === 0) {
			input.push(element);
			for(let j=0; j<arr.length; j++) {
				if(element === arr[j]) {
					count++;
				}
			}
			counter.push(count);
			count = 0;
		}
	}

	var result = {};

	for(let i=0; i<input.length; i++) {
		const index = ''+input[i];
		result[index] = counter[i];
	}

  return result;
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
