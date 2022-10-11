require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1.1 - É uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('1.2 - É chamada a função fetch com um argumento válido', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('1.3 - É retornado uma estrutura válida com um argumento válido', () => {
    const resultado = fetchProducts('computador');
    expect(resultado).toEqual(computadorSearch);
  });

  it('1.4 - É retornado uma estrutura válida com um argumento válido', () => {
    expect(() => { fetchProducts(); }).toThrow(new Error('You must provide an url'));
  }); 
});
