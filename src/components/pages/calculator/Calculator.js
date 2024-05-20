import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanType, setLoanType] = useState('annuity');
    const [downPayment, setDownPayment] = useState('');
    const [insuranceCosts, setInsuranceCosts] = useState('0');
    const [collateralValuationCosts, setCollateralValuationCosts] = useState('0');
    const [otherCosts, setOtherCosts] = useState('0');
    const [results, setResults] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);
    const [ktq, setKtq] = useState(0);

    const calculateLoan = () => {
        const amount = parseFloat(loanAmount.replace(/\s/g, '').replace(',', '.'));
        const term = parseInt(loanTerm);
        const rate = parseFloat(interestRate.replace(',', '.'));
        const initialDownPayment = parseFloat(downPayment.replace(/\s/g, '').replace(',', '.')); // Парсим первоначальный взнос

        if (initialDownPayment >= amount) {
            alert("Первоначальный взнос не может превышать сумму кредита.");
            return;
        }

        const principalAmount = amount - initialDownPayment;

        let currentAmount = principalAmount;
        let totalInterest = 0;
        let totalPayment = 0;
        const monthlyInterestRate = rate / 12 / 100;
        const monthlyPayment = loanType === 'annuity' ? calculateAnnuityPayment(principalAmount, monthlyInterestRate, term) : principalAmount / term;

        const results = [];

        for (let i = 1; i <= term; i++) {
            const interest = currentAmount * monthlyInterestRate;
            totalInterest += interest;
            const monthlyInsuranceCosts = parseFloat(insuranceCosts.replace(/\s/g, '')) / term;
            const monthlyCollateralValuationCosts = parseFloat(collateralValuationCosts.replace(/\s/g, '')) / term;
            const monthlyOtherCosts = parseFloat(otherCosts.replace(/\s/g, '')) / term;
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
        setTotalPayment(totalPayment);

        const ktqValue = totalPayment - principalAmount;
        setKtq(ktqValue);
    };

    const calculateAnnuityPayment = (principal, monthlyRate, term) => {
        return principal * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, term) - 1));
    };

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
                    <label htmlFor="downPayment">Dastlabki to'lov (so'm):</label>
                    <input type="text" id="downPayment" name="downPayment" value={downPayment}
                           onChange={(e) => setDownPayment(e.target.value)}/>
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
                            <td>{item.commission}</td>
                            <td>{item.thirdPartyCosts}</td>
                            <td>{item.others}</td>
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
