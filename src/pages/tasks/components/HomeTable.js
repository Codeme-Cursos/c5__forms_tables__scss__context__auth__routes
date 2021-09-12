import SVGDelete from "../../../components/icons/SVGDelete";
import SVGEdit from "../../../components/icons/SVGEdit";
import Table from "../../../components/tables/Table";
import Swal from "sweetalert2";
const { REACT_APP_API } = process.env;

const HomeTable = (props) => {

  const { tasks, setTaskId, taskId, getTasks } = props;

  /* Representa las cabezeras de las tablas, contiene el titulo de la columna
     y el valor a dividir por 10 para obtener el % de ancho de la misma */
  const headers = ["id,1", "Responsable,3", "Descripción,4", "Opciones,2"];

  /* Función para eliminar una tarea existente, utilizando el id de la tarea a eliminar */
  const deleteTask = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El siguiente registro será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${REACT_APP_API}/task/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          Swal.fire({
            icon: "success",
            title: "Felicitaciones",
            text: data.success,
          }).then(() => getTasks());
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
          });
        }
      }
    });
  };

  return (
    <Table headers={headers}>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <tr key={task.id}>
            <th className="table__row__1">{task.id}</th>
            <td className="table__row__3">{task.responsable}</td>
            <td className="table__row__4">{task.description}</td>
            <td className="table__row__2">
              <div>
                <span onClick={() => setTaskId(task.id)}>
                  <SVGEdit
                    size={15}
                    color={taskId && task.id === taskId ? "#80a842" : undefined}
                  />
                </span>
                <span
                  onClick={() => deleteTask(task.id)}
                  className={taskId && "d-none"}
                >
                  <SVGDelete size={23} color="crimson" />
                </span>
              </div>
            </td>
          </tr>
        ))}
    </Table>
  );
};

export default HomeTable;
