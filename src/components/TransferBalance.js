import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import Balance from './Balance'
import MeritMoneyService from "../services/merit-money.service";
import UserQuery from './UserQuery'
import jwt_decode from "jwt-decode";

const TransferBalance = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    document.getElementsByClassName('loading-request')[0].classList.add('hidden');
    setForm({
      userId: '',
      value: '',
    })
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    userId: '',
    value: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleCallback = (childData) => setForm({
    ...form,
    userId: childData
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementsByClassName('loading-request')[0].classList.remove('hidden');
    const token = JSON.parse(localStorage.getItem("user")).token;
    const userId = jwt_decode(token).id

    const body = {
      owner: userId,
      sendTo: parseInt(form.userId),
      value: parseInt(form.value)
    }

    MeritMoneyService.transferMoney(body)
      .then(
        (response) => {
          props.parentCallback();
          handleClose()
        },
        (error) => {

        }
      );
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="float-end">
        Celebrar com colegas
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transferência de saldo</Modal.Title>
          {/* <Balance /> */}
        </Modal.Header>
        <Modal.Body>
          <div className="clearfix loading-request hidden">
            <div className="spinner-border text-info float-end" role="status">
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Colaborador</Form.Label>
              <UserQuery parentCallback={handleCallback} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                id="value"
                placeholder="M$ 0000,00"
                value={form.value}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>

            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default TransferBalance;