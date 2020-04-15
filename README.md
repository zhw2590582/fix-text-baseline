# fix-text-baseline

> Wrapper for canvas.getContext, designed to fix differences in textBaseline in different browsers

## Install

Install with `npm`

```bash
$ npm install fix-text-baseline
```

Or install with `yarn`

```bash
$ yarn add fix-text-baseline
```

```js
import fixTextBaseline from "fix-text-baseline";
```

Or umd builds are also available

```html
<script src="path/to/fix-text-baseline.js"></script>
```

Will expose the global variable to `window.fixTextBaseline`.

## Usage

```js
var canvas = document.createElement("canvas");
var ctx = fixTextBaseline(canvas.getContext("2d"));
ctx.font = "40px Arial";
ctx.fillText("test", 0, 10);
```

## License

MIT © [Harvey Zack](https://sleepy.im/)
