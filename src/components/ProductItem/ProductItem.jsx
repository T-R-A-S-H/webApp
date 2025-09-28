import React from 'react';
import Button from "../Button/Button";
import {useCart} from "../../context/CartContext";
import './ProductItem.css';

const ProductItem = ({product, className}) => {
    const {cart, addToCart} = useCart();
    const isInCart = cart.some(item => item.id === product.id);

    const onAddHandler = () => {
        if (!isInCart) {
            addToCart(product);
        }
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}>
                {product.photos && product.photos.map((photo, index) => (
                    <img key={index} src={photo} alt={product.title} style={{width: '100%', height: 'auto'}} />
                ))}
            </div>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'condition'}>Состояние: {product.condition}/10</div>
            <div className={'size'}>Размер: {product.size}</div>
            <div className={'price'}>
                <span>Цена: <b>{product.price} руб.</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler} disabled={isInCart}>
                {isInCart ? 'В корзине' : 'Купить'}
            </Button>
        </div>
    );
};

export default ProductItem;
