import axios from "axios"
import { addTodo, deleteTodo, getAllToDos, updateToDo } from "./toDoSlice"
import { ThunkActionCreator } from "./store"
import { IInputs } from "../types/types"

export const loadToDosThunk: ThunkActionCreator = () => (dispatch) => {
  try {
    axios.get(`${import.meta.env.VITE_URL}`).then(({ data }) => {
      dispatch(getAllToDos({ toDos: data }))
    })
  } catch (error) {
    console.log(error)
  }
}

export const addToDoThunk: ThunkActionCreator<IInputs> =
  (inputs: IInputs) => (dispatch) => {
    try {
      axios.post(`${import.meta.env.VITE_URL}`, inputs).then((response) => {
        const data = response.data
        dispatch(addTodo(data))
      })
    } catch (error) {
      console.log(error)
    }
  }

export const updateToDoThunk: ThunkActionCreator<number> =
  (id: number) => async (dispatch) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_URL}${id}`)
      if (data) {
        dispatch(updateToDo(id))
      }
    } catch (error) {
      console.log(error)
    }
  }

export const deletePostThunk: ThunkActionCreator<number> =
  (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_URL}${id}`, {
        withCredentials: true,
      })
      if (res.status === 200) {
        dispatch(deleteTodo(id))
      }
    } catch (error) {
      console.log()
      error
    }
  }
