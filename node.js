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

const winScript = (s) => ['cscript', windowsScript, s]
const winMsg = (str) => ['msg', '"%username%"', str]
const zenity = (s) => ['zenity', '--info', '--text', s]
const yad = (s) => ['yad', '--text', s, '--button', 'OK']
const notifySend = (s) => ['notify-send', s]
const xMessage = (s) => ['xmessage', s]
const dialog = (s) => ['dialog', '--msgbox', s, '10', '30']
const whiptail = (s) => ['whiptail', '--msbox', s, '10', '30']
const kDialog = (s) => ['kdialog', '--msgbox', s]
const osaScript = (s) => [
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
  cscript: winScript,
  dialog,
  kdialog: kDialog,
  msg: winMsg,
  osascript: osaScript,
  'notify-send': notifySend,
  whiptail,
  xmessage: xMessage,
  yad,
  zenity,
  console: console.log,
}

const getAlert = (input = '', thingToUse = '') => {
  const execInput = (cmd) => execCmd(cmd(input))

  if (thingToUse) {
    console.log(thingToUse)
    const choice = nameMap[thingToUse]
    if (choice) {
      console.log(choice)
      return execInput(choice)
    }
    return console.log(input)
  }

  switch (platform) {
    case 'linux':
    case 'freebsd':
    case 'sunos':
      const properCmd = bestUnixProgram
      switch (properCmd) {
        case 'dialog':
          return execInput(dialog)
        case 'kdialog':
          return execInput(kDialog)
        case 'notify-send':
          return execInput(notifySend)
        case 'whiptail':
          return execInput(whiptail)
        case 'xmessage':
          return execInput(xMessage)
        case 'yad':
          return execInput(yad)
        case 'zenity':
          return execInput(zenity)
        default:
          return console.log(input)
      }
    case 'darwin':
      return execInput(osaScript)
    case 'win32':
      return hasCscript ? execInput(winScript) : execInput(winMsg)
    default:
      return console.log(input)
  }
}

module.exports = getAlert
