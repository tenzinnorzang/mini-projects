import './App.css'

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: true,
  },
];

function App(){
  return(
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header(){
  return(
    <header className="header">
      <h1>Norzang Pizza Co.</h1>
    </header>
  );
}

function Menu(){
  const pizzaLength = pizzaData.length;

  return(
    <main className='menu'>
      <h2>Our menu</h2>
      {pizzaLength > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className='pizzas'>
            {pizzaData.map((pizza) => <Pizza pizzaObj={pizza} />)}
          </ul>
        </> 
      ) : (<p>We are still Working on Our Menu</p>)
    }
     
    </main>
  )
}

function Pizza({pizzaObj}){
  return(
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>
          {pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}<button className='btn'>Order</button>
        </span>  
      </div>
    </li>
  );
}

function Footer(){
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;

  const isOpen = hour >=12 && hour <=22;

  return(
    <footer className='footer'>
      <p>
        {isOpen ? (<Order openHour={openHour} closeHour={closeHour} />) 
          : 
        <p>Sorry We're currently closed, We are Open from {openHour} to {closeHour}</p>}  
      </p>
    </footer>
  );
}

function Order({openHour, closeHour}){
  return(
    <div className='order'>
      <p>We are currently Open from {openHour} to {closeHour} </p>
      <button className='btn'>Order</button>
    </div>
  );
}

export default App;