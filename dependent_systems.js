class Node {
  constructor(val = null) {
    this.val = val;
    this.explictInstall = false;
    this.installed = false;
    this.dependencies = {};
    this.dependents = {};
  }
}

var hash = {};

function addDependency(arr) {
  // initialize nodes if havent, in hash for fast lookup
  for (var i = 0; i < arr.length; i++) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = new Node(arr[i]);
    }
  }
  // set program's dependencies, as well set dependencies's dependents to include the program
  var program = arr.slice(0,1);
  var dependencies = arr.slice(1);
  for (var i = 0; i < dependencies.length; i++) {
    hash[program].dependencies[dependencies[i]] = hash[dependencies[i]];
    hash[dependencies[i]].dependents[program] = hash[program];
  }
}

function installProgram(name, current) {
  if (!hash[name]) {
    hash[name] = new Node(name);
    console.log(`    Installing ${name}`);
    hash[name].installed = true;
    return;
  };

  if (hash[name].installed) {
    if (current) console.log(`    ${name} is already installed.`);
    return;
  };

  var dependencies = Object.keys(hash[name].dependencies);
  for (var i = 0; i < dependencies.length; i++) {
    installProgram(dependencies[i]);
  }
  console.log(`    Installing ${name}`);
  hash[name].installed = true;
}

function removeProgram(name, current) {
  if (!hash[name] || hash[name].installed === false) {
    return console.log(`    ${name} is not installed.`);
  }
  // if any dependents still needed
  for (var key in hash[name].dependents) {
    if (hash[name].dependents[key].installed) {
      if (current) console.log(`    ${name} is still needed.`)
      return;
    }
  }
  // if no dependents, remove itself first
  hash[name].installed = false;
  console.log(`    Removing ${name}`);
  // remove its dependencies which are not used
  for (var key in hash[name].dependencies) {
    if (hash[name].dependencies[key].installed) {
      removeProgram(key, false);
    }
  }
}

function listPrograms() {
  for (var key in hash) {
    if (hash[key].installed) {
      console.log(`    ${key}`);
    }
  }
}

function parseStr(str) {
  var arr = str.split(' ').filter((el) => { return el[0] !== ' ' && el !== '' });
  return arr;
}


function run(cmds) {
  hash = {};
  for (var i = 0; i < cmds.length; i++) {
    console.log(cmds[i]);
    var cmdArr = parseStr(cmds[i]); // convert a line of cmd str to array form
    if (cmdArr.length === 0) {
      continue;
    }
    if (cmdArr[0].toUpperCase() === 'DEPEND') {
      addDependency(cmdArr.slice(1));
    } else if (cmdArr[0].toUpperCase() === 'INSTALL' && cmdArr[1]) {
      installProgram(cmdArr[1], true);
    } else if (cmdArr[0].toUpperCase() === 'REMOVE' && cmdArr[1]) {
      removeProgram(cmdArr[1], true);
    } else if (cmdArr[0].toUpperCase() === 'LIST') {
      listPrograms();
    } else if (cmdArr[0].toUpperCase() === 'END') {
      break;
    }
  }

}

// simple tests:
function runTests() {
  (function () {
    var cmds = ['DEPEND TELNET TCPIP NETCARD',

    ]
  })()

}

//
// var cmds = [
//   'DEPEND TELNET TCPIP NETCARD',
//   'DEPEND TCPIP NETCARD',
//   'DEPEND DNS TCPIP NETCARD',
//   'DEPEND BROWSER TCPIP HTML',
//   'INSTALL NETCARD',
//   'INSTALL TELNET',
//   'INSTALL foo',
//   'REMOVE NETCARD',
//   'INSTALL BROWSER',
//   'INSTALL DNS',
//   'LIST',
//   'REMOVE TELNET',
//   'REMOVE NETCARD',
//   'REMOVE DNS',
//   'REMOVE NETCARD',
//   'INSTALL NETCARD',
//   'REMOVE TCPIP',
//   'REMOVE BROWSER',
//   'REMOVE TCPIP',
//   'LIST',
//   'END',
//   'REMOVE NETCARD',
// ]
//
// run(cmds);
