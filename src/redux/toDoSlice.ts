import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IToDo, IToDos } from "../types/types"

const initialState: IToDos = {
  toDos: [],
}

export const toDoSlice = createSlice({
  name: "toDoSlice",
  initialState,
  reducers: {
    getAllToDos(state, action: PayloadAction<IToDos>) {
      state.toDos = action.payload.toDos
    },
    addTodo(state, action: PayloadAction<IToDo>) {
      state.toDos = [...state.toDos, action.payload]
    },
    updateToDo(state, action: PayloadAction<number>) {
      const todo = state.toDos.find((toDo) => toDo.id === action.payload)
      if (todo) {
        todo.status = !todo.status
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.toDos = state.toDos.filter((toDo) => toDo.id !== action.payload)
    },
    reorderToDos(state, action: PayloadAction<IToDo[]>) {
      state.toDos = action.payload
    },
  },
})

export default toDoSlice.reducer
export const { getAllToDos, addTodo, updateToDo, deleteTodo, reorderToDos } =
  toDoSlice.actions
