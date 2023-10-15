import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./Listbooks";
import SearchBooks from "./SearchBooks";

function BooksApp() {
  const [books, setBooks] = useState([]);
  const shelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' },
  ];

  const ChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((updatedBooks) => {
      setBooks((prevBooks) => {
        const updated = [...prevBooks];
        const existingBook = updated.find((b) => b.id === book.id);
        if (existingBook) {
          existingBook.shelf = shelf;
        } else if (shelf !== 'none') {
          book.shelf = shelf;
          updated.push(book);
        } else {
          updated = updated.filter((b) => b.id !== book.id);
        }
        return updated;
      });
    });
  };

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  return (
    <div className="app">
      <Router>
        <Route path="/search">
          <SearchBooks books={books} onChangeShelf={ChangeShelf} />
        </Route>
        <Route exact path="/">
          <ListBooks books={books} shelves={shelves} onChangeShelf={ChangeShelf} />
        </Route>
      </Router>
    </div>
  );
}

export default BooksApp;