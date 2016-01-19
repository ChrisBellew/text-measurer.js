# text-measurer.js
Measure the exact height of text in the browser using JavaScript.

Sometimes you just want to know the height of some text, for instance if you want to center it nicely in a container. The APIs in the browser return a height that is much higher than visually apparent on the screen so that doesn't help you center it.

This library uses the HTML Canvas tag to render and measure some given text. It's relatively fast (~10ms).

#### Option One: Measure by providing exact font parameters
```javascript
var textMeasurer = new TextMeasurer();
var size = textMeasurer.measureText({ 
  text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 
  fontSize: '30px', 
  fontWeight: 'bold', 
  fontFamily: 'Arial' 
});
console.log(size); // {width: 1133.578125, height: 29, yOffset: -8}
```

#### Option Two: Sniff the font parameters from a DOM element
```html
<style>
.my-reference-element {
  font-size: 30px;
  font-weight: 'bold';
  font-family: 'Arial';
}
</style>
<div class="my-reference-element"></div>
```
```javascript
var textMeasurer = new TextMeasurer();
var size = textMeasurer.measureText({ 
  text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 
  element: document.getElementsByClassName('my-reference-element')[0]
});
console.log(size); // {width: 1133.578125, height: 29, yOffset: -8}
```
