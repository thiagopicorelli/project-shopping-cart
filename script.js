// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
 const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;



 /**
  * Função responsável por criar e retornar um item do carrinho.
  * @param {Object} product - Objeto do produto.
  * @param {string} product.id - ID do produto.
  * @param {string} product.title - Título do produto.
  * @param {string} product.price - Preço do produto.
  * @returns {Element} Elemento de um item do carrinho.
  */
 const createCartItemElement = ({ id, title, price }) => {
   const li = document.createElement('li');
   li.className = 'cart__item';
   li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
   li.addEventListener('click', (event) => {
    event.target.remove();
   });
   return li;
 };

/**
 * Função que acrescenta o item clicado ao carrinho de compras.
 * @param {string} id - ID do item.
 */
 const addToCart = async (idItem) => {
  const result = await fetchItem(idItem);
  const cartContainer = document.getElementById('cart__items');
  const { id, title, price } = result;
  cartContainer.appendChild(createCartItemElement({ id, title, price }));
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
 const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const cartButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  cartButton.addEventListener('click', async (event) => {
    addToCart(getIdFromProductItem(event.target.parentElement));
  });
  section.appendChild(cartButton);

  return section;
};

/**
 * Função que adiciona todos os items recebidos pela API no site, baseado no elemento sendo buscado.
 * @param {string} query - Chave de busca.
 */
const addAllProducts = async (query) => {
  const products = await fetchProducts(query);
  const itemsContainer = document.getElementById('items');
  products.results.forEach((result) => {
    const { id, title, thumbnail } = result;
    itemsContainer.appendChild(createProductItemElement({ id, title, thumbnail }));
  });
};

window.onload = () => { 
  addAllProducts('computador');
};