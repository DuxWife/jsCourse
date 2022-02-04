const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status !== 200){
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};

class ProductList {
    constructor(cart, container = '.products') {
        this.cart = cart;
        this._container = container;
        this._goods = [];
        this._productObjects = [];
        this.getProducts().then((data) => {
          this._goods = data;
          this._render();
          console.log(this.sum());
        });

        document.querySelector(this._container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.addToCart(e.target);
            }
        });

        // this._fetchGoodsData();
    }

    addToCart(element) {
      // some code get good by id
        const id = element.getAttribute('data-id');
        const name = element.getAttribute('data-name');
        const price = element.getAttribute('data-price');
        const goodData = {id, name, price};
        this.cart.add(goodData);
    }

    // _fetchGoodsData() {
    //   getRequest(`${API}/catalogData.json`, (response) => {
    //     console.log(response);
    //     this._goods = JSON.parse(response);
    //     console.log(this._goods);
    //     this._render();
    //   });
    // }

    getProducts() {
      return fetch(`${API}/catalogData.json`)
          .then(response => response.json())
          .catch(err => console.log(err));
    }

    sum() {
      return this._productObjects.reduce((sum, { price }) => sum + price, 0);
    }

    _render() {
        const catalogBlock = document.querySelector(this._container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject)
            this._productObjects.push(productObject);
            catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id_product}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.product_name}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn" 
                          data-id="${this.id_product}" 
                          data-name="${this.product_name}" 
                          data-price="${this.price}">Купить</button>
                      </div>
                  </div>`;
  }
}

class Cart {
    constructor(cart, container = '.cart') {
        this._container = container;
        this._goods = [];
        this._cartObjects = [];
        this.getCart().then((data) => {
            this._goods = data.contents;
            this._render();
        });
        document.querySelector(this._container).addEventListener('click', e => {
            if(e.target.classList.contains('delete-btn')){
                this.remove(e.target.getAttribute('data-id'));
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this._container).classList.toggle('hidden');
        });
    }

    getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    add(good) {
        fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .then(data => {
                if(data.result === 1){
                    let productId = +good.id;
                    let find = this._cartObjects.find(product => product.id_product === productId);
                    if (find){
                        find.quantity++;
                        this.changeQuantity(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +good.price,
                            product_name: good.name,
                            quantity: 1
                        };
                        this._goods.push(product);
                        this._render();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    remove(id) {
        fetch(`${API}/deleteFromBasket.json`)
            .then(response => response.json())
            .then(data => {
                if(data.result === 1){
                    let productId = +id;
                    let find = this._cartObjects.find(product => product.id_product === productId);
                    if (find.quantity > 1){
                        find.quantity--;
                        this.changeQuantity(find);
                    } else {
                        this._goods.splice(this._goods.indexOf(find), 1);
                        this._cartObjects.splice(this._cartObjects.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    changeQuantity(product) {
        console.log(product);
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        console.log(block)
        block.querySelector('.cart-item-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.cart-item-total').textContent = `${product.quantity * product.price} \u20bd`;
    }

    _render() {
        const cartBlock = document.querySelector(this._container);
        cartBlock.innerHTML = '';
        this._cartObjects = [];

        for (let product of this._goods) {
            const cartObject = new CartItem(product);
            this._cartObjects.push(cartObject);
            cartBlock.insertAdjacentHTML('beforeend', cartObject.getHTMLString());
        }
    }
}

class CartItem {
    constructor(product, img='https://via.placeholder.com/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.quantity = product.quantity;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="cart-item" data-id="${this.id_product}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3 class="cart-item-name">${this.product_name}</h3>
                          <p class="cart-item-price">${this.price} \u20bd</p>
                          <p class="cart-item-quantity">Количество: ${this.quantity}</p>
                          <p class="cart-item-total">Итого: ${this.quantity*this.price} \u20bd</p>
                      </div>
                      <button class="delete-btn" data-id="${this.id_product}">x</button>
                  </div>`;
    }
}

const cart = new Cart();
const catalog = new ProductList(cart);
