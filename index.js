const { spawn } = require('child_process')
const { platform } = process

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

/*
export const alert = () => {}
export const confirm = () => {}
export const prompt = () => {}
export default alert
*/
