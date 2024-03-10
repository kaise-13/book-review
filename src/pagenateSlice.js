import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    num: 0,
    page: 1
}

export const pagenateSlice = createSlice({
    name: 'pagenate',
    initialState,
    reducers: {
        backPage(state, action) {
            if (state.num >= 0) {
                state.num = state.num - 10;
                state.page = state.page -1;
            }
        },
        nextPage(state, action) {
            state.num = state.num + 10;
            state.page = state.page + 1;
        },
        resetPage(state, action) {
            state.num = 0;
            state.page = 1;
        }
    },
})
export const { nextPage, backPage, resetPage } = pagenateSlice.actions