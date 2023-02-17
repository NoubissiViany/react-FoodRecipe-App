/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import Button1 from '../Buttons/Button1/Button1';
import formContext from '../Context/formContext';
import './Home.css';

const formData = () => {
  const getData = localStorage.getItem('items');
  if (getData) {
    return JSON.parse(getData);
  }
  return [];
};

function Home() {
  const [items, setItems] = useState(formData);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  console.log(items);

  return (
    <formContext.Provider value={{ items, setItems }}>
      <div className="body">
        <header className="Header">
          <div className="Header-h1">
            <h1>Food Recipe App</h1>
            <input type="text" placeholder="Search Recipe" />
            <button type="button">Search</button>
          </div>
          <Button1 />
        </header>
        <div className="bodyContainer">
          <div className="bodyContent-container">
            {[...items].map((item, i) => (
              <div className="bodyContent" key={i}>
                <img src={item.FoodImage} alt="Food" />
                <p>{item.RecipeName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </formContext.Provider>
  );
}

export default Home;
