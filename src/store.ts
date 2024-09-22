import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './features/calculator/calculatorSlice';
import converterReducer from './features/converter/CurrencyConverterSlice';

export const store1 = configureStore({
    reducer: {
        calculator: calculatorReducer,
        converter: converterReducer,
    },
});

export type RootState = ReturnType<typeof store1.getState>;
export type AppDispatch = typeof store1.dispatch;
