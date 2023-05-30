import { createSlice } from '@reduxjs/toolkit';
import { Plan } from "../../app/models/Plan";

export class PlanUiState {
  constructor(
    public show: boolean,
    public created: boolean,
    public isError: boolean,
    public plan: Plan
  ) {}

  showDetail: boolean = false;
  showEdit: boolean = false;

  showConfirmationMessage: boolean = false;
  isDeleted: boolean = false;
}

const initialState: PlanUiState = {
  show: false,
  created: false,
  isError: false,
  plan: {
    GROUPE_ID:0,
    COP_ID:'',
    LOC_ID:''
  },
  showDetail: false,
  showEdit: false,
  showConfirmationMessage: false,
  isDeleted: false,
};

const planUiSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    show(state) {
      state.show = true;
    },
    showDetail(state, action) {
      state.plan = action.payload;
      state.showDetail = true;
    },
    showEdit(state) {
      state.showEdit = true;
    },
    hideEdit(state) {
      state.showEdit = false;
    },
    hideDetail(state) {
      state.showDetail = false;
    },
    setCreated(state) {
      state.created = true;
    },
    setError(state) {
      state.isError = true;
    },
    initialize() {
      return initialState;
    },
    setDeleted(state) {
      state.isDeleted = true;
    },
    hide(state) {
      state.show = false;
    },
    showConfirmationMessage(state) {
      state.showConfirmationMessage = true;
    },
    setGroupId(state, action) {
      state.plan.GROUPE_ID = action.payload;
    },
    setLocId(state, action) {
      state.plan.LOC_ID = action.payload;
    },
    setCopId(state, action) {
      state.plan.COP_ID = action.payload;
    },
  },
});

export const {
  show,
  hide,
  setGroupId,
  setLocId,
  setCopId,
  showEdit,
  setCreated,
  initialize,
  setError,
  showDetail,
  hideDetail,
  showConfirmationMessage,
  setDeleted,
} = planUiSlice.actions;

export default planUiSlice.reducer;