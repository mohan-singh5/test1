import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropdownValuesT, ProfessionalsT } from "./professionalsType";

export interface professionalsState {
  professionals: ProfessionalsT;
  dropdowns: DropdownValuesT;
}

const initialState: professionalsState = {
  professionals: {} as ProfessionalsT,
  dropdowns: {} as DropdownValuesT,
};

const professionalsSliceReducers = createSlice({
  name: "professionals",
  initialState,
  reducers: {
    setAllProfessionals: (state, actions: PayloadAction<ProfessionalsT>) => {
      state.professionals = actions.payload;
    },
    setDropdownList: (state, actions: PayloadAction<DropdownValuesT>) => {
      state.dropdowns = actions.payload;
    },
  },
});

export const { setAllProfessionals, setDropdownList } =
  professionalsSliceReducers.actions;

export default professionalsSliceReducers;
