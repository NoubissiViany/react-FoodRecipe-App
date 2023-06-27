/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
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
  const [searchRecipe, setSearchRecipe] = useState('');
  const [favorite, setFavorite] = useState('no');
  const [itemId, setItemId] = useState('');
  const [editRec, setEditRec] = useState('');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const onCloseModal1 = () => setOpen1(false);
  const onCloseModal2 = () => setOpen2(false);
  const [val, setVal] = useState('');

  const searchBar = () => {
    setSearchRecipe(val);
  };

  const FavoriteRecipe = (id) => {
    const findOdj = items.find((obj) => {
      return obj.id === id;
    });

    if (findOdj.favorite === 'yes') {
      findOdj.favorite = 'no';
    } else {
      findOdj.favorite = 'yes';
    }

    setFavorite(findOdj.favorite);

    const filtered = items.filter((value) => {
      return value.id !== id;
    });

    const update = [...filtered, findOdj];

    localStorage.setItem('items', JSON.stringify(update));
  };

  const editRecipe = (id) => {
    setOpen1(true);
    const findRecipe = items.find((obj) => {
      return obj.id === id;
    });

    setEditRec(findRecipe);
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const filtered = items.filter((value) => {
      return value.id !== editRec.id;
    });

    const id = Date.now();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());
    const itemValues = { ...values, id, favorite, filtered };
    const update = [...filtered, itemValues];

    localStorage.setItem('items', JSON.stringify(update));
    window.location.reload(true);
    setOpen1(false);
  };

  console.log(editRec);

  const DeleteRecipe = (id) => {
    const deleteRecipe = items.filter((del) => {
      return del.id !== id;
    });

    localStorage.setItem('items', JSON.stringify(deleteRecipe));

    window.location.reload(true);
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    setSearchRecipe('');
    setFavorite('');
  }, [items, val, favorite]);

  return (
    <formContext.Provider value={{ items, setItems }}>
      <div className="body">
        <header className="Header">
          <div className="Header-h1">
            <h1>Food Recipe App</h1>
            <div>
              <input
                type="text"
                className="headerInput"
                placeholder="Search Recipe"
                onChange={(e) => setVal(e.target.value)}
              />
              <button type="button" onClick={searchBar}>
                Search
              </button>
            </div>
          </div>
          <Button1 />
        </header>
        <div className="bodyContainer">
          <div className="bodyContent-container">
            {searchRecipe === ''
              ? [...items].map((item) => (
                  <div className="bodyContent" key={item.id}>
                    <div className="container">
                      <img src={item.FoodImage} alt="Food_Image" />
                      <div className="overlay">
                        <div className="recipeDetailContainer">
                          <div className="recipeDetail">
                            <p>Description : </p>
                            <span>{item.Description}</span>
                          </div>
                          <div className="recipeDetail">
                            <p>Ingredient : </p>
                            <span>{item.Ingredients}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bodyContent-description">
                      <p>{item.RecipeName}</p>
                      <div className="bodyContent-icons">
                        <i
                          onClick={() => FavoriteRecipe(item.id)}
                          className={
                            item.favorite === 'yes'
                              ? 'red-icon fa-solid fa-heart'
                              : 'black-icon fa-regular fa-heart'
                          }
                        />
                        <i
                          onClick={() => editRecipe(item.id)}
                          className="edit-icon fa-solid fa-pen-to-square"
                        />
                        <i
                          onClick={() => {
                            setOpen2(true);
                            setItemId(item.id);
                          }}
                          className="delete-icon fa-solid fa-trash-can"
                        />
                      </div>
                    </div>
                  </div>
                ))
              : items
                  .filter(
                    (search) =>
                      search.RecipeName.toLowerCase() ===
                      searchRecipe.toLowerCase()
                  )
                  .map((item) => (
                    <div className="bodyContent" key={item.id}>
                      <div className="container">
                        <img src={item.FoodImage} alt="Food_Image" />
                        <div className="overlay">
                          <div className="recipeDetailContainer">
                            <div className="recipeDetail">
                              <p>Description : </p>
                              <span>{item.Description}</span>
                            </div>
                            <div className="recipeDetail">
                              <p>Ingredient : </p>
                              <span>{item.Ingredients}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bodyContent-description">
                        <p>{item.RecipeName}</p>
                        <div className="bodyContent-icons">
                          <i
                            onClick={() => FavoriteRecipe(item.id)}
                            className={
                              item.favorite === 'yes'
                                ? 'red-icon fa-solid fa-heart'
                                : 'black-icon fa-regular fa-heart'
                            }
                          />
                          <i
                            onClick={() => editRecipe(item.id)}
                            className="edit-icon fa-solid fa-pen-to-square"
                          />
                          <i
                            onClick={() => {
                              setOpen2(true);
                              setItemId(item.id);
                            }}
                            className="delete-icon fa-solid fa-trash-can"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

            {/* Edit Recipe Modal */}
            <Modal open={open1} onClose={onCloseModal1} center>
              <div className="modalHeader">
                <h5 className="heading">Eddit recipe!</h5>
              </div>
              <form onSubmit={handelSubmit}>
                <div className="modalContent">
                  <div className="modalContentContainer">
                    <label className="modalContentLabel" htmlFor="RecipeName">
                      Recipe Name:
                      <input
                        name="RecipeName"
                        className="modalContentsInput"
                        placeholder="Please enter recipe name"
                        type="text"
                        id="RecipeName"
                        defaultValue={editRec.RecipeName}
                        required
                      />
                    </label>
                  </div>
                  <div className="modalContentContainer">
                    <label className="modalContentLabel" htmlFor="FoodImage">
                      Food Image URL:
                      <input
                        name="FoodImage"
                        className="modalContentsInput"
                        placeholder="Please enter recipe image URL"
                        type="text"
                        id="FoodImage"
                        defaultValue={editRec.FoodImage}
                        required
                      />
                    </label>
                  </div>
                  <div className="modalContentContainer">
                    <label className="modalContentLabel" htmlFor="Description">
                      Description:
                      <textarea
                        className="modalContentTextarea"
                        name="Description"
                        id="Description"
                        cols="30"
                        rows="3"
                        defaultValue={editRec.Description}
                        required
                        placeholder="Enter recipe description"
                      />
                    </label>
                  </div>
                  <div className="modalContentContainer">
                    <label className="modalContentLabel" htmlFor="Ingredients">
                      Ingredients:
                      <textarea
                        name="Ingredients"
                        id="Ingredients"
                        cols="30"
                        rows="3"
                        required
                        defaultValue={editRec.Ingredients}
                        placeholder="Enter recipe ingredients"
                      />
                    </label>
                  </div>
                </div>
                <div className="actionsContainers">
                  <button type="submit" className="saveBtn">
                    Update
                  </button>
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={() => setOpen1(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>

            {/* Delete Recipe Modal */}
            <Modal open={open2} onClose={onCloseModal2} center>
              <p className="deleteAlert">
                Do you really want to delete this recipe! <br />
                <span>This process cannot be undone.</span>
              </p>
              <div className="actionsContainers">
                <button
                  type="submit"
                  onClick={() => DeleteRecipe(itemId)}
                  className="saveBtn"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setOpen2(false)}
                >
                  No
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </formContext.Provider>
  );
}

export default Home;
