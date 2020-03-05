const { execSync, spawn } = require('child_process')
const { platform } = process
const { join } = require('path')
const isProgramInstalled = require('is-program-installed')
const windowsScript = join(__dirname, 'msgbox.vbs')

const execCmd = (cmds) => spawn(cmds[0], cmds.splice(1))

const unixPrograms = [
  'kdialog',
  'zenity',
  'yad',
  'notify-send',
  'xmessage',
  'dialog',
  'whiptail',
]

const bestUnixProgram =
  unixPrograms.filter(isProgramInstalled)[0] || console.log

const cscript = (s) => ['cscript', windowsScript, s]
const msg = (str) => ['msg', '"%username%"', str]
const zenity = (s) => ['zenity', '--info', '--text', s]
const yad = (s) => ['yad', '--text', s, '--button', 'OK']
const notifySend = (s) => ['notify-send', s]
const xmessage = (s) => ['xmessage', s]
const dialog = (s) => ['dialog', '--msgbox', s, '10', '30']
const whiptail = (s) => ['whiptail', '--msbox', s, '10', '30']
const kdialog = (s) => ['kdialog', '--msgbox', s]
const osascript = (s) => [
  'osascript',
  '-e',
  `tell app "System Events" to display dialog "${s}" buttons "OK"`,
]

const hasCscript =
  platform.startsWith('win') &&
  (() => {
    try {
      execSync('cscript')
      return true
    } catch (_) {}
  })()

const nameMap = {
  console: console.log,
  cscript,
  dialog,
  kdialog,
  msg,
  'notify-send': notifySend,
  osascript,
  whiptail,
  xmessage,
  yad,
  zenity,
}

const getAlert = (input = '', thingToUse = '') => {
  const execInput = (cmd) => execCmd(cmd(input))

  // if there's a second argument, we try to exec that one
  // if we can't, fall back to console
  if (thingToUse) {
    if (thingToUse === 'console') {
      return console.log(input)
    }
    const choice = nameMap[thingToUse]
    if (choice && choice !== 'console') {
      return execInput(choice)
    }
    return console.log(input)
  }

  // if no second argument, we try to find the best program
  // if we can't find any, fall back to console
  switch (platform) {
    case 'linux':
    case 'freebsd':
    case 'sunos':
      if (nameMap[bestUnixProgram]) {
        return execInput(nameMap[bestUnixProgram])
      }
      return console.log(input)
    case 'darwin':
      return execInput(osascript)
    case 'win32':
      return hasCscript ? execInput(cscript) : execInput(msg)
    default:
      return console.log(input)
  }
}

module.exports = getAlert
