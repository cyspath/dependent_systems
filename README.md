## to run

copy and paste everything into Chrome developer tools

EXAMPLE:
In the console, type:

var cmds = [
  'DEPEND TELNET TCPIP NETCARD',
  'DEPEND TCPIP NETCARD',
  'DEPEND DNS TCPIP NETCARD',
  'DEPEND BROWSER TCPIP HTML',
  'INSTALL NETCARD',
  'INSTALL TELNET',
  'INSTALL foo',
  'REMOVE NETCARD',
  'INSTALL BROWSER',
  'INSTALL DNS',
  'LIST',
  'REMOVE TELNET',
  'REMOVE NETCARD',
  'REMOVE DNS',
  'REMOVE NETCARD',
  'INSTALL NETCARD',
  'REMOVE TCPIP',
  'REMOVE BROWSER',
  'REMOVE TCPIP',
  'LIST',
  'END',
  'REMOVE NETCARD',
]

run(cmds);


## Clarifying question

I was not 100% sure what the dependencies tier levels, so if removing each item only removes 1 layer of dependencies, then the output would be the same as the given example.

However, I am not sure if that is a correct assumption, it feels like removing an item should remove all its dependencies(which are not used), as well as dependencies as those dependencies(which are not used).

If that is the case, please comment out line 64 (which is a guard clause to prevent more than 1 layer of recursion upstream when removing dependencies that are not used)
