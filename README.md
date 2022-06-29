# alert

## DEPRECATED

I highly recommend using
[node-notifier](https://github.com/mikaelbr/node-notifier) or
[node-notifier-cli](https://github.com/mikaelbr/node-notifier-cli) rather than
this project; they're better tested, maintained, and more featureful.

----

Cross-platform, isomorphic alert, for Node and browser (previously alert-node)

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

**IMPORTANT** this project was previously called `alert-node`. The package name
changed in v4. Huge thanks to [@iclanzan](https://github.com/iclanzan) for the
package name!

* Uses `window.alert` in the browser.
* Uses `kdialog` `zenity`, `yad`, `notify-send`, `xmessage`, `dialog`, or `whiptail` on Linux and BSD (depending on what's available).
* Uses `osascript`/`System Events` on Mac.
* Uses `cscript` on Windows (or `msg` if `cscript` fails).
* Defaults to `console.log`.

--------

## Installation:

`npm i alert`

## Usage:

```javascript
import alert from 'alert'

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
import alert from 'alert'
alert('hey!', 'yad')
```

`alert` also has a cli. `npm i -g alert` and run `alert 'sup brah'`.

To disable alert for testing purposes or otherwise, you can set an environment variable `DISABLE_ALERT=1`.

[LICENSE](./LICENSE.md)
