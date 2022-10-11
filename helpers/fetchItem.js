const fetchItem = async (id) => {
  if (query === undefined) {
    throw new Error('You must provide an url');
  }

  return fetch(`https://api.mercadolibre.com/items/${id}`)
         .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
