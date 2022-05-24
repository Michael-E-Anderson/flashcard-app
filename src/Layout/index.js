import React from "react";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../DeckList";
import CreateDeck from "../CreateDeck";
import DeckView from "../DeckView";
import { listDecks } from "../utils/api";
import Study from "../Study";
import AddCard from "../AddCard";
import EditCard from "../EditCard";
import EditDeck from "../EditDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();
    async function loadDecks() {
      const response = await listDecks(abortController.signal);
      setDecks(response);
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
          <Switch>
            <Route exact path="/">
              <DeckList decks={decks} />
            </Route>
            <Route exact path="/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId">
              <DeckView />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <Study />
            </Route>
            <Route exact path="/decks/:deckId/cards/new">
              <AddCard />
          </Route>
            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
      </div>
    </>
  );
}

export default Layout;
