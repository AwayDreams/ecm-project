import {configureStore, combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';


type itemState = {
    min: number;
    max: number;
}

const initialState = {
    min: 0,
    max: 20,
} as itemState

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        numeros: {
            reducer: (
                state,
                {
                    payload: {min, max}
                }: PayloadAction<itemState>
            ) => {
                console.log("rodado!")
                console.log(state, "state");
                return  {
                    ...state,
                    min: min + 1,
                    max: 10
                };
            },
           prepare: ( max) => {
                const min = 10;    
                return {payload: {min, max}}
           }
        }
    }
})


const slice2 = createSlice({
    name: 'slice2',
    initialState,
    reducers: {
        numeros: {
            reducer: (
                state,
                {
                    payload: {min, max}
                }: PayloadAction<itemState>
            ) => {
                console.log("rodado!")
                console.log(state, "state");
                return  {
                    ...state,
                    min: min + 1,
                    max: 10
                };
            },
           prepare: ( max) => {
                const min = 10;    
                return {payload: {min, max}}
           }
        }
    }
})

const slice3 = createSlice({
    name: 'slice3',
    initialState,
    reducers: {
        numeros: {
            reducer: (
                state
            ) => {
                console.log("rodado!")
                console.log(state, "state");
                return  {
                    ...state,
                    min: state.min + 1,
                    max: 10
                };
            },
           prepare: () => { 
                return {payload: {}}
           }
        }
    }
})

function loop(){
    console.log(1);
    store.dispatch(slice3.actions.numeros());
    console.log(store.getState())
    setTimeout(() => {loop()}, 5000)
}


export const store = configureStore({reducer: combineReducers({
   slice: slice.reducer, slice2: slice2.reducer, slice3: slice3.reducer
})});
setupListeners(store.dispatch);


loop();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
