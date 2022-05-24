import React from "react";
import { useHistory } from "react-router-dom";
import DeckHomeView from "./DeckHomeView";

// Component that lists all decks on the home page.
function DeckList( {decks} ) {
    const history = useHistory();

    return(
        <>
        <div>
            <button type="button" className="btn btn-secondary mb-2" onClick={() => history.push('/decks/new')}>+ Create Deck</button>
            <div>{decks.map((deck, index) => 
                <DeckHomeView
                deck={deck}
                key={index}
                />
            )}
            </div>
        </div>
        </>
    );
};

export default DeckList