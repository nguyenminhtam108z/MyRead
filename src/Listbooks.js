import React from 'react'
import Bookshelf from "./Bookshelf"
import SearchPage from "./SearchPage"

const ListBooks = ({books, shelves, onChangeShelf}) => {

    function booksOnShelf (shelf){
      return books.filter(book => book.shelf === shelf.key)
    }
      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map(shelf => (
                <Bookshelf key={shelf.key} shelf={shelf} books={booksOnShelf(shelf)} onChangeShelf={onChangeShelf} />
              ))}
            </div>
          </div>
          <SearchPage />
        </div>
      ) 
}

export default ListBooks
