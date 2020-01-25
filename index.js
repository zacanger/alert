const { execSync, execFileSync, spawn } = require('child_process')
const { platform } = process
const { join, resolve } = require('path')
const { log } = console
const getCmd = resolve(__dirname, 'get-cmd.sh')
const windowsScript = join(__dirname, 'msgbox.vbs')

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

// eslint-disable-next-line no-unused-vars
const makeAlert = (input = '', thingToUse) => {
  if (thingToUse) {
    if (thingToUse === 'window') {
      return (str) => window.alert(str)
    }
    if (thingToUse === 'console') {
      return (str) => log(str)
    } else {
      const theAlert = (cmds) => spawn(cmds[0], cmds.splice(1))
      let theCmds = (str) => [str]
      switch (thingToUse) {
        case 'cscript':
          theCmds = winScript
          break
        case 'dialog':
          theCmds = dialog
          break
        case 'kdialog':
          theCmds = kDialog
          break
        case 'msg':
          theCmds = winMsg
          break
        case 'notify-send':
          theCmds = notifySend
          break
        case 'osascript':
          theCmds = osaScript
          break
        case 'whiptail':
          theCmds = whiptail
          break
        case 'xmessage':
          theCmds = xMessage
          break
        case 'yad':
          theCmds = yad
          break
        case 'zenity':
          theCmds = zenity
          break
        default:
          return (str) => log(str)
      }
      return (str) => theAlert(theCmds(str))
    }
  }

  if (
    process.browser &&
    typeof window !== 'undefined' &&
    typeof window.alert === 'function'
  ) {
    return (str) => window.alert(str)
  } else {
    const theAlert = (cmds) => spawn(cmds[0], cmds.splice(1))
    let theCmds = (str) => [str]

    switch (platform) {
      case 'linux':
      case 'freebsd':
      case 'sunos':
        // eslint-disable-next-line
        const properCmd = execFileSync(getCmd)
          .toString()
          .trim()
        switch (properCmd) {
          case 'dialog':
            theCmds = dialog
            break
          case 'kdialog':
            theCmds = kDialog
            break
          case 'notify-send':
            theCmds = notifySend
            break
          case 'whiptail':
            theCmds = whiptail
            break
          case 'xmessage':
            theCmds = xMessage
            break
          case 'yad':
            theCmds = yad
            break
          case 'zenity':
            theCmds = zenity
            break
          default:
            return (str) => log(str)
        }
        return (str) => theAlert(theCmds(str))
      case 'darwin':
        theCmds = osaScript
        return (str) => theAlert(theCmds(str))
      case 'win32':
        theCmds = hasCscript ? winScript : winMsg
        return (str) => theAlert(theCmds(str))
      default:
        return (str) => log(str)
    }
  }
}

module.exports = makeAlert()
