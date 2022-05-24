import React from "react";
import { useHistory } from "react-router-dom";


// Form for the AddCard and EditCard components
function CardForm( {deck, handleChange, handleSubmit, formData} ) {
    const history = useHistory();
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="front">
                    Front
                    <div>
                        <textarea
                        id="front"
                        name="front"
                        rows="4"
                        cols="50"
                        placeholder="Front side of card"
                        onChange={handleChange}
                        value={formData.front}
                        />
                    </div>
                </label>
            </div>
            <div>
                <label htmlFor="back">
                    Back
                    <div>
                        <textarea
                        id="back"
                        name="back"
                        rows="4"
                        cols="50"
                        placeholder="Back side of card"
                        onChange={handleChange}
                        value={formData.back}
                        />
                    </div>
                </label>
            </div>
            <button type="button" className="mr-2 btn btn-secondary" onClick={() => history.push(`/decks/${deck.id}`)}>Done</button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </form>
        </>
    );
};

export default CardForm