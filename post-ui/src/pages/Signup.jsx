import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import SIGNUP from "../graphql/mutations/createUser"

const Signup = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);

  const [createUser, { data }] = useMutation(SIGNUP, {
    onError(err) {
      console.log(err);
      setError(err.message);
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setError("");
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!values.password) {
      setError("Password is required");
      return;
    }
    if (!age) {
      setError("Age is required");
      return;
    }
    createUser({
      variables: {
        name: name,
        password: values.password,
        age: parseFloat(age),
      },
    });
  };

  let history = useHistory();

  if (data?.createUser?.id) {
    localStorage.setItem("signupCompleted", true);
    history.push(`/profile/${data.createUser.id}`);
  }

  return (
    <div>
      <h1
        style={{
          color: "#00bcd4",
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "bold",
        }}
      >
        {" "}
        POST UI
      </h1>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <TextField
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            fullWidth
            label="Your Name"
            id="name"
          />
        </Box>
        <FormControl sx={{ width: "100%", marginBottom: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box
          sx={{
            width: 100,
            marginBottom: 2,
          }}
        >
          <TextField
            id="outlined-number"
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setAge(e.target.value);
              setError("");
            }}
          />
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <br></br>
        <Button variant="contained" onClick={handleClick}>
          SIGN UP
        </Button>
      </Form>
    </div>
  );
}

export default Signup
