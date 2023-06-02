import { createSlice } from "@reduxjs/toolkit"
import { IconType } from "react-icons"
import { FaCheck } from "react-icons/fa"

export interface SnackBarState {
    bgColor: string
    icon: IconType,
    message: string,
    shown: boolean
}
const initialState: SnackBarState = {
    bgColor: "bg-success",
    icon: FaCheck,
    message: "Created successfully",
    shown: false
}

const snackBarSlice = createSlice({
    name: "snackBarSlice",
    initialState,
    reducers: {
        showSnackBar(state, actions) {
            return {
                ...state,
                bgColor: actions.payload.bgColor,
                icon: actions.payload.icon,
                message: actions.payload.message,
                shown: true
            }
        },
        hideSnackBar(state) {
            return { ...state, shown: false };
        }
    }
})
export const { showSnackBar, hideSnackBar } = snackBarSlice.actions
export default snackBarSlice.reducer