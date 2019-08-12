import React from 'react';

import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
       return (
        <div>
            <Link to="/home">Home</Link>&nbsp;
            <Link to="/produtos">Consultar Produtos</Link>&nbsp;
            <Link to="/clientes">Consultar Cliente</Link>&nbsp;
            <Link to="/cliente">Cadastrar Cliente</Link>&nbsp;
            <Link to="/pedido">Lançar Pedido</Link>&nbsp;
            <Link to="/pedidos">Lista de Pedidos</Link>
        </div>    
       );
    }
 }

 export default Header;
