import { Badge, Card, Container } from "react-bootstrap";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import { useParams } from "react-router-dom";
import TasksNavbar from "../../components/TasksNavbar";
import { tasksData } from "./data";
import { FiTrash } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

export default function Tasks() {
  const { nav } = useParams();

  return (
    <Container className="mt-1">
      <TasksNavbar />
      <div className="p-1">
        <h4 className="p-2">
          {title({ nav: nav, qntTasks: tasksData.length })}
        </h4>
        {
          //Render all tasks according to the selected nav
          tasksData.map((task, i) => {
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
                        <Badge bg="dark" className="float-end mt-1">
                          <FiTrash />
                        </Badge>
                        <Badge
                          style={{ backgroundColor: "#8e24aa" }}
                          bg="bcaaa4"
                          className="float-end me-2 mt-1"
                        >
                          <BiEdit />
                        </Badge>
                        <Badge bg="light" className="float-end">
                          {statusIcon(task.status)}
                        </Badge>

                        <p className="ms-2">{task.title}</p>
                      </div>
                    </div>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>{task.notes}</p>
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

interface Title {
  nav: string | undefined;
  qntTasks: Number;
}
