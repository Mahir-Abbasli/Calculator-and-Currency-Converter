import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { add, subtract, multiply, divide, clear } from './calculatorSlice';

const Calculator: React.FC = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state: RootState) => state.calculator.value);
    const [localInput, setLocalInput] = useState<string>('');

    const handleClick = (value: string) => {
        setLocalInput((prev) => prev + value);
    };

    const handleClear = () => {
        dispatch(clear());
        setLocalInput('');
    };

    const calculateResult = (expression: string) => {
        const operators = expression.split(/[\d.]+/).filter(op => op);
        const numbers = expression.split(/[^\d.]+/).map(Number);

        let result = numbers[0];

        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const nextNumber = numbers[i + 1];

            if (operator === '+') {
                result += nextNumber;
                dispatch(add(nextNumber));
            } else if (operator === '-') {
                result -= nextNumber;
                dispatch(subtract(nextNumber));
            } else if (operator === '*') {
                result *= nextNumber;
                dispatch(multiply(nextNumber));
            } else if (operator === '/') {
                if (nextNumber !== 0) {
                    result /= nextNumber;
                    dispatch(divide(nextNumber));
                } else {
                    setLocalInput('Error');
                    return;
                }
            }
        }

        return result;
    };

    const handleEqual = () => {
        try {
            const result = calculateResult(localInput);
            setLocalInput(result?.toString() || 'Error');
        } catch {
            setLocalInput('Error');
        }
    };

    return (
        <div className="flex h-screen justify-center">
            <div className="flex items-center justify-center w-1/2 bg-gray-200">
                <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-xs">
                    <input
                        type="text"
                        value={localInput || inputValue.toString()}
                        readOnly
                        className="mb-4 text-right text-2xl p-4 bg-gray-100 rounded w-full"
                    />

                    <div className="grid grid-cols-4 gap-4">
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('1')}>1</button>
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('2')}>2</button>
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('3')}>3</button>
                        <button className="bg-red-500 text-white p-4 rounded" onClick={handleClear}>C</button>

                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('4')}>4</button>
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('5')}>5</button>
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('6')}>6</button>
                        <button className="bg-green-500 text-white p-4 rounded" onClick={() => handleClick('+')}>+</button>

                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('7')}>7</button>
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('8')}>8</button>
                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('9')}>9</button>
                        <button className="bg-green-500 text-white p-4 rounded" onClick={() => handleClick('-')}>-</button>

                        <button className="bg-gray-300 text-black p-4 rounded" onClick={() => handleClick('0')}>0</button>
                        <button className="bg-yellow-500 text-white p-4 rounded" onClick={handleEqual}>=</button>
                        <button className="bg-green-500 text-white p-4 rounded" onClick={() => handleClick('/')}>/</button>
                        <button className="bg-green-500 text-white p-4 rounded" onClick={() => handleClick('*')}>*</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
