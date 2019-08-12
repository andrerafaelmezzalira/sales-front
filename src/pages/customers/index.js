import React, { Component } from "react";
import Header from "../template/header";
import { Button, FormGroup, FormControl, Table } from "react-bootstrap";
import "./index.css";
import api from "../../services/api";

class Customers extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      customers: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClick = e => {
    e.preventDefault();
    const { name } = this.state;

    api.get('/clientes/' + name).then(response => { 
      this.setState({customers: response.data});
    });

  };

  validateForm() {
    return this.state.name.length > 0;
  }


  render() {
    return (
    <div>
      <Header />
      <div className="Customers">
          <FormGroup controlId="name" >
            <FormControl
            autoFocus
              placeholder="Pesquisar por nome"
              type="text" 
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            disabled={!this.validateForm()}
            onClick={this.handleClick}
            type="button">
            Pesquisar
          </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
        {this.state.customers.map(( name, index ) => {
          return (
            <tr key={index}>
              <td>{name.id}</td>
              <td>{name.name}</td>
              <td>{name.cpfCnpj}</td>
              <td>{name.address}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
      </div>

    </div>    
    );
  }
}

export default Customers;