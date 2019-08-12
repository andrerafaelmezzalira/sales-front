import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Login from "./pages/login";
import Home from "./pages/home";
import Products from "./pages/products";
import Customers from "./pages/customers";
import Customer from "./pages/customer";
import CustomerRequest from "./pages/customerRequest";
import CustomersRequest from "./pages/customersRequest";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/produtos" component={Products} />
      <PrivateRoute path="/clientes" component={Customers} />
      <PrivateRoute path="/cliente" component={Customer} />
      <PrivateRoute path="/pedido" component={CustomerRequest} />
      <PrivateRoute path="/pedidos" component={CustomersRequest} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;