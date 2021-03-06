import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { readDeck, createCard } from "./utils/api";
import CardForm from "./CardForm";

// Component to add a card to a deck
function AddCard() {
  const mountedRef = useRef(false);
  const {deckId} = useParams();
  const [deck, setDeck] = useState([]);
  
  
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
        const response = await readDeck(deckId, abortController.signal)
        if (mountedRef){
          setDeck(response)
        }        
      } catch (error) {
        throw error
      }      
    }
    loadDeck()
    return () => abortController.abort()
  }, [deckId]);

  const initialFormState = {
    front:"",
    back:""
  };

  const [formData, setFormData] = useState([]);

  const handleChange = ({ target }) => {
    setFormData((currentFormData) => ({
        ...currentFormData,
        [target.name]: target.value
    }));
  };

const handleSubmit = async (event) => {
    event.preventDefault()
    await createCard(deck.id, formData)
    setFormData(initialFormState)
};

    return (
        <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to={'/'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 mb-1 bi bi-house-fill" viewBox="0 0 16 16">
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
              </svg>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>
                  {deck.name}
              </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Add Card
          </li>
        </ol>
      </nav>
      <div>
          <h3>{deck.name}: Add Card</h3>
      </div>
      <div>
          <CardForm 
            deck={deck} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            formData={formData}
            />
      </div>  
        </>
    );
};

export default AddCard