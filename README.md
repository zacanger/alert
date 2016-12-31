# alert-node

`alert` for Node.

* Uses `window.alert` in the browser.
* Uses `zenity` on Linux.
* Uses `osascript` on Mac.
* Uses `cscript` on Windows.
* Defaults to `console.log`.

--------

## Installation:

`npm i -S alert-node`

## Usage:

```javascript
import alert from 'alert-node'

alert('foo')
```

`alert-node` also has a cli. `npm i -g alert-node` and run `alert foo`.

## TODO:

* Find a Node-y way of doing hash/command (something like `fs.statSync` but for commands)
  * Or just exec `hash`
  * This is so if `zenity` isn't installed, can fall back to `yad`, `notify-send`, or `xmessage`
* What is `growl`
* Only show `OK` button,.

License: WTFPL
