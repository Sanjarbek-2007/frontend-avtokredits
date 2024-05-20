import React from 'react';
import './PaymentTimeTable.css';

const PaymentTimeTable = ({ schedule }) => {
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
                {schedule.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.payment}</td>
                        <td>{item.balance > 0 ? "To'lashni kutmoqda" : "To'landi"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="back-button" onClick={back}>Orqaga</button>
        </div>
    );
};

export default PaymentTimeTable;
