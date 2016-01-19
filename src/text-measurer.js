function TextMeasurer() {    
  this.measureText = function(options) {
    var fontSize = options.fontSize || getComputedStyle(options.element, 'font-size') || '100px';
    var fontWeight = options.fontWeight || getComputedStyle(options.element, 'font-weight') || 'normal';
    var fontFamily = options.fontFamily || getComputedStyle(options.element, 'font-family') || 'Arial';
    var font = fontWeight + ' ' + fontSize + ' ' + fontFamily;
    
    var boundingRect = this.measureBoundingRect(options.text, font);
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    document.body.appendChild(canvas);
    canvas.width = boundingRect.width;
    canvas.height = boundingRect.height * 1.2; // Bounding rect height may not be enough as fillText() will render from the baseline 
    context.font = font;
    context.fillText(options.text, 0, fontSize.replace('px', ''));
    
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var result = this.measure({ width: canvas.width, height: canvas.height, imageData: imageData, options: options });
    
    if (!result.foundTopText) {
      return { width: boundingRect.width, height: 0, yOffset: 0 };
    }
    
    if (!result.foundBottomText) {
      return { width: boundingRect.width, height: canvas.height - result.topTextY, yOffset: -result.topTextY };
    }
    
    return { width: boundingRect.width, height: result.bottomTextY - result.topTextY, yOffset: -result.topTextY };
  }
  
  this.measureBoundingRect = function(text, font) {
    var temporaryContainer = document.createElement('div');
    temporaryContainer.style.position = 'fixed';
    temporaryContainer.style.top = '0px';
    temporaryContainer.style.left = '0px';
    temporaryContainer.style.width = '0px';
    temporaryContainer.style.height = '0px';
    temporaryContainer.style.overflow = 'hidden';
    
    var temporaryElement = document.createElement('span');
    temporaryElement.style.font = font;
    temporaryElement.innerText = text;
    document.body.appendChild(temporaryElement);
    var bBox = temporaryElement.getBoundingClientRect();
    document.body.removeChild(temporaryElement);
    return bBox;
  }
  
  function Iterator(maxWidth, maxHeight) {
    this.x = 0;
    this.y = 0;
    this.index = 0;
    
    this.moveRight = function() {
      if (this.arePixelsToTheRight()) {
        this.x++;
        this.index += 4;
      } else {
        this.moveDown();
      }
    }
    
    this.moveDown = function() {
      this.x = 0;
      this.y++;
      this.index = this.y * maxWidth * 4;
    }
    
    this.arePixelsToTheRight = function() {
      return this.x < maxWidth - 1;
    }
    
    this.noMorePixels = function() {
      return this.index >= (maxWidth * maxHeight * 4) - 4;
    }
  }
  
  this.measure = function(parameters) {
    // Find the top and bottom of the text by finding which rows are entirely full of transparent pixels.
    // The difference between the top-most transparent row and the bottom-most transparent row is the text height.    
    var iterator = new Iterator(parameters.width, parameters.height);
    var foundTopText = false;
    var foundBottomText = false;
    var topTextY = null;
    var bottomTextY = null;
    var allPixelsInThisRowAreWhite;
    while (!iterator.noMorePixels()) {
      if (!foundTopText) {
        // We have only encounted rows that are totally white so far, as soon as we 
        // find a pixel that is not white we will count that as the top of the text
        if (isTransparent(parameters.imageData, iterator.index)) {
          iterator.moveRight();
        } else {
          topTextY = iterator.y;
          foundTopText = true;
          iterator.moveDown();
        }
      } else {
        // We are looping through the rows until we find a row which is all white, 
        // in which case we have reached the bottom of the text
        if (!iterator.arePixelsToTheRight()) {
          if (allPixelsInThisRowAreWhite) {
            bottomTextY = iterator.y;
            foundBottomText = true;
            break;
          }  
          allPixelsInThisRowAreWhite = true;
          iterator.moveDown();
        }
        if (!isTransparent(parameters.imageData, iterator.index)) {
          allPixelsInThisRowAreWhite = false;
          iterator.moveDown();
        } else {
          iterator.moveRight();
        }
      }
    }
    
    return { foundTopText: foundTopText, foundBottomText: foundBottomText, topTextY: topTextY, bottomTextY: bottomTextY };
  }
  
  function isTransparent(imageData, index) {
    return imageData.data[index + 3] === 0; // If there is zero alpha then it is transparent
  }
  
  function getComputedStyle(element, property) {
    return element ? window.getComputedStyle(element)[property] : null ;
  }
}