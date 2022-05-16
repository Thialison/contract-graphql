import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useMutation } from "@apollo/client";
import CREATE_POST from "../graphql/mutations/createPost"

export default function AddPostModal() {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const [createPost] = useMutation(CREATE_POST, {
    onError(err) {
      console.log(err);
      setError(err.message);
    },
  });

  const handleClose = () => {
    setShow(false);
    setError("")
  }
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const refreshPage = () => {
    window.location.reload();
  };

  const handleClick = () => {
    if (!message || !title) {
      setError("Fill the Gaps");
    } else {
      createPost({
        variables: {
          userId: id,
          title,
          message,
        },
      });
      handleClose();
      refreshPage();
    }
  };

  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleShow}>
        <Button variant="contained">Add Post</Button>
      </Box>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h4 style={{ color: "#0693e3", fontWeight: "bold" }}>ADD POST</h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontWeight: "bold" }}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError("");
                }}
              />
            </Form.Group>
            {error && <Alert severity="error">Please, fill the gaps</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
