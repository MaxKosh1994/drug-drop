import styles from "./MainPage.module.css"
import Form from "../../components/Form/Form"
import List from "../../components/List/List"

function MainPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Список дел</h1>
      <Form />
      <List />
    </div>
  )
}

export default MainPage
