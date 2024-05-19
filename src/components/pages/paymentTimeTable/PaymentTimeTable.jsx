import React from 'react';
import './PaymentTimeTable.css'

const PaymentTimeTable = () => {

    const back = () => {
        window.location.href = '/';
    };

    return (
        <div className="payment-table-container">
            <button onClick={back}>Orqaga</button>
            <table className="payment-table">
                <thead>
                <tr>
                    <th>To'lov Sanasi</th>
                    <th>Miqdori</th>
                    <th>Holati</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>01/06/2024</td>
                    <td>$1000</td>
                    <td>To'landi</td>
                </tr>
                <tr>
                    <td>01/07/2024</td>
                    <td>$1000</td>
                    <td>To'lashni kutmoqda</td>
                </tr>
                </tbody>
            </table>
            <button className="back-button" onClick={back}>Orqaga</button>
        </div>
    );
};

export default PaymentTimeTable;
