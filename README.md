# alert-node

Cross-platform, isomorphic alert, for Node and browser

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

* Uses `window.alert` in the browser.
* Uses `kdialog` `zenity`, `yad`, `notify-send`, `xmessage`, `dialog`, or `whiptail` on Linux and BSD (depending on what's available).
* Uses `osascript`/`System Events` on Mac.
* Uses `cscript` on Windows (or `msg` if `cscript` fails).
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

* dialog (Linux)
* kdialog (Linux)
* notify-send (Linux)
* whiptail (Linux)
* xmessage (Linux)
* yad (Linux)
* zenity (Linux)
* osascript (Mac)
* cscript (Windows)
* msg (Windows)
* console (`console.log`)

Note that this will override any internal checks to get the correct program,
and will blow up if you get it wrong. It's advised to just use the default behavior.

```javascript
import alert from 'alert-node'
alert('hey!', 'yad')
```

`alert-node` also has a cli. `npm i -g alert-node` and run `alert 'sup brah'`.

[LICENSE](./LICENSE.md)
