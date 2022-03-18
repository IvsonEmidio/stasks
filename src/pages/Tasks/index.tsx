import { TaskObject } from "../../interfaces";
import { Badge, Button, Card, Container, Form, Modal } from "react-bootstrap";
import { AiFillEdit, AiOutlineFieldTime } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import { useParams } from "react-router-dom";
import TasksNavbar from "../../components/TasksNavbar";
import { FiBox, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import NewTaskModal from "../../components/NewTaskModal";
import { cancelTask, getTasks, updateTask } from "../../API";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";

export default function Tasks() {
  const { nav } = useParams();
  const [tasksData, setTasksData] = useState<Array<TaskObject>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean | undefined>(
    false
  );
  const [taskToEdit, setTaskToEdit] = useState<TaskObject>(defaultTaskObject);
  const [editTaskErrorMsg, setEditTaskErrorMsg] = useState<string>("");

  //Get tasks data
  useEffect(() => {
    setIsLoading(true);
    let fetchData = async () => {
      let data = await getTasks();
      if (data) {
        setTasksData(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTaskDelete = async (id: Number | undefined) => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    let request = await cancelTask(id);
    if (request) {
      toast("📝 Tarefa cancelada com sucesso", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let data = await getTasks();
      if (data) {
        setTasksData(data);
        setIsLoading(false);
      }
    }
  };

  const handleEditModalClick = (task: TaskObject) => {
    setIsEditModalOpen(true);
    setTaskToEdit(task);
  };

  const handleEditTaskValues = (value: any, key: string) => {
    let newObject = taskToEdit;
    switch (key) {
      case "title":
        newObject.title = value;
        break;
      case "note":
        newObject.note = value;
        break;
      case "date":
        newObject.date = value;
        break;
      case "time":
        newObject.time = value;
        break;
    }
    setTaskToEdit(newObject);
  };

  const handleUpdateTask = async () => {
    setIsLoading(true);
    let update = await updateTask(taskToEdit);
    if (update) {
      let data = await getTasks();
      if (data) {
        setTasksData(data);
        toast("📝 Tarefa atualizada com sucesso", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setEditTaskErrorMsg(
          "Aconteceu um erro desconhecido, por favor, tente novamente."
        );
      }
    } else {
      setEditTaskErrorMsg(
        "Aconteceu um erro desconhecido, por favor, tente novamente."
      );
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return loadingSkeleton();
  } else if (tasksData && tasksData.length === 0) {
    return emptyState();
  }

  return (
    <Container className="mt-1">
      {<NewTaskModal />}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <TasksNavbar />
      <div className="p-1">
        <h4 className="p-3">{title({ nav: nav, tasks: tasksData })}</h4>
        {
          //Render all tasks according to the selected nav
          tasksData.map((task, i) => {
            let showDeleteIcon = true;
            if (task.status === 0) {
              showDeleteIcon = false;
            }
            if (nav === "doing") {
              if (task.status === 0) {
                return null;
              }
            } else if (nav === "canceled") {
              if (task.status === 1) {
                return null;
              }
            }
            return (
              <Card key={i} className="mt-2">
                <Card.Header>
                  <Card.Title>
                    <div className="float-right">
                      <div>
                        {showDeleteIcon && (
                          <div>
                            <Badge
                              bg="dark"
                              className="float-end mt-1"
                              onClick={() => handleTaskDelete(task.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <FiTrash />
                            </Badge>

                            <Badge
                              bg="#6969F1"
                              style={{
                                backgroundColor: "#6969F1",
                                cursor: "pointer",
                              }}
                              className="float-end me-2 mt-1"
                              onClick={() => handleEditModalClick(task)}
                            >
                              <AiFillEdit size={15} />
                            </Badge>
                          </div>
                        )}

                        <Badge bg="light" className="float-end">
                          {statusIcon(task.status)}
                        </Badge>

                        <p className="ms-2">
                          {task.title}{" "}
                          <Badge bg="dark">
                            {task.time} -{" "}
                            {task.date.split("-").reverse().join("/")}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>{task.note}</p>
                </Card.Body>
              </Card>
            );
          })
        }
      </div>

      <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Atualize a tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder={taskToEdit.title}
                onChange={(e) => {
                  handleEditTaskValues(e.target.value, "title");
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <textarea
                className="form-control"
                onChange={(e) => handleEditTaskValues(e.target.value, "note")}
                placeholder={taskToEdit.note}
                style={{ height: 100 }}
              ></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                onChange={(e) => handleEditTaskValues(e.target.value, "date")}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                onChange={(e) => handleEditTaskValues(e.target.value, "time")}
                type="time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {editTaskErrorMsg && (
          <p style={{ color: "red", textAlign: "center" }}>
            {editTaskErrorMsg}
          </p>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

/**
 * Title depending to a nav click
 */
const title = ({ nav, tasks }: Title) => {
  let response: string;
  let totalTasks: Number = tasks.length;
  let doingTasks: number = 0;
  let canceledTasks: number = 0;

  tasks.forEach((task) => {
    if (task.status === 1) {
      doingTasks++;
    } else if (task.status === 0) {
      canceledTasks++;
    }
  }, []);

  switch (nav) {
    case "doing":
      response = "Atualmente você tem " + doingTasks + " tarefas em andamento.";
      break;
    case "canceled":
      response =
        "Atualmente você tem " + canceledTasks + " tarefas canceladas.";
      break;
    default:
      response = "Atualmente você tem " + totalTasks + " tarefas.";
      break;
  }
  return response;
};

/**
 * Status of an task icon
 */
const statusIcon = (status: Number | undefined) => {
  if (!status) {
    return;
  }
  let iconSize = 25;
  switch (status) {
    case 0: //Cancelled
      return <AiOutlineFieldTime size={iconSize} color="red" />;
    case 1:
      return <FaRunning size={iconSize} color="green" />;
  }
};

const loadingSkeleton = () => {
  return (
    <Container className="mt-1">
      {<NewTaskModal />}

      <TasksNavbar />
      <div className="p-1">
        <Skeleton height={60} highlightColor={"#8e24aa"} count={5} />
      </div>
    </Container>
  );
};

const emptyState = () => {
  return (
    <Container className="mt-1">
      {<NewTaskModal />}

      <TasksNavbar />
      <div className="row mt-5 pd-2">
        <div
          className="col"
          style={{ justifyContent: "center", display: "flex" }}
        >
          <Card bg="light">
            <h3 className="ms-4">
              Está tudo tão vazio, que tal adicionar algumas tarefas?
              <i className="ms-2 me-4">{<FiBox />}</i>
            </h3>
          </Card>
        </div>
      </div>
    </Container>
  );
};

const defaultTaskObject = {
  id: 0,
  title: "",
  note: "",
  date: "",
  time: "",
  status: 1,
};

interface Title {
  nav: string | undefined;
  tasks: Array<TaskObject>;
}
