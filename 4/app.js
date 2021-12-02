'use strict';

const products = [
    {
        id: 3,
        price: 127,
        photos: [
            "1.jpg",
            "2.jpg",
        ]
    },
    {
        id: 5,
        price: 499,
        photos: []
    },
    {
        id: 10,
        price: 26,
        photos: [
            "3.jpg"
        ]
    },
    {
        id: 8,
        price: 78,
    },
];

// 1
const productsWithPhotos = products.filter(product => product.photos && product.photos.length > 0);
console.log(productsWithPhotos);

// 2
const sortedProducts = products.sort((product1, product2) => product1.price - product2.price);
console.log(sortedProducts);