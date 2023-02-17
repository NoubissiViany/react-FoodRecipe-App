import React, { useState } from 'react';
import Modal from '../../Modals/Modal1';
import './Button1.css';

function Button1() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="Btn" type="button">
        Add New Recipe +
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Button1;
