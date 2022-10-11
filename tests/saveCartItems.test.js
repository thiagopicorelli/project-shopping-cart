const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('3.1 - É chamado localStorage.setItem se a função é chamada com um argumento', () => {
    saveCartItems({});
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('3.2 - É chamado localStorage.setItem com dois parâmetros se a função é chamada com um argumento', () => {
    const input = {};
    saveCartItems(input);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', input);
  });
});
