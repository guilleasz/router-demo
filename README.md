# React Router

## Introducción

### Single Page Application vs. Multiple Page Application

Cómo vimos React es una librería popular para crear single-page-applications (SPAs) qué son renderizados en el browser del cliente. Un SPA puede tener multiples vistas (aka páginas), y a diferencia the apps convencionales de múltiples páginas, navegar a través de estas vistas no deberían resultar en un página entera siento recargada. En cambio, queremos que las vistas sean renderizadas dentro de la misma página. El usuario, que se acostumbró a apps de multiples páginas, espera las siguientes caracteristicas estén presentes en un SPA: 

- Cada vista en una aplicación debería tener un URL que especifíca de manera única esa vista. Esto es por ejemplo, para que el usuario pueda guardar el URL para referenciarlo mas adelante. Ej: `www.example.com/products`
- El botón de volver a atrás o adelante debería funcionar como es esperado
- Las vistas anidadas generadas dinámicamente deberías tener su URL preferentemente. Ej: `www.example.com/products/shoes/101`, donde 101 es el id del producto

### Routing en React

**Routear** es el proceso de mantener el URL del browser sincronizado con eso que esta siendo renderizado en la página. React Router nos permite manejar rutas declarativamente. La aproximación declarativa de ruteo nos permite controlar la data flow en nuestra aplicación, al decir "la ruta debería verse así":

```JSX
<Route path="/about" component={About}/>
```
Podés colocar tu componente `<Route>` en cualquier lugar que quieras que tu ruta renderize. Dado que `<Route>`, `<Link>` y toda la API de React Router que vamos a manejar son solo componentes, podés facilmente acostumbrarte a rutear en React.


> Una nota antes de comenzar. Hay un malentendido común que React Router es una solución oficial de ruteo desarrollada por Facebook. En realidad, es una librería de terceros que es ampliamente popular por su diseño y simplicidad. 

### Overview

Esta clase esta dividido en diferentes secciones. Primero, vamos a setear **React** y **React Router** usando `npm`. Luego seguiremos con lo básico de React Router. Veremos distintas demostraciones de código de React Router en acción. Los ejemplos cubiertos en este tutorial incluyen:

1. navegación básica
1. rutas anidadas
1. rutas con parámetros
1. rutas protegidas

Todos los conceptos de construir estas rutas van a ser discutidos en el camino. El código entero para el proyecto esta disponible en este repo de GitHub. Una vez que estes en el directorio demo correspondiente, corre `npm install` para instalar las dependencias. Para servior la aplicación en un servidor de desarrollo, corré `npm start` y andá a http://localhost:3000/ para ver el demo en acción.

Empecemos!

## Iniciando nuestro Proyecto

### Create React App

Lo que tendríamos que hacer ahora es crear un nuevo proyecto de React, lo cual nos llevaría mucho tiempo generar el boilerplate, es por eso que podemos usar Create React App, un _boilerplate generator_ para generar los archivos requeridos para crear un proyecto de React básico.

Para instalarlo globalmente corre: 

```sh
$ npm install -g create-react-app
```
 Y para crear un nuevo proyecto:
 ```sh
$ create-react-app react-router-demo
 ```

 Esta es la estructura de directorios por defecto generada por Create React App:

```
 react-router-demo
    ├── .gitignore
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   └── registerServiceWorker.js
    └── yarn.lock
  ```

### Agregando React Router

La librería de React Router comprende tres paquetes: `react-router`, `react-router-dom`, y `react-router-native`. `react-router`es el paquete core para el router, mientras los otros dos son específicos del ambiente. Deberías usar `react-router-dom`si estas construyendo una página web, y `react-router-native` si estas en un desarrollo de una aplicación mobile usando React Native.

Usa npm para instalar `react-router` y `react-router-dom`:

```sh
$ npm install --save react-router react-router-dom
```

## React Router Básico

### Router

Necesitas un componente `Router` y varios componentes `Route` para setear un router básico. Como estamos construyendo una aplicación basada en el browser, podemos usar dos tipos de routers de la API de React Router:

1. `<BrowserRouter>`
1. `<HashRouter>`

La diferencia principal entre ellas es evidente en las URLs que ellos crean:

```
// <BrowserRouter>
http://example.com/about

// <HashRouter>
http://example.com/#/about
```

El `<BowserRouter>`es más popular entre las dos porque usa la API History de HTML5 para mantener en seguimiento la historia de tu router. El `<HashRouter>`, por el otro lado, usa la porción del hash de la URL (`window.location.hash`) para recordar cosas. Si te interesa admitir legacy browsers, deberías mantenerte con `<HashRouter>`.

Envulve el componente `<BrowserRouter>` alrededor de el componente `App`.

#### index.js

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
/* App es el punto de entrada del código de React. */
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
```

> Nota: Un componente router solo puede tener un solo elemento hijo. El elemento hijo puede ser un elemento HTML - como un div - o un componente de react.

Para que funcione el React Router, necesitas importar la API relevante de la librería `react-router-dom`. Aquí importe el `BrowserRouter` a `index.js`. También importé el componente `App` de `App.js`. `App.js` como lo habrás adivinado, es el punto de entrada a nuestros componentes de React.

El código de arriba crea una instancia de `history`para todo nuestro componente `App`. Permitanme formalmente introducirlos a `history`.


### history

> `history` es una librería de JavaScript que te permite fácilmente manejar la historia de una sesión en cualquier lugar que JavaScript corra. `history` provee una API minima que te permite manejrar la history stack, navegar, confirmar navegación, y persistir el estado entre sesiones. -React Training docs.

Cada componente de router crea un objeto `history` que mantiene un seguimiento de la ubicación actual (`history.location`) y también las ubicaciones anteriores en una pila. Cuando la ubicación actual cambia, la vista es re-renderizada y obtenes una sensación de navegación. ¿Cómo cambia la ubicación actual? El objeto `history` tiene metodos como `history.push()` y `history.replace()` para encargarse de eso. `history.push()` es invocada cuando clickeas en el componente `<Link>`, y `history.replace()` es llamado cuando usamos `<Redirect>`. Otros métodos - como `history.goBack()` y `history.goForward()`- son usados para navegar a través de la pila del historial al ir atras o adelante de una página.

Continuando, tenemos `Links` y `Routes`.

### Links y Routers

El componente `<Route>`es el componente más importante en React Router. Renderiza UI si la ubicación actual coincide con el `path` del `Route`. Idealmente, un componente `<Route>` debería tener un prop llamado `path` y si el nombre del path coincide con la ubicación actual, se renderiza.

El componente `<Link>`, por el otro lado, es usado para navegar entre páginas. Es comparable al elemento anchor de HTML. Sin embargo, usando anchor links resultaria en un refresh del browser, el cual no queremos. Por lo tanto, podemos usar `<Link>` para navegar a un URL particular y tener la vista re-renderizada sin refreshear el browser.

Ya vimos todo lo que necesitas saber para crear un router básico. Contruyamos uno.


## Demo 1: Routing Básico

### src/App.jsx

```JSX
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
```

Hemos declarado el compoente para `Home`, `Category` y `Products` dentro de `App.js`. A pesar de que esto esta bien por ahora, cuando el componente comience a crecer, es mejor tener un archivo separado por cada componente. A partir de el segundo demo, crearemos archivos separados para componentes que han crecido mucho para entrar dentro del archivo `App.js`. 

### Exact

Dentro del componente `App`, hemos escrito la lógica para rutear. El `path` de `<Route>` es comparado con la ubicación actual y un componete es renderizado. El componente que debería ser renderizado  es pasado como un segundo prop.

Aquí el path `/` coincide tanto con `/`, como con `/category` y `/products`. Por lo tanto, ambas rutas son matcheadas y renderizadas. ¿Cómo evitamos esto? Deberíamos parar el prop `exact` a la ruta con `path="/"`:

```JSX
<Route exact path="/" component={Home}/>
```

Si queres que una ruta sea renderizada solo si los paths son exactamente los mismos, deberías usar el prop `exact`. 

<iframe src="https://codesandbox.io/embed/zxn49rvkn4" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Rutas Anidadas

### ¿Cómo funciona `Route`?

Para crear rutas anidadas, necesitamos un mejor entendimiento de como funciona `<Route>`. Hagamos eso.

`<Route>` tiene tres props que podes usar para definir lo que es renderizado:

- **component**: Ya hemos visto a esta en acción. Cuando la URL coincide, el router crea un elemento de React del componente dado usando `React.createElement`.
- **render**: Esto es práctico para _inline rendering_. El prop `render`espera una función que devuelva un elemento cuando la ubicación matchea el `path` del `Route`.
- **children**: El prop `children` es similar a render, en que espera una función que retorna un elemento de React. Sin embargo, `children` se renderiza independientemente de si el path coincide con la URL o no.

### Path and match

El `path` es usado para identificar la porción del URL que el router debería coincidir. Usa la librería Path-to-RegExp para convertir un string del path a una expresión regular. Luego será comparada contra la ubicación actual.

Si el path del router y la ubicación son correctamente matcheadas, un objeto es creado, el cual vamos a llamar `match`. El objeto `match` tiene mas información sobre la URL y el path. Esta información es accesible a través de sus propiedades, listadas abajo:

- `match.url`: Un string que retorna la porción matcheada del URL. Esto es particularmente útil para construir `<Link>`s anidados.
- `match.path`: Un string que retorna el string del path de la ruta - eso es, `<Route path="">`. Vamos a usar esto para construir `<Route>`s anidadas.
- `match.isExact`: Un booleano que retorna verdadero si la ruta matcheada fue exacta (sin ningun otro caracter arrastrado).
- `match.params`: Un objeto conteniendo _key/value pairs_ del URL parseado por el paquete Path-toRegExp. 

Ahora que sabemos todo sobre `<Route>`s, construyamos nuestro router con rutas anidadas.


### Switch Component

Antes de ir al código de la demo, quiero introducirles al componente `<Switch>`. Cuando multiples `<Route>`s están siento usadas juntas, todas las rutas que matchean son renderizadas inclusivemente. Considerá este código del demo 1. Agregué una nueva ruta para demostrar porque `<Switch>` es útil.

```JSX
<Route exact path="/" component={Home} />
<Route path="/products" component={Products} />
<Route path="/category" component={Category} />
<Route 
  path="/:id" 
  render={() => (
    <p>
      Quiero que este texto aparezca para todas las rutas excepto '/', '/products' y '/category'
    </p>
  )} 
/>
```

Si la URL es `/products`, todas las rutas que coinciden con la ubicación `/products` son renderizadas. Por lo que, la `<Route>` con el path _:id_ se renderezia junto con el componente `Products`. Esto es por diseño. Sin embargo si este no es el comportamiento que estas esperando, deberías agregar el componente `<Switch>`a tus rutas. Con `<Switch>`, solo el primer hijo `<Route>` que coincida con la ubicación es renderizado. 

```JSX
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/products" component={Products} />
    <Route path="/category" component={Category} />
    <Route 
      path="/:id" 
      render={() => (
        <p>
          Quiero que este texto aparezca para todas las rutas excepto '/', '/products' y '/category'
        </p>
      )} 
    />
</Switch>
```

## Demo 2: Rutas Anidadas

### src/App.js

Antes creamos rutas para `/`, `/category` y `/products`. Que si quisieramos una URL onda `/category/shoes`?

```JSX
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';

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

/* Código de los components Home y Products omitidos para ser breves */
```

A diferencia de versiones anteriores de React Router, en la versión 4, Los `<Routes>`anidados deberían preferiblemente ir dentro del componente padre. Esto es, Esto significa que, el componente Category es el padre aquí, y vamos a declarar las rutas por `/category/:name`dentro del componente. 


### src/Category.jsx

```JSX
import React from 'react';
import { Link, Route } from 'react-router-dom';

const Category = ({ match }) => (
  <div> 
    <ul>
      <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
      <li><Link to={`${match.url}/boots`}>Boots</Link></li>
      <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>
    </ul>
    <Route
      path={`${match.path}/:name`} 
      render={({ match }) => (<div><h3>{match.params.name}</h3></div>)}
    />
  </div>
);

export default Category;
```

Primero, declaramos un par de links para las rutas anidadas. Mencionado previamente, `match.url` va a ser usado para construir  links anidados y `match.path` para rutas anidadas. Si estas teniendo dificultad entendiendo el concepto de match, `console.log(match)` provee información útil que puede ayudar a clarificarlo.

```JSX
<Route 
  path={`${match.path}/:name`}
  render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}
/>
```

Este es nuestro primer acercamiento a ruteo dinámico. En vez de hard-codear las rutas, usamos una variable dentro de pathname. `:name` es un parametro del path que atrapa todo después de `category/` hasta que se encuentre la siguiente barra inclinada. Entonces, un pathname como `category/shoes` va a crear un objeto `params` así:

```js
{
  name: 'running-shoes'
}
```

La data capturada debería ser accesible como `match.params` o `props.match.params` dependiendo de como los props son pasados. La otra cosa interesante es que usamos un prop `render`. `render` props son bastante prácticas para funciones inline que no requiren un componente por si mismo.

<iframe src="https://codesandbox.io/embed/9ll4k7o8lr" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Demo 3: Rutas con parámetros

### Trabajando con datos dinámicamente

Compliquemos las cosas un poco mas, dale? Un router real va a tener que manejar data y mostrarla dinámicamente. Asumí que tenemos la data de product retornada por el API de un servidor de esta forma:

```js
const productsData = [
{
  id: 1,
  name: 'NIKE Liteforce Blue Sneakers',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
  status: 'Available'

},
{
  id: 2,
  name: 'Stylised Flip Flops and Slippers',
  description: 'Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.',
  status: 'Out of Stock'

},
{
  id: 3,
  name: 'ADIDAS Adispree Running Shoes',
  description: 'Maecenas condimentum porttitor auctor. Maecenas viverra fringilla felis, eu pretium.',
  status: 'Available'
},
{
  id: 4,
  name: 'ADIDAS Mid Sneakers',
  description: 'Ut hendrerit venenatis lacus, vel lacinia ipsum fermentum vel. Cras.',
  status: 'Out of Stock'
},

];
```

Necesitamos crear rutas con los siguientes paths:

- `/products`: Este mostraría una lista de productos.
- `/products/:productId`: Si un producto con el `:productId` existe, debería mostrar la data del producto, y si no, debería mostrar un mensaje de error.

### src/Products.jsx
```JSX
/* Import statements fueron omitidos para ser breves  */

const Products = ({ match }) => {
   const productsData = [
    {
        id: 1,
        name: 'NIKE Liteforce Blue Sneakers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
        status: 'Available'

    },
    // El resto de los productos fueron omitidos para ser breves
];


  /* Crea un arreglo de `<li>` por cada producto */
  const linkList = productsData.map(product => (
    <li key={product.id}>
      <Link to={`${match.url}/${product.id}`}>
        {product.name}
      </Link>
    </li>
  ));

  return (
    <div>
      <div>
        <div>
          <h3> Products</h3>
          <ul> {linkList} </ul>
        </div>
      </div>

      <Route
        path={`${match.url}/:productId`}
        render={props => <Product data={productsData} {...props} />}
      />
      <Route
        exact
        path={match.url}
        render={() => (
          <div>Por favor seleccione un Producto.</div>
        )}
      />
    </div>
  );
};

export default Products;
```

Primero, creamos una lista de `<Link>`s usando los `product.id`s y lo guardamos en `linkList`. La ruta toma un parametro en el path string que corresponde al del id del producto.

```JSX
<Route path={`${match.url}/:productId`}
  render={(props) => <Product data={productsData} {...props} />} />
```

Podrías esperar `component={Product}` en cambio de la función inline render. El problema es que necesitamos pasar para abajo `productsData` al componente `Product` junto con todos los props existentes. A pesar de que hay otras formas de que puedes hacer esto, este método parece el más fácil. {...props} usa el spread syntax de ES6 para pasar todo el objeto de props al componente.

Ahora veamos el código del componente `Product`.

### src/Product.jsx

```JSX
/* Import statements fue omitido para ser breves */

const Product = ({ match, data }) => {
  const product = data.find(p => p.id == match.params.productId);
  const productData = product ? (
    <div>
      <h3> {product.name} </h3>
      <p>{product.description}</p>
      <hr />
      <h4>{product.status}</h4>
    </div>
  )
    :
    <h2>Perdón. El producto no existe </h2>;

  return (
    <div>
      <div>
        {productData}
      </div>
    </div>
  );
};

export default Product;
```

El método find es usado para buscar el arreglo por el objeto con la propiedad `id` que sea igual a `match.params.productId`. Si el producto existe, la data del producto es mostrada. Si no, un mensaje "El producto no existe" es renderizado.

<iframe src="https://codesandbox.io/embed/w2892jy665" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Demo 4: Rutas Protegidas

### Protegiendo Rutas

Para la demo final, vamos a discutir técnicas relacionadas con la protección de rutas. Entonces, si alguien intenta acceder a `/admin`, se les requeriría loggearse primero. Sin embargo, hay algunas cosas que tenemos que cubrir antes de que podamos proteger rutas.

#### Redirect

Como el `redirect` del servidor, `<Redirect>` va a remplazar la ubicación actual en la pila del historial con una nueva ubicación. La nueva ubicación es especificada por el prop `to`. Así es como estaremos usando `<Redirect>`:

```JSX
<Redirect to={{ pathname: '/login', state: { from: props.location } }}
```

Por lo que, si alguien intenta acceder a `/admin` mientras esté deslogueado, van a ser redirigidos a la ruta de `/login`. La información sobre la ubicación actual es pasada via el estado, por lo que si la autenticación es exitosa, el usuario puede ser redirigido a su ubicación original. Dentro del componente hijo, podes acceder a esta información en `this.props.location.state`.


### src/App.jsx

#### Rutas Personalizadas

Una ruta personalizada es una palabra elegante para una ruta anidada dentro de un componente. Si necesitamos hacer una decisión si una ruta debería renderizarse o no, escribir una ruta personalizada es la forma de seguir. Aquí esta la ruta personalizada declarada entre otras rutas.

```JSX
/* Agregá el componente `PrivateRoute` a las rutas existentes */
<Switch>
  <Route exact path="/" component={Home} data={data} />
  <Route path="/category" component={Category} />
  <Route path="/login" component={Login} />
  <Route path='/products' component={Products} />
  <PrivateRoute authed={fakeAuth.isAuthenticated} path="/admin" component={Admin} />
</Switch>
```

`fakeAuth.isAuthenticated` devuelve `true` si el usuario esta loggeado y `false` si no.

Aquí la definición para `PrivateRoute`:

```JSX
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
```

La ruta renderea el componente `Admin` si el usuario esta loggeado. De otra manera, el usuario es redirigido a `/login`. Lo bueno de este enfoque es que es evidentemente mas declarativo y `PrivateRoute` es reusable.

Finalmente, aquí esta el código para el componente de Login.

### src/Login.jsx

```JSX
import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      redirectToReferrer: false
    }
    this.login = this.login.bind(this);
  }

  login() {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>Tienes que estar logueado para ver la pagina {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

/* Una función de autenticación falsa */
export const fakeAuth = {

  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
};
```

La linea debajo demuestra destructuración de objeto, el cual es parte de la especificación ES6.

```js
const { from } = this.props.location.state || { from: { pathname: '/' } };
```

<iframe src="https://codesandbox.io/embed/0m59w2lxzp" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>