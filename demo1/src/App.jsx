import React from 'react';
import { Link, Route } from 'react-router-dom';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* Category component */
const Category = () => (
  <div>
    <h2>Category</h2>
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

        {/* Componentes Links son usados para linkear a otras vistas */}
        <li><Link to="/">Homes</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>
    </nav>

    {/* Componentes Route son rendereizados si el prop `path` coincide con el URL actual */}
    <Route path="/" component={Home} />
    <Route path="/category" component={Category} />
    <Route path="/products" component={Products} />
  </div>
);

export default App;
