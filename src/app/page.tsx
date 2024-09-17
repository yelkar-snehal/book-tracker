import BookList from '@/app/components/BookList';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">Book Tracker</h1>
        <BookList />
      </div>
    </div>
  );
}
