import { createSelector, createSlice } from '@reduxjs/toolkit';

type CartItem = {
    name: string;
    count: number;
    itemId: string;
    price: number;
    description: string;
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
                    name: action.payload.name,
                    count: 1,
                    itemId: action.payload.itemId,
                    price: action.payload.price,
                    description: action.payload.description
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
        },
        clearItem: (state, action) => {
            const index = state.items.findIndex(item => item.itemId === action.payload.itemId)
            state.cost -= state.items[index].price * state.items[index].count
            state.size -= state.items[index].count
            state.items.splice(index, 1)

        }
    },
})

export const selectCount = (state: any) => state.cart.size
export const selectCost = (state: any) => state.cart.cost
export const selectState = (state: any) => state.cart
export const selectItems = (state:any) => state.cart.items
export const selectId = (state:any) => state.cart.restaurantId

export const selectItemCount = (id: string) => {
    return createSelector(
        selectItems,
        items => {
            // console.log(items);
            // console.log(id);
            
            for(let i = 0; i< items.length; i++) {
                if(items[i].itemId === id){
                    return items[i].count
                }
            }
            return 0
        }
    )
}


export const {addItem, removeItem, clearItem} = slice.actions

export default slice.reducer;