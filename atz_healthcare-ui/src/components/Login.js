import React, { useState } from "react";
import { useFormState } from "react-use-form-state";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { checkCredentials } from "./Util/AxiosUtil"
import "./css/login.css";
import axios from "axios"
const endpoint = "http://localhost:8080"

function Login(props) {
  const [formState, { text, password }] = useFormState();

  const handleSubmit = e => {
    axios.get(endpoint + '/checkcredentials', {params:{'username': formState.values.username, 'password': formState.values.password}})
    .then(response => {
      console.log(response)
      if (response.data) {
        window.location.pathname = '/dashboard'
      } else {
        alert("Incorrect username or password.")
      }
    })
    .catch( error => console.log(error))
  }

  return (
    <div>
      <div
        style={{
          float: "left",
          width: "60%",
          padding: "10px",
          display: "flex",
          flex: "column"
        }}
      >
        <div
          className="bg"
          style={{ boxShadow: "0 4px 12px 12px rgba(0, 0, 0, 0.2)" }}
        ></div>
        <div className="fg">
          <h1 id="title">ATZ Healthcare</h1>
        </div>
      </div>
      <div style={{ float: "left", width: "40%", padding: "10px" }}>
        <span
          className="row"
          style={{ paddingLeft: "30px", paddingTop: "15px" }}
        >
          <div
            className="col-lg"
            style={{ paddingRight: "5px", paddingLeft: "5px" }}
          >
            <input
              {...text("username")}
              placeholder="Username or Email"
              className="form-control"
            />
          </div>
          <div
            className="col-lg"
            style={{ paddingRight: "5px", paddingLeft: "5px" }}
          >
            <input
              {...password("password")}
              placeholder="Password"
              className="form-control"
            />
          </div>
          <div
            className="col-lg"
            style={{ paddingRight: "5px", paddingLeft: "5px" }}
          >
            <Button variant="outline-primary" onClick={e => handleSubmit(e)}>
              Login
            </Button>
          </div>
        </span>
        <div className="row">
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: "10%",
              left: "65%"
            }}
          >
            {/*this inline style centers its children using absolute positioning on the page... the right property will center relative to the div which is 40% of the page. */}
            <h1>What can we do to help you?</h1>
            <p style={{ paddingTop: "30px", fontWeight: "bold" }}>
              Sign up for a better <i>you</i> today...
            </p>

            <Button variant="primary" size="lg" block>
              Sign Up
              </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;