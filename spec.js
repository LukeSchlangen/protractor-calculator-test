// spec.js
describe('Protractor Demo App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var operator = element(by.model('operator'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  // var expect(latestResult.getText()) = expect(latestResult.getText());
  var history = element.all(by.repeater('result in memory'));

  function enterNumbers(a,b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  })

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });
  it('should add one and two', function() {
    enterNumbers(1, 2);

    expect(latestResult.getText()).toEqual('3');
  });
  it('should add four and six', function() {
    enterNumbers(4, 6);

    expect(latestResult.getText()).toEqual('10');
  });

  it('should have a history', function() {
    enterNumbers(1, 2);
    enterNumbers(3, 4);

    expect(history.count()).toEqual(2);

    enterNumbers(5, 6);

    expect(history.count()).toEqual(3);

    expect(history.last().getText()).toContain('1 + 2');
    expect(history.first().getText()).toContain('5 + 6');
  });

  it('should subtract six and four', function() {
    operator.sendKeys('-');
    enterNumbers(6, 4);
    expect(latestResult.getText()).toEqual('2');
    enterNumbers(15, 8);
    expect(latestResult.getText()).toEqual('7');
  });

  it('should multiply six and four', function() {
    operator.sendKeys('*');
    enterNumbers(6, 4);
    expect(latestResult.getText()).toEqual('24');
    enterNumbers(3, 7);
    expect(latestResult.getText()).toEqual('21');
  });

  it('should modulo some stuff', function() {
    operator.sendKeys('%');
    enterNumbers(16, 4);
    expect(latestResult.getText()).toEqual('0');
    enterNumbers(9, 7);
    expect(latestResult.getText()).toEqual('2');
  });


});