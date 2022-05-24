import React from "react";
import { readDeck, deleteDeck } from "./utils/api";
import { useHistory } from "react-router-dom";

// The function that renders the design for each deck in the DeckList component
function DeckHomeView ( {deck} ) {
    const history = useHistory();
    
    const viewDeck = async (event) => {
        event.preventDefault();
        await readDeck(deck.id)
        history.push(`/decks/${deck.id}`)
      };
      const studyDeck = (event) => {
        event.preventDefault();
        history.push(`/decks/${deck.id}/study`);
      };
      const delDeck = async (event) => {
        event.preventDefault()
        if (window.confirm("Are you sure you would like to delete this deck?")) {
          await deleteDeck(deck.id)
        }    
      };

      if (!deck.cards){
          return null
      }

    return (
        <>
        <div className="border border-secondary pb-2 pr-3 pl-3">
            <div className="d-flex justify-content-between">
                <h3 className="mr-auto">{deck.name}</h3> 
                <p className="text-secondary">{deck.cards.length} cards</p>
            </div>
            <div>
                <p>{deck.description}</p>
            </div>
            <div className="d-flex">
                <button type="button" className="p-2 mr-2 btn btn-secondary" onClick={viewDeck}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 mb-1 bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    View
                </button>
                <button className="p-2 btn btn-primary .text-white" type="button" onClick={studyDeck}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 mb-1 bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                        <path d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>
                    Study
                </button>
                <button className="ml-auto pr-2.5 pl-2.5 btn bi bi-trash btn btn-danger" type="delete" onClick={delDeck}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mb-1 bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div className="pb-2"></div>       
        </>       
    );
};

export default DeckHomeView