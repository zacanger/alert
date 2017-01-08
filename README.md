# alert-node

`alert` for Node.

* Uses `window.alert` in the browser.
* Uses `zenity`, `yad`, `notify-send`, or `xmessage` on Linux and BSD (depending on what's available).
* Uses `osascript`/`System Events` on Mac.
* Uses `cscript` on Windows (thanks, StackOverflow).
* Defaults to `console.log`.

--------

## Installation:

`npm i -S alert-node`

## Usage:

```javascript
import alert from 'alert-node'

alert('howdy')
```

`alert-node` also has a cli. `npm i -g alert-node` and run `alert 'sup brah'`.

## TODO:

If `cscript` thing fails, fallback to `msg` thing.

License: WTFPL
