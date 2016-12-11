const { spawn } = require('child_process')
const { platform } = process
const { join } = require('path')
const windowsScript = join(__dirname, 'msgbox.vbs')

const chooseAlert = () => {
  if (process.browser && window && window.alert && typeof window.alert === 'function') {
    return (str) => window.alert(str)
  } else {
    const theAlert = (cmds) => spawn(cmds[0], cmds.splice(1))
    let theCmds

    switch (platform) {
      case 'linux':
      case 'freebsd':
      case 'sunos':
        // if zenity
        theCmds = (str) => [ 'zenity', '--info', '--text', str ]
        // TODO:
        // if yad
        // theCmds = (str) => [ 'yad', '--text', str, '--button', 'OK' ]
        // if notify-send
        // theCmds = (str) => [ 'notify-send', str]
        // else xmessage
        // theCmds = (str) => [ 'xmessage', str ]
        return (str) => theAlert(theCmds(str))
      case 'darwin':
        // assuming applescript
        theCmds = (str) => [ 'osascript', '-e', `tell app "System Events" to display dialog "${str}" buttons "OK"` ]
        return (str) => theAlert(theCmds(str))
      case 'win32':
        // TODO: net send? msg thing? i don't know.
        theCmds = (str) => [ 'cscript',  windowsScript, str ]
        return (str) => theAlert(theCmds(str))
      default: // TODO:
        return (str) => console.log(str)
    }
  }
}

module.exports = (input = '') => chooseAlert()(input)

/*
export const alert = () => {}
export const confirm = () => {}
export const prompt = () => {}
export default alert
*/
