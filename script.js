// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} - ID do produto.
 */
 const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função que carrega os items do localStorage e salva um array vazio se eles não existirem.
 */
  const loadCartItems = () => {
    const cartItems = JSON.parse(getSavedCartItems());
    if (cartItems === null) {
      saveCartItems(JSON.stringify([]));
      return [];
    }
    return cartItems;
  };

 /**
 * Função que adiciona um item ao cartItems.
 * @param {string} id - ID do produto.
 */
  const addCartItem = ({ id, title, price }) => {
    const cartItems = loadCartItems();
    cartItems.push({ id, title, price });
    saveCartItems(JSON.stringify(cartItems));
  };

/**
 * Função que remove um item do localStorage de cartItems.
 * @param {string} id - ID do produto.
 */
 const removeCartItem = (id) => {
  const cartItems = loadCartItems();
  const removeItemIndex = cartItems.findIndex((item) => item.id === id);
  cartItems.splice(removeItemIndex, 1);
  saveCartItems(JSON.stringify(cartItems));
};

/**
 * Função que faz a soma de todos os items no carrinho de compras.
 */
 const updateTotalValueInCart = async () => {
  const cartItems = loadCartItems();

  let totalValue = 0;
  cartItems.forEach((item) => { totalValue += item.price; });

  const totalPriceElement = document.getElementById('total-price');
  totalPriceElement.innerHTML = totalValue;
 };

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
   li.productId = id;
   li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
   li.addEventListener('click', (event) => {
    removeCartItem(id);
    event.target.remove();
    updateTotalValueInCart();
   });
   return li;
 };

/**
 * Função que acrescenta o item clicado ao carrinho de compras.
 * @param {string} id - ID do item.
 */
 const addToCart = ({ id, title, price }) => {
  const cartContainer = document.getElementById('cart__items');
  cartContainer.appendChild(createCartItemElement({ id, title, price }));
};

/**
 * Função que adiciona todos os items adicionados que estão no carrinho salvos no localStorage.
 */
 const addAllSavedCartProductElements = async () => {
  const cartItems = loadCartItems();
  for (let i = 0; i < cartItems.length; i += 1) {
    addToCart(cartItems[i]);
  }
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
    const { price } = await fetchItem(id);
    addCartItem({ id, title, price });
    addToCart({ id, title, price });
    updateTotalValueInCart();
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
  addAllSavedCartProductElements();
  addAllProducts('computador');
  updateTotalValueInCart();
};