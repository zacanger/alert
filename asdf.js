const { spawn } = require('child_process')
const hashCmd = (cmd) => `if hash ${cmd} 2>/dev/null ; then echo 'ok' ; fi`.split(' ')
spawn(hashCmd('zenity'))
