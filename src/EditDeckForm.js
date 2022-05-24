import React from 'react';
import { useHistory, Link } from 'react-router-dom';

// Form component for Editing Deck
function EditCardForm({ deckId, newDeckData, changeHandler, submitHandler }) {
  const history = useHistory();
  
  return (
    <form onSubmit={submitHandler}>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
            id="name"
            type="text"
            name="name"
            onChange={changeHandler}
            value={newDeckData.name}
            placeholder="Deck Name"
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          className='form-control'
          id='description'
          name='description'
          rows='5'
          onChange={changeHandler}
          value={newDeckData.description}
        ></textarea>
      </div>
      <Link to={`/decks/${deckId}`} className='mr-2'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </button>
      </Link>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};


export default EditCardForm