import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    nextPage: (state, action: PayloadAction<number>) => {
      const totalPages = action.payload;
      if (state.page < totalPages) {
        state.page += 1;
      }
    },
    prevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },
});

export const { nextPage, prevPage } = pageSlice.actions;
export default pageSlice.reducer;
