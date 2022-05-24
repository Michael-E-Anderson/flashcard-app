import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "./utils/api/index";
import FlashCard from "./FlashCard";

// Component to study flashcards
function Study() {
  const [cardNumber, setCardNumber] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(deck).length === 0) return null;
  if (!deck) return null;
  if (!cardNumber) return null;

  function flip() {
    setFlipped(!flipped);
  };

  function next() {
    if (cardNumber === deck.cards.length) {
      if (
        window.confirm(
          `Restart cards?\n\nClick 'cancel' to return to the home page.`
        )
      ) {
        setCardNumber(1);
      } else {
        history.push("/");
      }
    } else {
      setCardNumber(cardNumber + 1);
    }
    setFlipped(false);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mr-1 mb-1 bi bi-house-fill" viewBox="0 0 16 16">
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
              </svg>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {deck.cards.length > 2 ? (
        <FlashCard
          key={cardNumber}
          deck={deck}
          cardNumber={cardNumber}
          flipped={flipped}
          flip={flip}
          next={next}
        />
      ) : (
        <div id="card-error">
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}
            cards in this deck.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>+ Add Cards</button>
        </div>
      )}
    </div>
  );
};

export default Study