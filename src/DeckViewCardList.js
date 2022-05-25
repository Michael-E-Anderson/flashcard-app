import React from "react";
import DeckViewCardListCardView from "./DeckViewCardListCardView";

// Function that lists all cards in the deck for the DeckView component
function DeckViewCardList( {deck, cards} ) {
    if (!cards) {
        cards = []
    }
    return (
      <>
        <div>
            {cards.map((card, index) => 
                <DeckViewCardListCardView
                    card={card}
                    deck={deck}
                    key={index}
                />
            )}
        </div>
      </>
    );
};

export default DeckViewCardList