import {
  configureStore,
  ThunkAction,
  combineReducers,
  Action,
} from "@reduxjs/toolkit"
import toDoSlice from "./toDoSlice"

const rootReducer = combineReducers({
  toDoSlice: toDoSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type ThunkActionCreator<PayloadType = void, ReturnType = void> = (
  payload: PayloadType,
) => AppThunk<ReturnType>
