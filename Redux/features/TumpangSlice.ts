import { createSlice } from "@reduxjs/toolkit";

type coordinates = {}

const initalState = {
    time: "",
    pickUpPoint: "",
    number: "",
    note: ""
}

export const slice = createSlice({
    name: "tumpang",
    initialState: initalState,
    reducers:{
        setTDate: (state, action) => {
            state.time = action.payload.time
        },
        setPickUpPoint: (state, action) => {
            state.pickUpPoint = action.payload.pickUpPoint
        },
        setNumber: (state, action) => {
            state.number = action.payload.number;
        },
        setNote: (state, action) => {
            state.note = action.payload.note
        },
    }
})

export const selectDate = (state: any) => state.tumpang.time
export const selectPickUpPoint = (state: any) => state.tumpang.pickUpPoint
export const selectNumber = (state: any) => state.tumpang.number
export const selectNote = (state: any) => state.tumpang.note
export const selectTumpang = (state: any) => state.tumpang

export const {setTDate, setPickUpPoint, setNumber, setNote} = slice.actions
export default slice.reducer