describe('Text Measurer', function() {
  it('measures the height of text based on directly given small font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '10px' });
    expect(size.height).toBe(10);
  });
  
  it('measures the height of text based on directly given medium font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '30px' });
    expect(size.height).toBe(29);
  });
  
  it('measures the height of text based on directly given large font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '60px' });
    expect(size.height).toBe(57);
  });
  
  it('measures the height of text by inferring the font size from a reference element', function() {
    var referenceElement = document.createElement('div');
    referenceElement.style.font = 'normal 30px Arial';
    document.body.appendChild(referenceElement);
    
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', element: referenceElement });
    expect(size.height).toBe(29);
  });
  
  it('measures the width of text based on directly given font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '10px' });
    expect(size.width).toBe(373);
  });
  
  it('measures the width of text based on directly given font size and font weight', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '10px', fontWeight: 'bold' });
    expect(size.width).toBe(385);
  });
  
  it('measures the width of text based on directly given font size and font family', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '10px', fontFamily: 'Tahoma' });
    expect(size.width).toBe(343);
  });
  
  it('measures the y-offset of text based on directly given small font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '10px' });
    expect(size.yOffset).toBe(-3);
  });
  
  it('measures the y-offset of text based on directly given medium font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '30px' });
    expect(size.yOffset).toBe(-8);
  });
  
  it('measures the y-offset of text based on directly given large font size', function() {
    var textMeasurer = new TextMeasurer();
    var size = textMeasurer.measureText({ text: '1234567890abcdefghihklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', fontSize: '60px' });
    expect(size.yOffset).toBe(-16);
  });
});