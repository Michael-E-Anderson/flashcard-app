import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from './utils/api';
import EditDeckForm from './EditDeckForm';

// Component for editing decks
function EditDeck() {   
  const mountedRef = useRef(false);
  const { deckId } = useParams();
  const history = useHistory();
  const initialDeckState = { id: '', name: '', description: ''};
  const [deck, setDeck] = useState({
    name: 'loading...',
    description: '',
  });


  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        if (mountedRef.current) {
          setDeck(() => loadedDeck);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    };

    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  
  const changeHandler = ({ target }) => {
    setDeck((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    setDeck(initialDeckState);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 mb-1 bi bi-house-fill" viewBox="0 0 16 16">
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg>
              Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Deck: {deck.name}
          </li>
        </ol>
      </nav>
      <h1 className='text-center'>Edit Deck</h1>
      <EditDeckForm
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        newDeckData={deck}
        deckId={deckId}
      />
    </div>
  );
};


export default EditDeck