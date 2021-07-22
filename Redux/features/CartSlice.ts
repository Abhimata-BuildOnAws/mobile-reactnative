import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
    count: number;
    itemId: string;
    price: number;
}

type Cart = {
    restaurantId: string;
    size: number;
    cost: number;
    items: CartItem[];
}

const initialState:Cart = {
    restaurantId: '',
    size : 0,
    cost: 0.0,
    items: [],
}

export const slice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            if(!state.restaurantId){
                state.restaurantId = action.payload.restaurantId
            }
            if(state.items.some(item => item.itemId === action.payload.itemId)){
                const index = state.items.findIndex(item => item.itemId === action.payload.itemId)
                state.items[index].count += 1
            }else{
                state.items = [...state.items, {
                    count: 1,
                    itemId: action.payload.itemId,
                    price: action.payload.price
                }]
            }
            state.size += 1
            state.cost += action.payload.price
        },
        removeItem: (state, action) => {
            if(state.size === 1){
                state.restaurantId = ""
            }
            if(state.items.some(item => item.itemId === action.payload.itemId)){
                
                // Get the index of the item in the array
                const index = state.items.findIndex(item => item.itemId === action.payload.itemId)

                // If count is 1, just remove the item from the array
                if(state.items[index].count == 1){
                    state.items.splice(index, 1)
                }else{
                    state.items[index].count -= 1
                }
            }else{
                console.log("something wong");
            }
            state.size -= 1
            state.cost -= action.payload.price
        },
        clearCart: (state, action) => {
            state.items.splice(0, state.items.length)
            state.size -= state.size
            state.cost -= state.cost
        }
    },
})

export const selectCount = (state: any) => state.cart.size
export const selectCost = (state: any) => state.cart.cost
export const selectState = (state: any) => state.cart

export const {addItem, removeItem} = slice.actions

export default slice.reducer;