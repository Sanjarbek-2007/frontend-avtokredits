import React, { useState } from 'react';
import './Calculator.css'; // Импортируем CSS-файл для стилизации


const Calculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanType, setLoanType] = useState('annuity');
    const [insuranceCosts, setInsuranceCosts] = useState('0');
    const [collateralValuationCosts, setCollateralValuationCosts] = useState('0');
    const [otherCosts, setOtherCosts] = useState('0');
    const [results, setResults] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0); // Добавляем состояние для общей суммы платежей
    const [ktq, setKtq] = useState(0); // Добавляем состояние для общей суммы платежей (KTQ)

    const calculateLoan = () => {
        // Парсим введенные значения в числа
        const amount = parseFloat(loanAmount.replace(/\s/g, '').replace(',', '.'));
        const term = parseInt(loanTerm);
        const rate = parseFloat(interestRate.replace(',', '.'));

        // Выполняем расчет кредита
        let currentAmount = amount;
        let totalInterest = 0;
        let totalPayment = 0; // Используем локальную переменную для общей суммы платежей внутри функции
        const monthlyInterestRate = rate / 12 / 100;
        const monthlyPayment = loanType === 'annuity' ? calculateAnnuityPayment(amount, monthlyInterestRate, term) : amount / term;

        const results = [];

        for (let i = 1; i <= term; i++) {
            const interest = currentAmount * monthlyInterestRate;
            totalInterest += interest;
            const monthlyInsuranceCosts = parseFloat(insuranceCosts) / term;
            const monthlyCollateralValuationCosts = parseFloat(collateralValuationCosts) / term;
            const monthlyOtherCosts = parseFloat(otherCosts) / term;
            const payment = monthlyPayment + monthlyInsuranceCosts + monthlyCollateralValuationCosts + monthlyOtherCosts;
            const principal = payment - interest;
            totalPayment += payment;
            currentAmount -= principal;
            results.push({
                number: i,
                date: getNextMonthDate(i),
                principal: principal.toFixed(2),
                commission: monthlyInsuranceCosts.toFixed(2),
                thirdPartyCosts: monthlyCollateralValuationCosts.toFixed(2),
                others: monthlyOtherCosts.toFixed(2),
                interest: interest.toFixed(2),
                payment: payment.toFixed(2),
                balance: currentAmount.toFixed(2)
            });
        }

        setResults(results);
        setTotalPayment(totalPayment); // Обновляем состояние общей суммы платежей

        // Вычисляем KTQ
        const ktqValue = totalPayment - amount;
        setKtq(ktqValue);
    };

    // Функция для расчета ежемесячного аннуитетного платежа
    const calculateAnnuityPayment = (principal, monthlyRate, term) => {
        return principal * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, term) - 1));
    };

    // Функция для получения следующей даты
    const getNextMonthDate = (monthsToAdd) => {
        const today = new Date();
        today.setMonth(today.getMonth() + monthsToAdd);
        return today.toLocaleDateString('en-GB');
    };

    return (
        <div className="loan-calculator-container">
            <h2>Kredit Kalkulyatori</h2>
            <form className="loan-form">
                <div className="form-control">
                    <label htmlFor="loanAmount">Kredit miqdorini kiriting:</label>
                    <input type="text" id="loanAmount" name="loanAmount" value={loanAmount}
                           onChange={(e) => setLoanAmount(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="loanTerm">Kredit muddati (oylar):</label>
                    <input type="text" id="loanTerm" name="loanTerm" value={loanTerm}
                           onChange={(e) => setLoanTerm(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="interestRate">Foiz stavkasi:</label>
                    <input type="text" id="interestRate" name="interestRate" value={interestRate}
                           onChange={(e) => setInterestRate(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="loanType">Kredit turi:</label>
                    <select id="loanType" name="loanType" value={loanType}
                            onChange={(e) => setLoanType(e.target.value)}>
                        <option value="annuity">Annuitet</option>
                        <option value="simple">Prostoy</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="insuranceCosts">Sug'urta xarajatlari (so'm):</label>
                    <input type="text" id="insuranceCosts" name="insuranceCosts" value={insuranceCosts}
                           onChange={(e) => setInsuranceCosts(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="collateralValuationCosts">Garovni baholash bo'yicha xarajatlar (so'm):</label>
                    <input type="text" id="collateralValuationCosts" name="collateralValuationCosts"
                           value={collateralValuationCosts}
                           onChange={(e) => setCollateralValuationCosts(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="otherCosts">Boshqa xarajatlar (so'm):</label>
                    <input type="text" id="otherCosts" name="otherCosts" value={otherCosts}
                           onChange={(e) => setOtherCosts(e.target.value)}/>
                </div>

                <button type="button" onClick={calculateLoan}>Hisoblash</button>

            </form>

            <div className="result">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Sana</th>
                        <th>Asosiy miqdor</th>
                        <th>Komission to'lov</th>
                        <th>Uchinchi shaxs bilan bog'liq xarajatlar</th>
                        <th>Boshqalar</th>
                        <th>Foiz to'lovlari</th>
                        <th>To'lov</th>
                        <th>Qoldiq</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map(item => (
                        <tr key={item.number}>
                            <td>{item.number}</td>
                            <td>{item.date}</td>
                            <td>{item.principal}</td>
                            <td>-</td>
                            <td>{item.payment}</td>
                            <td>-</td>
                            <td>{item.interest}</td>
                            <td>{item.payment}</td>
                            <td>{item.balance}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="result">Hisoblangan natijangiz: {totalPayment.toFixed(2)} so'm</div>
            <div className="result">Kreditning to'liq qiymati (KTQ) - {ktq.toFixed(3)} %</div>

        </div>
    );
};

export default Calculator;