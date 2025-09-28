import React, {useState} from 'react';
import {useCart} from "../../context/CartContext";
import {useTelegram} from "../../hooks/useTelegram";
import Button from "../Button/Button";
import './AdminPanel.css';

const AdminPanel = () => {
    const {addProduct, orders, updateOrderStatus} = useCart();
    const {addAdmin, getAdminPermissions, updateAdminPermissions, removeAdmin, getAllAdmins} = useTelegram();
    const permissions = getAdminPermissions();

    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
        condition: '',
        size: '',
        photos: ''
    });

    const [adminUsername, setAdminUsername] = useState('');
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [adminPermissions, setAdminPermissions] = useState({ canAddProducts: true, canAddAdmins: false, canManageOrders: false });

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const photos = productForm.photos.split(',').map(url => url.trim());
        addProduct({
            ...productForm,
            price: parseInt(productForm.price),
            condition: parseFloat(productForm.condition),
            photos
        });
        setProductForm({
            title: '',
            description: '',
            price: '',
            condition: '',
            size: '',
            photos: ''
        });
        alert('Продукт добавлен!');
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        addAdmin('@' + adminUsername.replace('@', ''), adminPermissions);
        setAdminUsername('');
        setAdminPermissions({ canAddProducts: true, canAddAdmins: false, canManageOrders: false });
        alert('Админ добавлен!');
    };

    const handleEditAdmin = (admin) => {
        setEditingAdmin(admin.username);
        setAdminPermissions(admin.permissions);
    };

    const handleUpdateAdmin = (e) => {
        e.preventDefault();
        updateAdminPermissions(editingAdmin, adminPermissions);
        setEditingAdmin(null);
        setAdminPermissions({ canAddProducts: true, canAddAdmins: false, canManageOrders: false });
        alert('Права обновлены!');
    };

    const handleRemoveAdmin = (username) => {
        if (confirm('Удалить админа?')) {
            removeAdmin(username);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Админ панель</h2>

            {permissions?.canAddProducts && (
                <div className="section">
                    <h3>Добавить продукт</h3>
                    <form onSubmit={handleProductSubmit}>
                        <input
                            type="text"
                            placeholder="Название"
                            value={productForm.title}
                            onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                            required
                        />
                        <textarea
                            placeholder="Описание"
                            value={productForm.description}
                            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Цена"
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Состояние (1-10)"
                            value={productForm.condition}
                            onChange={(e) => setProductForm({...productForm, condition: e.target.value})}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Размер"
                            value={productForm.size}
                            onChange={(e) => setProductForm({...productForm, size: e.target.value})}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Фото URL (через запятую)"
                            value={productForm.photos}
                            onChange={(e) => setProductForm({...productForm, photos: e.target.value})}
                            required
                        />
                        <Button type="submit">Добавить продукт</Button>
                    </form>
                </div>
            )}

            {permissions?.canManageOrders && (
                <div className="section">
                    <h3>Управление заказами</h3>
                    {orders.length === 0 ? (
                        <p>Нет заказов</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="order">
                                <p>Заказ #{order.id}</p>
                                <p>Пользователь: {order.user?.username || 'Неизвестен'}</p>
                                <p>Сумма: {order.total} руб.</p>
                                <p>Статус: {order.status}</p>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                >
                                    <option value="В обработке">В обработке</option>
                                    <option value="Подтвержден">Подтвержден</option>
                                    <option value="Отправлен">Отправлен</option>
                                    <option value="Доставлен">Доставлен</option>
                                </select>
                            </div>
                        ))
                    )}
                </div>
            )}

            {permissions?.canAddAdmins && (
                <>
                    <div className="section">
                        <h3>Добавить админа</h3>
                        <form onSubmit={handleAddAdmin}>
                            <input
                                type="text"
                                placeholder="Username (без @)"
                                value={adminUsername}
                                onChange={(e) => setAdminUsername(e.target.value)}
                                required
                            />
                            <div className="permissions">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={adminPermissions.canAddProducts}
                                        onChange={(e) => setAdminPermissions({...adminPermissions, canAddProducts: e.target.checked})}
                                    />
                                    Добавление продуктов
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={adminPermissions.canAddAdmins}
                                        onChange={(e) => setAdminPermissions({...adminPermissions, canAddAdmins: e.target.checked})}
                                    />
                                    Добавление админов
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={adminPermissions.canManageOrders}
                                        onChange={(e) => setAdminPermissions({...adminPermissions, canManageOrders: e.target.checked})}
                                    />
                                    Управление заказами
                                </label>
                            </div>
                            <Button type="submit">Добавить админа</Button>
                        </form>
                    </div>

                    <div className="section">
                        <h3>Управление админами</h3>
                        {getAllAdmins().map(admin => (
                            <div key={admin.username} className="admin-item">
                                <p>{admin.username}</p>
                                <div className="permissions">
                                    <span>Продукты: {admin.permissions.canAddProducts ? 'Да' : 'Нет'}</span>
                                    <span>Админы: {admin.permissions.canAddAdmins ? 'Да' : 'Нет'}</span>
                                    <span>Заказы: {admin.permissions.canManageOrders ? 'Да' : 'Нет'}</span>
                                </div>
                                <div className="admin-actions">
                                    <Button onClick={() => handleEditAdmin(admin)}>Редактировать</Button>
                                    {admin.username !== '@mama_brik' && (
                                        <Button onClick={() => handleRemoveAdmin(admin.username)}>Удалить</Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {editingAdmin && (
                        <div className="section">
                            <h3>Редактировать права: {editingAdmin}</h3>
                            <form onSubmit={handleUpdateAdmin}>
                                <div className="permissions">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={adminPermissions.canAddProducts}
                                            onChange={(e) => setAdminPermissions({...adminPermissions, canAddProducts: e.target.checked})}
                                        />
                                        Добавление продуктов
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={adminPermissions.canAddAdmins}
                                            onChange={(e) => setAdminPermissions({...adminPermissions, canAddAdmins: e.target.checked})}
                                        />
                                        Добавление админов
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={adminPermissions.canManageOrders}
                                            onChange={(e) => setAdminPermissions({...adminPermissions, canManageOrders: e.target.checked})}
                                        />
                                        Управление заказами
                                    </label>
                                </div>
                                <Button type="submit">Обновить</Button>
                                <Button onClick={() => setEditingAdmin(null)}>Отмена</Button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminPanel;