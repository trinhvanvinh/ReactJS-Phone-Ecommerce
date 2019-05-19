import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Detail from './components/Detail';
import Details from './components/Details';
import ProductList from './components/ProductList';
import Default from './components/Default';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
    </React.Fragment>
  );
}

export default App;
