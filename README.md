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

* What is `growl` even
* Only show `OK` button (mostly correct already)
* Fix getting alternatives on Linux (`yad`, `notify-send`, or `xmessage`)

License: WTFPL
