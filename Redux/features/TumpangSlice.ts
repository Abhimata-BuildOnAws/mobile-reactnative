import { createSlice } from "@reduxjs/toolkit";

type coordinates = {}

const initalState = {
    time: "ASAP",
    pickUpPoint: "",
    number: "",
    note: "",
    lat: 0.0,
    long: 0.0
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
        setLatLong: (state, action) => {
            state.lat = action.payload.lat
            state.long = action.payload.long
        }
    }
})

export const selectDate = (state: any) => state.tumpang.time
export const selectPickUpPoint = (state: any) => state.tumpang.pickUpPoint
export const selectNumber = (state: any) => state.tumpang.number
export const selectNote = (state: any) => state.tumpang.note
export const selectTumpang = (state: any) => state.tumpang
export const selectLat = (state: any) => state.lat
export const selectLong = (state: any) => state.long

export const {setTDate, setPickUpPoint, setNumber, setNote, setLatLong} = slice.actions
export default slice.reducer