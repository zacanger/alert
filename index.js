let alert
if (process.browser) {
  alert = window.alert
  process.exit(0)
}

/*
let prog
const { join } = require('path')
const { spawn } = require('child_process')
const { platform }= process

switch (platform) {
  case 'linux':
  case 'darwin':
  case 'freebsd':
  case 'sunos':
  case 'win32':
}
*/

console.log('coming soon')
