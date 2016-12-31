const { execFileSync, spawn } = require('child_process')
const { platform } = process
const { join, resolve } = require('path')
const { log } = console
const getCmd = resolve(__dirname, 'get-cmd.sh')
const windowsScript = join(__dirname, 'msgbox.vbs')

const makeAlert = (input = '') => {
  if (process.browser && window && window.alert && typeof window.alert === 'function') {
    return (str) => window.alert(str)
  } else {
    const theAlert = (cmds) => spawn(cmds[0], cmds.splice(1))
    let theCmds = (str) => [ log, str ]

    switch (platform) {
      case 'linux':
      case 'freebsd':
      case 'sunos':
        const properCmd = execFileSync(getCmd).toString().trim()
        switch (properCmd) {
          case 'zenity':
            theCmds = (str) => [ 'zenity', '--info', '--text', str ]
            break
          case 'yad':
            theCmds = (str) => [ 'yad', '--text', str, '--button', 'OK' ]
            break
          case 'notify-send':
            theCmds = (str) => [ 'notify-send', str ]
            break
          case 'xmessage':
            theCmds = (str) => [ 'xmessage', str ]
            break
          default:
            theCmds = (str) => [ log, str ]
        }
        return (str) => theAlert(theCmds(str))
      case 'darwin':
        theCmds = (str) => [ 'osascript', '-e', `tell app "System Events" to display dialog "${str}" buttons "OK"` ]
        return (str) => theAlert(theCmds(str))
      case 'win32':
        // TODO: net send? msg thing? i don't know.
        theCmds = (str) => [ 'cscript',  windowsScript, str ]
        return (str) => theAlert(theCmds(str))
      default: // TODO:
        return (str) => log(str)
    }
  }
}

module.exports = makeAlert()
