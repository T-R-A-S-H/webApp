import React, {useState} from 'react';
import Button from "../Button/Button";
import {useCart} from "../../context/CartContext";
import './ProductItem.css';

const ProductItem = ({product, className}) => {
    const {cart, addToCart} = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isInCart = cart.some(item => item.id === product.id);

    const onAddHandler = () => {
        if (!isInCart) {
            addToCart(product);
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className={'product ' + className}>
                <div className={'img'} onClick={openModal} style={{cursor: 'pointer'}}>
                    {product.photos && product.photos.length > 0 && (
                        <img src={product.photos[0]} alt={product.title} style={{width: '100%', height: 'auto'}} />
                    )}
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
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <h2>{product.title}</h2>
                        <div className="modal-photos">
                            {product.photos && product.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`${product.title} ${index + 1}`} className="modal-photo" />
                            ))}
                        </div>
                        <p>{product.description}</p>
                        <p>Состояние: {product.condition}/10</p>
                        <p>Размер: {product.size}</p>
                        <p>Цена: {product.price} руб.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductItem;
