import { IInputs } from "../../types/types"
import { ChangeEvent, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { addToDoThunk } from "../../redux/toDoThunkActions"
import { useAppDispatch } from "../../redux/hooks"
import addSound from "/add.mp3"

export default function Form() {
  const [inputs, setInputs] = useState<IInputs>({ title: "", body: "" })
  const dispatch = useAppDispatch()
  const audio = new Audio(addSound)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const addHandler = () => {
    if (inputs.title && inputs.body) {
      dispatch(addToDoThunk(inputs))
      setInputs({ title: "", body: "" })
      audio.play()
    }
  }

  //TODO Очень странная хрень с BOX из MUI

  return (
    <div>
      <Box //! После перезагрузки приложение падает (меняешь на div - работает)
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          color: "white",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="title"
          label="Название"
          color="success"
          onChange={changeHandler}
          value={inputs.title}
        />
        <TextField
          name="body"
          label="Текст"
          color="success"
          onChange={changeHandler}
          value={inputs.body}
        />
        <Button
          sx={{
            height: "55px",
          }}
          variant="contained"
          color="success"
          onClick={addHandler}
        >
          Добавить
        </Button>
      </Box>
    </div>
  )
}
