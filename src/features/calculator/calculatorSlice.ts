import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
    value: number;
}

const initialState: CalculatorState = {
    value: 0,
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        subtract: (state, action: PayloadAction<number>) => {
            state.value -= action.payload;
        },
        multiply: (state, action: PayloadAction<number>) => {
            state.value *= action.payload;
        },
        divide: (state, action: PayloadAction<number>) => {
            if (action.payload !== 0) {
                state.value /= action.payload;
            } else {
                state.value = 0;
            }
        },
        clear: (state) => {
            state.value = 0; 
        },
    },
});

export const { add, subtract, multiply, divide, clear } = calculatorSlice.actions;
export default calculatorSlice.reducer;
