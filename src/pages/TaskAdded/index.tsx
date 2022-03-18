import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GiPartyPopper } from "react-icons/gi";
export default function TaskAdded() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    return navigate("/tasks/doing", { replace: true });
  };

  return (
    <Modal show={true}>
      <Modal.Header>
        <h3 className="text-center">
          Que legal, você adicionou uma tarefa a sua lista!
          <i className="ms-s">{<GiPartyPopper color="#8e24aa" />}</i>
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Button onClick={handleButtonClick}>Ir para minhas tarefas.</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
