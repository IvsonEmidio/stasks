import { TaskObject } from "../../interfaces";
import { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { createTask } from "../../API";
import { useNavigate } from "react-router-dom";

export default function NewTaskModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const handleClick = () => setIsModalOpen(!isModalOpen);
  const [taskData, setTaskData] = useState<TaskObject>({
    title: "",
    note: "",
    date: "",
    time: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleValues = (value: any, key: string) => {
    let newObject = taskData;
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
      default:
        break;
    }
    setTaskData(newObject);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMsg("");

    let { title, note, date, time } = taskData;
    if (!title || !note || !date || !time) {
      setErrorMsg("Por favor, preencha todos os campos");
    } else {
      let isNewTaskCreated = await createTask(taskData);
      if (isNewTaskCreated) {
        setSuccessMsg(
          "Sua tarefa foi adicionada com sucesso, que tal adicionar mais?"
        );
        setTaskData({
          title: "",
          note: "",
          date: "",
          time: "",
        });
        return navigate("/task-added", { replace: true });
      } else {
        setErrorMsg(
          "Ocorreu um erro desconhecido, por favor, tente novamente mais tarde"
        );
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return loadingSkeleton();
  }

  return (
    <div>
      <Badge
        bg="8e24aa"
        style={{ backgroundColor: "#8e24aa", cursor: "pointer" }}
        className="float-end mt-1"
        onClick={() => handleClick()}
      >
        <AiOutlinePlusCircle size={20} />
      </Badge>

      <Modal show={isModalOpen} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Adicione uma nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome da tarefa"
                onChange={(e) => handleValues(e.target.value, "title")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <textarea
                className="form-control"
                onChange={(e) => handleValues(e.target.value, "note")}
                placeholder="Se quiser, você pode inserir notas sobre essa tarefa."
                style={{ height: 100 }}
              ></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                onChange={(e) => handleValues(e.target.value, "date")}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                onChange={(e) => handleValues(e.target.value, "time")}
                type="time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {errorMsg && (
          <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
        )}
        {successMsg && (
          <p style={{ color: "green", textAlign: "center" }}>{successMsg}</p>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Cancelar
          </Button>
          <Button onClick={() => handleSubmit()} variant="primary">
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const loadingSkeleton = () => {
  return (
    <div>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Só um instante...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Skeleton height={14} highlightColor="#8e24aa" count={7} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
