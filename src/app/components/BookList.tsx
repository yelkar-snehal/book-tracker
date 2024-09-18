'use client';

import React, { useState } from 'react';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  language: string;
}

interface BookListProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
  onUpdateBook: (updatedBook: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDeleteBook, onUpdateBook }) => {
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editableBook, setEditableBook] = useState<Book | null>(null);

  const handleEditClick = (book: Book) => {
    setEditBookId(book._id!);
    setEditableBook({ ...book });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableBook((prevBook) => ({ ...prevBook, [name]: value } as Book));
  };

  const handleSaveClick = () => {
    if (editableBook && editableBook._id) {
      onUpdateBook(editableBook);
      setEditBookId(null);
    }
  };

  return (
    <ul className="list-disc pl-5">
      {books.map((book) => (
        <li key={book._id || book.title} className="mb-3">
          {editBookId === book._id ? (
            <div>
              <input
                type="text"
                name="title"
                value={editableBook?.title || ''}
                onChange={handleEditChange}
                className="mr-2 text-black"
              />
              <input
                type="text"
                name="author"
                value={editableBook?.author || ''}
                onChange={handleEditChange}
                className="mr-2 text-black"
              />
              <input
                type="text"
                name="language"
                value={editableBook?.language || ''}
                onChange={handleEditChange}
                className="mr-2 text-black"
              />
              <button onClick={handleSaveClick} className="px-2 py-1 bg-green-600 text-white rounded-md shadow-sm">
                Save
              </button>
            </div>
          ) : (
            <>
              <strong>{book.title}</strong> by {book.author} - Language: {book.language}
              {book._id && (
                <>
                  <button
                    onClick={() => handleEditClick(book)}
                    className="ml-3 px-2 py-1 bg-blue-600 text-white rounded-md shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteBook(book._id!)}
                    className="ml-3 px-2 py-1 bg-red-600 text-white rounded-md shadow-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
