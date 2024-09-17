import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('book-tracker-db');

  if (req.method === 'GET') {
    try {
      const books = await db.collection('books').find({}).toArray();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching books' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, author, language } = req.body;
      if (!title || !author || !language) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      const newBook = {
        title,
        author,
        language,
      };

      await db.collection('books').insertOne(newBook);
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding book' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: 'Missing book ID' });
      }
  
      const result = await db.collection('books').deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Book deleted' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting book' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
