/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import formContext from '../Context/formContext';
import './Modal1.css';

function Modal1({ setIsOpen }) {
  const { items, setItems } = useContext(formContext);

  const handelSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());

    setItems([...items, values]);
    setIsOpen(false);
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(true)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Add a new recipe!</h5>
          </div>
          <form onSubmit={handelSubmit}>
            <div className="modalContent">
              <button
                type="button"
                className="closeBtn"
                onClick={() => setIsOpen(false)}
              >
                <RiCloseLine style={{ marginBottom: '-3px' }} />
              </button>
              <div className="modalContentContainer">
                <label className="modalContentLabel" htmlFor="">
                  Recipe Name:
                </label>
                <input
                  name="RecipeName"
                  className="modalContentsInput"
                  placeholder="Please enter food name"
                  type="text"
                  required
                />
              </div>
              <div className="modalContentContainer">
                <label className="modalContentLabel" htmlFor="">
                  Food Image URL:
                </label>
                <input
                  name="FoodImage"
                  className="modalContentsInput"
                  placeholder="Please enter food image URL"
                  type="text"
                  required
                />
              </div>
              <div className="modalContentContainer">
                <label className="modalContentLabel" htmlFor="">
                  Description:
                </label>
                <textarea
                  className="modalContentTextarea"
                  name="Description"
                  id=""
                  cols="40"
                  rows="3"
                  required
                  placeholder="Enter food description"
                />
              </div>
              <div className="modalContentContainer">
                <label className="modalContentLabel" htmlFor="">
                  Ingredients:
                </label>
                <textarea
                  name="Ingredients"
                  id=""
                  cols="30"
                  rows="3"
                  required
                  placeholder="Enter food ingredients"
                />
              </div>
            </div>
            <div className="actionsContainers">
              <button type="submit" className="saveBtn">
                Add
              </button>
              <button
                type="button"
                className="cancelBtn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal1;
