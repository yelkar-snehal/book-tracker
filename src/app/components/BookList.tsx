'use client'; // This directive tells Next.js that this is a Client Component

import React, { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  language: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  return (
    <ul className="list-disc pl-5">
      {books.map((book) => (
        <li key={book.id} className="mb-3">
          <strong>{book.title}</strong> by {book.author} - Language: {book.language}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
