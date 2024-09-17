'use client';

import React from 'react';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  language: string;
}

interface BookListProps {
    books: Book[]
    onDeleteBook: (id: string) => void;
  }

const BookList: React.FC<BookListProps> = ({books, onDeleteBook}) => {
  
  return (
    <>
      <ul className="list-disc pl-5">
        {books.map((book) => (
          <li key={book._id || book.title} className="mb-3">
            <strong>{book.title}</strong> by {book.author} - Language: {book.language}
            {book._id && (
              <button
                onClick={() => onDeleteBook(book._id!)}
                className="ml-3 px-2 py-1 bg-red-600 text-white rounded-md shadow-sm"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default BookList;
