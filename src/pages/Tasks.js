import { useState } from 'react';
import HomeForm from '../components/pages/HomeForm';
import HomeTable from '../components/pages/HomeTable';

const Home = () => {

    /* estado que representa las tareas existentes */
    const [tasks, setTasks] = useState([
        { id: 1, responsable: "Andrés", description: "Limpiar" },
        { id: 2, responsable: "Javiera", description: "Cocinar" }
    ])

     /* estado que representa el id de la tarea seleccionada para editar */
    const [taskId, setTaskId] = useState(null)

    return (
        <main className="main">

            <div className="main__form">
                <HomeForm {...{ tasks, setTasks, taskId, setTaskId }} />
            </div>

            <div className="main__table">
                <HomeTable {...{ tasks, setTasks, taskId, setTaskId }} />
            </div>

        </main>
    )
}

export default Home
