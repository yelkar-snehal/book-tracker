'use client';

import React, { useState } from 'react';

interface AddBookProps {
  onAddBook: (book: Book) => void;
}

interface Book {
  _id?: string;
  title: string;
  author: string;
  language: string;
}

const AddBook: React.FC<AddBookProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook: Book = {
      title,
      author,
      language,
    };

    // Optimistically add the book to the UI
    // onAddBook(newBook);

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const savedBook = await response.json();
      onAddBook(savedBook); // Update with the real _id from the database
      setTitle('');
      setAuthor('');
      setLanguage('');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('An error occurred while adding the book.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium">
          Language
        </label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
