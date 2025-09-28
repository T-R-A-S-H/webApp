import React from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useCart} from "../../context/CartContext";

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', photos: ['https://picsum.photos/300/300?random=1', 'https://picsum.photos/300/300?random=2', 'https://picsum.photos/300/300?random=3'], condition: 8.5, size: 'M'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', photos: ['https://picsum.photos/300/300?random=4', 'https://picsum.photos/300/300?random=5'], condition: 9.0, size: 'L'},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', photos: ['https://picsum.photos/300/300?random=6', 'https://picsum.photos/300/300?random=7'], condition: 7.2, size: 'S'},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', photos: ['https://picsum.photos/300/300?random=8'], condition: 6.8, size: 'XL'},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', photos: ['https://picsum.photos/300/300?random=9', 'https://picsum.photos/300/300?random=10', 'https://picsum.photos/300/300?random=11'], condition: 8.9, size: 'M'},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', photos: ['https://picsum.photos/300/300?random=12', 'https://picsum.photos/300/300?random=13'], condition: 5.5, size: 'M'},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', photos: ['https://picsum.photos/300/300?random=14'], condition: 9.2, size: 'L'},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', photos: ['https://picsum.photos/300/300?random=15', 'https://picsum.photos/300/300?random=16', 'https://picsum.photos/300/300?random=17'], condition: 7.7, size: 'S'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const {addToCart, cart} = useCart();

    const onAdd = (product) => {
        addToCart(product);
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
