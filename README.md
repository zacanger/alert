# alert-node

`alert` for Node.

Uses `window.alert` in the browser.
Uses `zenity` on *nix.
Uses `osascript` on Mac.
Defaults to `console.log` otherwise (for now).

--------

## Installation:

`npm i -S alert-node`

## Usage:

```javascript
import alert from 'alert-node'

alert('foo')
```

## TODO:

* Find out how desktop notifications work in Windows
* Find a Node-y way of doing hash/command (something like `fs.statSync` but for commands)
  * Or just exec `hash`
  * This is so if `zenity` isn't installed, can fall back to `yad`, then `notify-send`
* What is `growl`
* Only show `OK` button, I think
  * Maybe consider adding `confirm` and `prompt` eventually

License: WTFPL
