import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';
/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* Products component */
const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
);

/* App component */
const App = () => (
  <div>
    <nav>
      <ul>

        <li><Link to="/">Homes</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/category" component={Category}/>
      <Route path="/products" component={Products}/>
    </Switch>

  </div>
);

export default App;
