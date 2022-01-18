const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const renderProduct = ({title, price}, img = 'https://picsum.photos/200') => `
    <div class="product-item">
        <img alt="pic" src="${img}">
        <div class="product-item-info">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="buy-btn">Добавить</button>
        </div>
    </div>
`;

const renderCatalog = (list) => {
  const productsBlock = document.querySelector('.products');
  list.forEach(good => {
      productsBlock.insertAdjacentHTML('beforeend', renderProduct(good));
  });
};

renderCatalog(products);
