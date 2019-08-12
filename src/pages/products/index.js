import React, { Component } from "react";
import Header from "../template/header";
import { Button, FormGroup, FormControl, Table } from "react-bootstrap";
import "./index.css";
import api from "../../services/api";

class Products extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      description: "",
      products: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClick = e => {
    e.preventDefault();
    const { id, description } = this.state;

    api.get(id ? ('/produto/' + id) : ('/produtos/' + description)).then(response => { 
      this.setState({products: response.data});
    });

  };

  validateForm() {
    return this.state.id.length > 0 || this.state.description.length > 0;
  }


  render() {
    return (
    <div>
      <Header />
      <div className="Products">
          <FormGroup controlId="id"  >
            <FormControl
              autoFocus
              placeholder="Pesquisar por código"
              type="text" disabled={this.state.description}
              value={this.state.id}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="description" >
            <FormControl
              placeholder="Pesquisar por descrição"
              type="text" disabled={this.state.id}
              value={this.state.description}
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
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
        {this.state.products.map(( name, index ) => {
          return (
            <tr key={index}>
              <td>{name.id}</td>
              <td>{name.description}</td>
              <td>{name.value}</td>
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

export default Products;