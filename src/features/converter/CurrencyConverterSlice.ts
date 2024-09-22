import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyConverterState {
    amount: number;
    fromCurrency: string;
    toCurrency: string;
    convertedAmount: number | null;
}

const initialState: CurrencyConverterState = {
    amount: 0,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    convertedAmount: null,
};

const currencyConverterSlice = createSlice({
    name: 'currencyConverter',
    initialState,
    reducers: {
        setAmount: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        },
        setFromCurrency: (state, action: PayloadAction<string>) => {
            state.fromCurrency = action.payload;
        },
        setToCurrency: (state, action: PayloadAction<string>) => {
            state.toCurrency = action.payload;
        },
        convertCurrency: (state) => {
            const rate = currencyRates[state.toCurrency] / currencyRates[state.fromCurrency];
            state.convertedAmount = parseFloat((state.amount * rate).toFixed(2));
        },
    },
});

export const { setAmount, setFromCurrency, setToCurrency, convertCurrency } = currencyConverterSlice.actions;
export default currencyConverterSlice.reducer;

const currencyRates: Record<string, number> = {
    USD: 1,
    EUR: 0.89,
    GBP: 0.75,
    TRY: 34.12,
    AZN: 1.70,
};
