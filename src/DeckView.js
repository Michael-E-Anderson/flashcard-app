import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DeckProfile from "./DeckProfile";
import { deleteDeck, readDeck } from "./utils/api";
import DeckViewCardList from "./DeckViewCardList";

// Component that shows the deck description and list of cards.
function DeckView() {
  const [deck, setDeck] = useState({});
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
  }

  const handleDeleteDeck = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deck.id);
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-1 mb-1 bi bi-house-fill"
                viewBox="0 0 16 16"
              >
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
              </svg>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <DeckProfile deck={deck} handleDelete={handleDeleteDeck} />
      </div>
      <div>
        <h3>Cards</h3>
      </div>
      <div>
        <DeckViewCardList deck={deck} cards={deck.cards} />
      </div>
    </>
  );
};

export default DeckView