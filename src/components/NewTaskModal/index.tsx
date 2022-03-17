import { useState } from "react";
import { Modal, Button, Form, Badge, Toast } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { createTask } from "../../API";

export default function NewTaskModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const handleClick = () => setIsModalOpen(!isModalOpen);
  const handleClickClose = () => setIsModalOpen(false);
  const [taskData, setTaskData] = useState<TasksData>({
    title: "",
    note: "",
    date: "",
    time: "",
  });
  const [errorMsg, setErrorMsg] = useState<String>("");
  const [successMsg, setSuccessMsg] = useState<String>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleTitle = (title: String) => {
    //Keep old values on the new object
    let newData = {
      title: title,
      note: taskData.note,
      date: taskData.date,
      time: taskData.time,
    };

    return setTaskData(newData);
  };

  const handleNote = (note: String) => {
    let newData = {
      title: taskData.title,
      note: note,
      date: taskData.date,
      time: taskData.time,
    };
    return setTaskData(newData);
  };

  const handleDate = (date: String) => {
    let newData = {
      title: taskData.title,
      note: taskData.note,
      date: date,
      time: taskData.time,
    };
    return setTaskData(newData);
  };

  const handleTime = (time: String) => {
    let newData = {
      title: taskData.title,
      note: taskData.note,
      date: taskData.date,
      time: time,
    };

    return setTaskData(newData);
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
        return window.location.replace("/tasks/doing");
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

      <Modal show={isModalOpen} onHide={() => handleClickClose()}>
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
                onChange={(e) => handleTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <textarea
                className="form-control"
                onChange={(e) => handleNote(e.target.value)}
                placeholder="Se quiser, você pode inserir notas sobre essa tarefa."
                style={{ height: 100 }}
              ></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                onChange={(e) => handleDate(e.target.value)}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                onChange={(e) => handleTime(e.target.value)}
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
          <Button variant="secondary" onClick={handleClickClose}>
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

interface TasksData {
  title: String;
  note: String;
  date: String;
  time: String;
}
