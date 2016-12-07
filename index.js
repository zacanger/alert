const { spawn } = require('child_process')
const { platform } = process

const chooseAlert = () => {
  let theAlert, theCmds
  if (process.browser && window && window.alert && typeof window.alert === 'function') {
    theAlert = (str) => window.alert(str)
    return theAlert
  } else {
    theAlert = (cmds) => spawn(cmds[0], cmds.splice(1))

    switch (platform) {
      case 'linux':
      case 'freebsd':
      case 'sunos':
        // if zenity
        theCmds = (str) => [ 'zenity', '--notification', '--text', str ]
        // if yad
        // theCmds = (str) => [ 'yad', '--text', str ]
        // else notify-send
        // theCmds = (str) => [ 'notify-send', str]
        return (str) => theAlert(theCmds(str))
      case 'darwin':
        // assuming applescript
        theCmds = (str) => [ 'osascript', '-e', `tell app "System Events" to display dialog "${str}"` ]
        return (str) => theAlert(theCmds(str))
      case 'win32':
        return (str) => console.log(str) // for now
      default:
        return (str) => console.log(str)
    }
  }
}

module.exports = (input = '') => chooseAlert()(input)
