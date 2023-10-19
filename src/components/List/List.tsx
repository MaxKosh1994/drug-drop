import { RootState } from "../../redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useAppDispatch } from "../../redux/hooks"
import {
  deletePostThunk,
  loadToDosThunk,
  updateToDoThunk,
} from "../../redux/toDoThunkActions"
import styles from "./List.module.css"
import DeleteIcon from "@mui/icons-material/Delete"
import { reorderToDos } from "../../redux/toDoSlice"
import Checkbox from "@mui/material/Checkbox"
import deleteSound from "/delete.mp3"

//! ДЛЯ DRUG AND DROP
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function List() {
  const dispatch = useAppDispatch()
  const toDos = useSelector((store: RootState) => store.toDoSlice.toDos)
  const audio = new Audio(deleteSound)

  useEffect(() => {
    dispatch(loadToDosThunk())
  }, [dispatch])

  const deleteHandler = (id: number) => {
    dispatch(deletePostThunk(id))
    audio.play()
  }

  const toggleStatus = (id: number) => {
    dispatch(updateToDoThunk(id))
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } }

  //! ДЛЯ DRUG AND DROP
  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const newOrder = Array.from(toDos)
    const [removed] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, removed)

    dispatch(reorderToDos(newOrder))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="cards">
        {(provided) => (
          <div
            className={styles.toDoContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((el, index) => (
              <Draggable key={el.id} draggableId={String(el.id)} index={index}>
                {(provided) => (
                  <Card
                    className={styles.card}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Checkbox
                      onChange={() => toggleStatus(el.id)}
                      checked={el.status}
                      {...label}
                      color="success"
                    />
                    <CardContent sx={{ width: "70%" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          transition: "color 0.3s",
                          color: !el.status ? "black" : "initial",
                        }}
                      >
                        {el.title}
                        {el.status ? (
                          <div
                            style={{
                              content: "",
                              position: "absolute",
                              top: "50%",
                              left: "0",
                              width: "100%",
                              height: "2px",
                              background: "black",
                              transform: el.status ? "scaleX(1)" : "scaleX(0)",
                              transformOrigin: "left",
                              transition: "transform 0.3s",
                            }}
                          />
                        ) : null}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {el.body}
                      </Typography>
                    </CardContent>
                    <Button
                      sx={{
                        fontSize: "13px",
                        width: "100px",
                      }}
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => deleteHandler(el.id)}
                    >
                      Удалить
                    </Button>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
