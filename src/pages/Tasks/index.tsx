import { Badge, Card, Container } from "react-bootstrap";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import { useParams } from "react-router-dom";
import TasksNavbar from "../../components/TasksNavbar";
import { FiBox, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import NewTaskModal from "../../components/NewTaskModal";
import { deleteTask, getTasks } from "../../API";
import Skeleton from "react-loading-skeleton";

export default function Tasks() {
  const { nav } = useParams();
  const [tasksData, setTasksData] = useState<Array<TasksData>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

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

  const handleTaskDelete = async (id: Number) => {
    setIsLoading(true);
    let request = await deleteTask(id);
    if (request) {
      let data = await getTasks();
      if (data) {
        setTasksData(data);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return loadingSkeleton();
  } else if (tasksData && tasksData.length === 0) {
    return emptyState();
  }

  return (
    <Container className="mt-1">
      {<NewTaskModal />}

      <TasksNavbar />
      <div className="p-1">
        <h4 className="p-3">
          {title({ nav: nav, qntTasks: tasksData.length })}
        </h4>
        {
          //Render all tasks according to the selected nav
          tasksData.map((task, i) => {
            let showDeleteIcon = true;
            if (nav === "doing") {
              if (task.status === 0) {
                return null;
              }
            } else if (nav === "canceled") {
              if (task.status === 1) {
                return null;
              }
              showDeleteIcon = false;
            }
            return (
              <Card key={i} className="mt-2">
                <Card.Header>
                  <Card.Title>
                    <div className="float-right">
                      <div>
                        {showDeleteIcon && (
                          <Badge
                            bg="dark"
                            className="float-end mt-1"
                            onClick={() => handleTaskDelete(task.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <FiTrash />
                          </Badge>
                        )}

                        <Badge bg="light" className="float-end">
                          {statusIcon(task.status)}
                        </Badge>

                        <p className="ms-2">
                          {task.title}{" "}
                          <Badge bg="dark">
                            {task.time} -{" "}
                            {task.date.split("/").reverse().join("/")}
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
    </Container>
  );
}

/**
 * Title depending to a nav click
 */
const title = ({ nav, qntTasks }: Title) => {
  let response: string;
  switch (nav) {
    case "doing":
      response = "Atualmente você tem " + qntTasks + " tarefas em andamento.";
      break;
    case "canceled":
      response = "Atualmente você tem " + qntTasks + " tarefas canceladas.";
      break;
    default:
      response = "Atualmente você tem " + qntTasks + " tarefas.";
      break;
  }
  return response;
};

/**
 * Status of an task icon
 */
const statusIcon = (status: Number) => {
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

interface Title {
  nav: string | undefined;
  qntTasks: Number;
}

interface TasksData {
  id: Number;
  title: string;
  note: string;
  date: string;
  time: string;
  status: Number;
}
