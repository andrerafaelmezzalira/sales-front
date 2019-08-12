import React, { Component } from "react";
import Header from "../template/header";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./index.css";
import api from "../../services/api";

class Customer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      cpfCnpj: "",
      address: "",
      error: ""
    };
  
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return this.state.address.length > 0 && this.state.name.length > 0 && this.state.cpfCnpj.length > 0;
  }


  handleSubmit = e => {
    e.preventDefault();
      const { id, address, name, cpfCnpj } = this.state;
      api.post("/cliente", { id, address, name, cpfCnpj }).
      then(response => { 
        this.setState(response.data);
      }).catch(err=> { this.setState({error: 'CPF/CNPJ já existe'}); });
  };

  render() {
    return (
    <div>
      <Header />
      <div className="Customer">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="id"  >
            <label>Id</label>
            <FormControl
              disabled              
              type="text"
              value={this.state.id}
            />
          </FormGroup>
          <FormGroup controlId="name" >
            <label>Nome</label>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="cpfCnpj" >
            <label>CPF/CNPJ</label>
            <FormControl
              type="text" disabled={this.state.id}
              value={this.state.cpfCnpj}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="address" >
            <label>Endereço</label>
            <FormControl
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </FormGroup>
            {this.state.error && <p>{this.state.error}</p>}
          <Button
            block
            disabled={!this.validateForm()}
            type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </div>    
    );
  }
}

export default Customer;