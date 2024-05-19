
import React, { useState } from 'react';
import './Calculator.css'; // Import your CSS file for styling

const  Calculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanType, setLoanType] = useState('mortgage');
    const [annuity, setAnnuity] = useState('');
    const [insuranceCosts, setInsuranceCosts] = useState('');
    const [collateralValuationCosts, setCollateralValuationCosts] = useState('');
    const [result, setResult] = useState('');

    const calculateLoan = () => {
        // Perform loan calculation here
        setResult("Sizing hisoblangan natijangiz");
    };

    return (
        <div className="loan-calculator-container">
            <h2>Kredit Kalkulyatori</h2>
            <form className="loan-form">
                <div className="form-control">
                    <label htmlFor="loanAmount">Kredit miqdorini kiriting:</label>
                    <input type="number" id="loanAmount" name="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
                </div>

                <div className="form-control">
                    <label htmlFor="loanTerm">Kredit muddati (oylarda):</label>
                    <input type="number" id="loanTerm" name="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} required />
                </div>

                <div className="form-control">
                    <label htmlFor="interestRate">Foiz daromadi:</label>
                    <input type="number" id="interestRate" name="interestRate" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required />
                </div>

                <div className="form-control">
                    <label htmlFor="loanType">Kredit turi:</label>
                    <select id="loanType" name="loanType" value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                        <option value="mortgage">Ipoteka</option>
                        <option value="car">Avtokredit</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="annuity">Annuitet:</label>
                    <input type="number" id="annuity" name="annuity" value={annuity} onChange={(e) => setAnnuity(e.target.value)} />
                </div>

                <div className="form-control">
                    <label htmlFor="insuranceCosts">Stahovka qimati:</label>
                    <input type="number" id="insuranceCosts" name="insuranceCosts" value={insuranceCosts} onChange={(e) => setInsuranceCosts(e.target.value)} />
                </div>

                <div className="form-control">
                    <label htmlFor="collateralValuationCosts">Qarz qimati baholash:</label>
                    <input type="number" id="collateralValuationCosts" name="collateralValuationCosts" value={collateralValuationCosts} onChange={(e) => setCollateralValuationCosts(e.target.value)} />
                </div>

                <button type="button" onClick={calculateLoan}>Hisoblash</button>
            </form>

            <div className="result">{result}</div>
        </div>
    );
};

export default  Calculator;
