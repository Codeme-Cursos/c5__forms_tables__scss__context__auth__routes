import { useEffect, useState } from "react";
import Form from "../shared/forms/Form";
import FormInput from "../shared/forms/FormInput";
import Button from "../shared/buttons/Button";
import Swal from "sweetalert2";

const HomeForm = ({ tasks, setTasks, taskId, setTaskId }) => {
    /* estado que represtan la actual tarea que se crea o se edita */
    const [form, setForm] = useState({
        responsable: "",
        description: ""
    })
    /* Efecto que carga form con la información correspondiente a la tarea a editar, si se va a crear una tarea (task) este efecto no hace nada. */
    useEffect(() => {
        const selected = tasks.filter(task => task.id === taskId)
        taskId && setForm(selected[0])
    }, [taskId, tasks])

    /* Función para validar elementos del formulario */
    const formValidation = (task, success) => {
        const { responsable, description } = task
        if (responsable.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Algo anda mal',
                text: 'Nombre debe tener al menos 3 letras!'
            })
        } else if (description.length < 5) {
            Swal.fire({
                icon: 'error',
                title: 'Algo anda mal',
                text: 'Descripción debe tener al menos 5 letras!'
            })
        } else {
            success()
        }
    }
    /* Función para agregar un nueva tarea (task) al listado de tareas (tasks) */
    const addTask = async () => {
        /* Forma de generar id, pero puede generar duplicidad */
        /* const id = tasks.length + 1; */
        const id = tasks.length > 0 ? (tasks[tasks.length - 1].id) + 1 : 1;
        const newTask = { ...form, id }
        setTasks([...tasks, newTask])
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones',
            text: 'Tarea creada con éxito!'
        }).then(() => resetForm())

    }
    /* Función para editar una tarea existente (task) al listado de tareas (tasks), mediante la búsqueda del índice. */
    const editTask = async () => {
        /* forma menos eficiente de obtener el index y mutando array */
        /* let index = null;
        tasks.map((task, i) => {
            if (task.id === taskId) {
                index = i
            }
            return null;
        }) */
        /* forma mas eficiente de obtener el index y mutando array */
        /* 
            const index = tasks.findIndex(task => task.id === taskId)
            tasks[index].responsable = form.responsable;
            tasks[index].description = form.description; 
        */
        /* forma mas eficiente de obtener el index y sin mutar array */
        const deletedEditTasks = tasks.filter(task => task.id !== taskId)
        const editedTask = {
            id: taskId,
            responsable: form.responsable,
            description: form.description
        }
        setTasks([...deletedEditTasks, editedTask])
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones',
            text: 'Tarea modificada con éxito!'
        }).then(() => resetForm())
    }
    /* Función que resetea el form */
    const resetForm = () => {
        setForm({
            responsable: "",
            description: ""
        })
        setTaskId(null)
    }
    /* Función para manejar el evento change que genera cada input del formulario */
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    /* Función para manejar el evento submit que genera el formulario */
    const handleSubmit = () => {
        if (!taskId) {
            formValidation(form, addTask)
        } else {
            formValidation(form, editTask)
        }
    }

    return (
        <Form onSubmit={handleSubmit} title={`${taskId ? "Edición" : "Creación"} de Tarea`}>
            <FormInput
                label="Responsable"
                id="responsableInput"
                value={form.responsable}
                handleChange={handleChange}
                name="responsable"
            />
            <FormInput
                type="textArea"
                label="Descripción"
                id="descriptionInput"
                value={form.description}
                handleChange={handleChange}
                name="description"
            />
            <Button
                type="submit"
                color={taskId ? "success" : "primary"}
                text={`${taskId ? "Editar" : "Crear"} Tarea`}
            />
            {
                taskId && <Button
                    color="danger"
                    text="Cancelar"
                    onClick={resetForm}
                />
            }
        </Form>
    )
}

export default HomeForm
