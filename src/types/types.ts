export interface IToDo {
  id: number
  title: string
  body: string
  status: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IToDos {
  toDos: IToDo[]
}

export interface IInputs {
  title: string
  body: string
}
