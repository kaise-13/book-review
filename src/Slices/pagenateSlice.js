import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    num: 0,
    page: 1,
    bookNum:0
}

export const pagenateSlice = createSlice({
    name: 'pagenate',
    initialState,
    reducers: {
        firstPage(state, action) {
            if (state.num > 1) {
                state.num = 0
                state.page = 1
            }
        },
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
        },
        setPage(state, action) {
            const targetPage = action.payload;
            if (targetPage > 0) {
                state.page = targetPage;
                state.num = (targetPage - 1) * 10;
            }
        }
    },
})
export const { firstPage, nextPage, backPage, resetPage ,setPage} = pagenateSlice.actions