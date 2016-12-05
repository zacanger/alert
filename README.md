# alert-node

`alert` for Node.

Using Notify-Send, Yad, Zenity, or whatever.

This doesn't actually do anything yet! But it will.

--------

Installation: `npm i -S alert-node`

Usage:

```javascript
import alert from 'alert-node'

alert('foo')
```

This module will only work in Node. If used in the browser, `window.alert` will take precedence.

License: WTFPL
