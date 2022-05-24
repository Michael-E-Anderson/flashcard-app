import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "./utils/api";

// Form for the CreateDeck component
function CreateDeckForm() {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState({...initialFormState});

    const handleChange = ({ target }) => {
        setFormData((currentFormData) => ({
          ...currentFormData,
          [target.name]: target.value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createDeck(formData);
        setFormData(initialFormState);
        history.push(`/decks/${response.id}`);
      };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <div>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Deck Name"
                />
              </div>
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <div>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="100"
                onChange={handleChange}
                value={formData.description}
                placeholder="Brief description of the deck"
                />
            </div>
          </label>
        </div>
          <button type="button" className="btn btn-secondary mr-2"onClick={() => history.push('/')}>Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
};

export default CreateDeckForm