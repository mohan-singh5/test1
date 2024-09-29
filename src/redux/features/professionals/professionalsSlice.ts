import { createSlice } from "@reduxjs/toolkit";
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
  name: "uploadDesign",
  initialState,
  reducers: {
    setAllProfessionals: (
      state,
      actions: {
        payload: ProfessionalsT;
        type: string;
      }
    ) => {
      state.professionals = actions.payload;
    },
    setDropdownList: (
      state,
      actions: {
        payload: DropdownValuesT;
        type: string;
      }
    ) => {
      state.dropdowns = actions.payload;
    },
  },
});

export const { setAllProfessionals, setDropdownList } =
  professionalsSliceReducers.actions;

export default professionalsSliceReducers;
