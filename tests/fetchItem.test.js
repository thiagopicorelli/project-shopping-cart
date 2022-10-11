require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('2.1 - É uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('2.2 - É chamada a função fetch com um argumento válido', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('2.3 - É retornado uma estrutura válida com um argumento válido', async () => {
    expect.assertions(1);
    const resultado = await fetchItem('MLB1615760527');
    expect(resultado).toEqual(item);
  });

  it('2.4 - É retornado um erro se o argumento não for definido', async () => {
    expect.assertions(1);
    await expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  }); 
});
