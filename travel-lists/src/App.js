import { useState } from "react";

export default function App(){
  const [items, setItems] = useState([]);

  function handleAddItem(newItem){
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id){
    setItems((items) => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  function handleClearItems(){
    const confirmed = window.confirm('Are you sure you want to clear all items??')
    setItems([]);
  }

  return(
    <div className="app"> 
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackagingLists onDeleteItem={handleDeleteItem} items={items} onUpdateItem={handleUpdateItem} onClearItems={handleClearItems}/>
      <Stats items={items} />
    </div>
  )
}

function Logo(){
  return(
    <h1>Faraway Island </h1>
  )
}

function Form({onAddItem}){
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();

    if (!description) return;

    const newItem = {id: Date.now() , description, quantity, packed: false};
    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }

  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={e => setQuantity(e.target.value)}>
        {Array.from({length: 20}, (_,i) => i+1).map(x => <option key={x}>{x}</option>)}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}

function PackagingLists({items, onDeleteItem, onUpdateItem, onClearItems}){
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if(sortBy === 'input') sortedItems = items;
  if(sortBy === 'description') sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  if(sortBy === 'packed') sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return(
    <div className="list">
      <ul>
        {sortedItems.map((item) => <Item onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} key={item.id} item={item}/>)}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e=> setSortBy(e.target.value)}>
          <option value='input'>Sort by input</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  )
}

function Item({item, onDeleteItem, onUpdateItem}){
  return(  
      <li>
        <input type="checkbox" value={item.packed} onChange={() => onUpdateItem(item.id)}/>
        <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
        <button className="delete-button" onClick={() => onDeleteItem(item.id)}>X</button>
      </li>
  )
}

function Stats({items}){
  if(!items.length) return (
    <footer className="stats">
      <em>Please start by adding some items</em>
    </footer>
  );

  const numItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const percentage = Math.round((packedItems/numItems) * 100);

  return(
    <footer className="stats">
      <em>{(percentage === 100) ? "You have everything packed and Ready to go!!!" : `You have ${numItems} items in your list, you already packed ${packedItems} (${percentage}%)`}</em>
    </footer>
  )
}
