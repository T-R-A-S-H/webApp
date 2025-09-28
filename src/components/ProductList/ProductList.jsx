import React from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useCart} from "../../context/CartContext";

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const {addToCart, cart, products} = useCart();

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
                    key={item.id}
                />
            ))}
        </div>
    );
};

export default ProductList;
