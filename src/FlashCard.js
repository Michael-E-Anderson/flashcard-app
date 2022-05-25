import React from "react"
import { useState, useEffect } from "react"
import { readCard } from "./utils/api"

// Function to render the layout for each card in the Study component
function FlashCard( {deck, cardNumber, flipped, flip, next}) {
    const [card, setCard] = useState([]);
      

    useEffect(() => {
        const abortController = new AbortController();
        async function loadCard() {
          try {
            const response = await readCard(cardNumber, abortController.signal);
            setCard(response);
          } catch (error) {
            throw error;
          }
        }
        if (cardNumber !== null) {
            loadCard()
        }
        return () => abortController.abort()
    }, [cardNumber]);
    
    
    
    if (!flipped) {
        return (
            <>
                <div className="border border-secondary">
                    <div className="p-3">
                        <div>
                            <h4>Card {cardNumber} of {deck.cards.length}</h4>
                            <p>{card.front}</p>
                        </div>
                        <div>
                            <button type="button" className="btn btn-secondary" onClick={flip}>Flip</button>
                        </div>
                    </div>
                </div>       
            </>
        )
    } else {
        return (
            <>
                <div className="border border-secondary">
                    <div className="p-3">
                        <div>
                            <h4>Card {card.id} of {deck.cards.length}</h4>
                        </div>
                        <div>
                            <p>{card.back}</p>
                        </div>
                        <div>
                            <button type="button" className="mr-2 btn btn-secondary" onClick={flip}>Flip</button>
                            <button type="button" className="btn btn-primary" onClick={next}>Next</button>       
                        </div>
                    </div>
                </div>        
            </>
        )
    }
};

export default FlashCard