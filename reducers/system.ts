import {createSlice} from '@reduxjs/toolkit'

interface SystemState{
  modalIsOpen: boolean;
  isLoading: boolean;
}

const initialState:SystemState = {
  modalIsOpen: false,
  isLoading: false,
}

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers:{
    openModalAction:(state: SystemState) => {
      state.modalIsOpen = true;
    },
    closeModalAction:(state: SystemState) => {
      state.modalIsOpen = false;
    },
    startLoadingAction: (state: SystemState) => {
      state.isLoading = true;
    },
    endLoadingAction: (state: SystemState) => {
      state.isLoading = false;
    }
  }
})

export default systemSlice.reducer