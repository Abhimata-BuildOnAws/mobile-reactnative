import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    time: new Date(),
    pickUpPoint: "",
    number: "",
    note: ""
}

export const slice = createSlice({
    name: "tumpang",
    initialState: initalState,
    reducers:{
        setDate: (state, action) => {
            state.time = action.payload.date
        },
        setPickUpPoint: (state, action) => {
            state.pickUpPoint = action.payload.pickUpPoint
        },
        setNumber: (state, action) => {
            state.number = action.payload.number;
        },
        setNote: (state, action) => {
            state.note = action.payload.note
        }
    }
})

const selectDate = (state: any) => state.tumpang.date
const selectPickUpPoint = (state: any) => state.tumpang.pickUpPoint
const selectNumber = (state: any) => state.tumpang.number
const selectNote = (state: any) => state.tumpang.note

export const {setDate, setPickUpPoint, setNumber, setNote} = slice.actions
export default slice.reducer