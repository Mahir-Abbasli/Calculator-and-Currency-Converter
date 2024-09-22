import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAmount, setFromCurrency, setToCurrency, convertCurrency } from './CurrencyConverterSlice';

const currencyRates: Record<string, number> = {
    USD: 1,
    EUR: 0.89,
    GBP: 0.75,
    TRY: 34.12,
    AZN: 1.70,
};

const CurrencyConverter: React.FC = () => {
    const dispatch = useDispatch();
    const amount = useSelector((state: RootState) => state.converter.amount);
    const fromCurrency = useSelector((state: RootState) => state.converter.fromCurrency);
    const toCurrency = useSelector((state: RootState) => state.converter.toCurrency);
    const convertedAmount = useSelector((state: RootState) => state.converter.convertedAmount);

    useEffect(() => {
        if (amount > 0) {
            dispatch(convertCurrency());
        }
    }, [amount, fromCurrency, toCurrency, dispatch]);

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        dispatch(setAmount(isNaN(value) ? 0 : value));
    };

    const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFromCurrency(e.target.value));
    };

    const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setToCurrency(e.target.value));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-2xl mb-4">Currency Converter</h2>
            <input
                type="number"
                value={amount || ''}
                onChange={handleChangeAmount}
                className="border p-2 w-full mb-4 border-gray-400 rounded-md"
                placeholder="Amount"
            />
            <div className="flex mb-4">
                <select
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    className="border p-2 mr-2 border-gray-400 rounded-md"
                >
                    {Object.keys(currencyRates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    className="border p-2 border-gray-400 rounded-md"
                >
                    {Object.keys(currencyRates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4 text-lg border border-gray-400 rounded-md p-2">
                {convertedAmount !== null ? (
                    `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
                ) : (
                    <span className="ml-2">0.00</span>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
