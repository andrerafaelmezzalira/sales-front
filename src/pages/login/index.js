import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, FormGroup, FormControl } from "react-bootstrap";

import api from "../../services/api";
import { login } from "../../services/auth";

import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { email, password });
        login(response.data);
        this.props.history.push("/home");
      } catch (err) {
        this.setState({
          error:
            "Login inválido"
        });
      }
    }
  };

  render() {
    return (
      
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" >
            <label>Email</label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <label>Password</label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
           {this.state.error && <p>{this.state.error}</p>}
          <Button
            block
            disabled={!this.validateForm()}
            type="submit">
            Login
          </Button>
        </form>
      </div>
      
    );
  }
}

export default withRouter(Login);