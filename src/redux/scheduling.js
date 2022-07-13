import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: "scheduling",
    initialState: {
        dateToSchedule: '',
        timeToSchedule: '',
        // timeToSchedule: new Date().toLocaleString('default', {hour:'2-digit', minute:'2-digit', hourCycle:'h12'}),
    },
    reducers: {
        settingDate: (state, action) => {
            state.dateToSchedule = action.payload;
        },
        settingTime: (state, action) => {
            state.timeToSchedule = action.payload;
        },
        canceling: (state) => {
            state.dateToSchedule = new Date().toLocaleDateString();
        },
    },
});

export const {
    settingDate,
    settingTime,
    canceling,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;