import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Category from './Category';
import Products from './Products';
import Login, { fakeAuth } from './Login';
/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Admin = () => (
 <div>
   <h2>Admin</h2>
 </div>
);

/* Definición del componente `PrivateRoute` */
const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => (authed === true ? 
        <Component {...props} />
        : 
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} 
    />
  );
}

/* App component */
const App = () => (
  <div>
    <nav>
      <ul>

        <li><Link to="/">Homes</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/category" component={Category} />
      <Route path="/products" component={Products} />
      <Route path="/login" component={Login} />
      <PrivateRoute authed={fakeAuth.isAuthenticated} path="/admin" component={Admin} />
    </Switch>

  </div>
);

export default App;
