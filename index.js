const { spawn } = require('child_process')
const { platform } = process

const chooseAlert = () => {
  let theAlert, theOS, theCmds
  if (process.browser && window && window.alert && typeof window.alert === 'function') {
    theAlert = (str) => window.alert(str)
    return theAlert
  } else {
    theAlert = (cmds) => spawn(cmds[0], cmds.splice(1))

    switch (platform) {
      case 'linux':
      case 'freebsd':
      case 'sunos':
        theOS = 'nix'
        break
      case 'darwin':
        theOS = 'mac'
        break
      case 'win32':
        theOS = 'win'
        break
      default:
        theOS = 'unknown'
    }

    if (theOS === 'nix') {
      // if zenity
      theCmds = (str) => [ 'zenity', '--notification', '--text', str ]
      // if yad
      // theCmds = (str) => [ 'yad', '--text', str ]
      // else notify-send
      // theCmds = (str) => [ 'notify-send', str]
      return (str) => theAlert(theCmds(str))
    }
    if (theOS === 'mac') {
      // assuming applescript
      theCmds = (str) => [ 'osascript', '-e', `tell app "System Events" to display dialog "${str}"` ]
      return (str) => theAlert(theCmds(str))
    }
    if (theOS === 'win') {
      // who the fuck knows
      return (str) => console.log(str) // for now
    }

    if (theOS === 'unknown') {
      return (str) => console.log(str)
    }
  }
}

module.exports = (input = '') => chooseAlert()(input)
