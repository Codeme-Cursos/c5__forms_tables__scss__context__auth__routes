import { useEffect, useState } from "react";
import Form from "../../../components/forms/Form";
import FormInput from "../../../components/forms/FormInput";
import Button from "../../../components/buttons/Button";
import Swal from "sweetalert2";
const { REACT_APP_API } = process.env;

const HomeForm = (props) => {

  const { tasks, taskId, setTaskId, getTasks } = props;

  /* estado que representa la actual tarea que se está creando o editando */
  const [form, setForm] = useState({
    responsable: "",
    description: "",
  });
  /* Efecto que carga form con la información correspondiente a la tarea a editar, si se va a crear una tarea (task) este efecto no hace nada. */
  useEffect(() => {
    const selected = tasks.filter((task) => task.id === taskId);
    taskId && setForm(selected[0]);
  }, [taskId, tasks]);

  /* Función para validar elementos del formulario */
  const formValidation = (task, success) => {
    const { responsable, description } = task;
    if (responsable.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Algo anda mal",
        text: "Nombre debe tener al menos 3 letras!",
      });
    } else if (description.length < 5) {
      Swal.fire({
        icon: "error",
        title: "Algo anda mal",
        text: "Descripción debe tener al menos 5 letras!",
      });
    } else {
      success();
    }
  };

  /* Función para agregar un nueva tarea (task) al listado de tareas (tasks) */
  const addTask = async () => {
    try {
      const { responsable, description } = form;
      const res = await fetch(`${REACT_APP_API}/task`, {
        method: "POST",
        body: JSON.stringify({
          responsable,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Felicitaciones",
        text: data.success,
      }).then(() => {
        getTasks();
        resetForm();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  /* Función para editar una tarea existente (task) al listado de tareas (tasks), mediante la búsqueda del índice. */
  const editTask = async () => {
    try {
      const { responsable, description } = form;
      const res = await fetch(`${REACT_APP_API}/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          responsable,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Felicitaciones",
        text: data.success,
      }).then(() => {
        getTasks();
        resetForm();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  /* Función que resetea el estado form */
  const resetForm = () => {
    setForm({
      responsable: "",
      description: "",
    });
    setTaskId(null);
  };

  /* Función para manejar el evento change que genera cada input del formulario */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Función para manejar el evento submit que genera el formulario */
  const handleSubmit = () => {
    if (!taskId) {
      formValidation(form, addTask);
    } else {
      formValidation(form, editTask);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      title={`${taskId ? "Edición" : "Creación"} de Tarea`}
    >
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
      {taskId && <Button color="danger" text="Cancelar" onClick={resetForm} />}
    </Form>
  );
};

export default HomeForm;
