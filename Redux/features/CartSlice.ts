import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
    count: number;
    itemId: string;
    price: number;
}

type Cart = {
    size: number;
    cost: number;
    items: CartItem[];
}

const initialState:Cart = {
    size : 0,
    cost: 0.0,
    items: [],
}

export const slice = createSlice({
    name: "Cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            if(state.items.some(item => item.itemId === action.payload.itemId)){
                const index = state.items.findIndex(item => item.itemId === action.payload.itemId)
                state.items[index].count += 1
            }else{
                state.items = [...state.items, action.payload]
            }
            state.size += 1
            state.cost += action.payload.price
        },
        removeItem: (state, action) => {
            if(state.items.some(item => item.itemId === action.payload.itemId)){
                const index = state.items.findIndex(item => item.itemId === action.payload.itemId)
                if(state.items[index].count == 1){
                    state.items.splice(index, 1)
                }
                state.items[index].count -= 1
            }else{
                state.items = [...state.items, action.payload]
            }
            state.size -= 1
            state.cost -= action.payload.price
        }
    },
})