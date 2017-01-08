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

If using the API, you can specify a program to use. This can be one of:

* zenity
* yad
* notify-send
* xmessage
* console
* osascript
* cscript
* window

Note that this will override any internal checks to get the correct program,
and will blow up if you get it wrong. It's advised to just use the default behavior.

```javascript
import alert from 'alert-node'
alert('hey!', 'yad')
```

`alert-node` also has a cli. `npm i -g alert-node` and run `alert 'sup brah'`.

## TODO:

* If `cscript` thing fails, fallback to `msg` thing.

License: WTFPL
