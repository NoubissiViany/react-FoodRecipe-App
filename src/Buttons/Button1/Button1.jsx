import React, { useContext, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import formContext from '../../Context/formContext';
import 'react-responsive-modal/styles.css';
import './Button1.css';

function Button1() {
  const { items, setItems } = useContext(formContext);
  const [favorite] = useState('no');
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());
    const itemValues = { ...values, id, favorite };
    setItems([...items, itemValues]);
    setOpen(false);
  };
  return (
    <div>
      <button onClick={onOpenModal} className="Btn" type="button">
        Add New Recipe +
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modalHeader">
          <h5 className="heading">Add a new recipe!</h5>
        </div>
        <form onSubmit={handelSubmit}>
          <div className="modalContent">
            <div className="modalContentContainer">
              <label className="modalContentLabel" htmlFor="RecipeName">
                Recipe Name:
                <input
                  name="RecipeName"
                  className="modalContentsInput"
                  placeholder="Please enter food name"
                  type="text"
                  id="RecipeName"
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
                  placeholder="Please enter food image URL"
                  type="text"
                  id="FoodImage"
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
                  required
                  placeholder="Enter food description"
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
                  placeholder="Enter food ingredients"
                />
              </label>
            </div>
          </div>
          <div className="actionsContainers">
            <button type="submit" className="saveBtn">
              Add
            </button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Button1;
