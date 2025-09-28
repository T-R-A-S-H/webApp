import React from 'react';
import './Find.css';

const Find = () => {
    const admins = ['@admin1', '@admin2'];

    return (
        <div className="find">
            <h2>Найти вещь</h2>
            <p>Свяжитесь с админами для поиска вещей:</p>
            <ul>
                {admins.map((admin, index) => (
                    <li key={index}>{admin}</li>
                ))}
            </ul>
        </div>
    );
};

export default Find;