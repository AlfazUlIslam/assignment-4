import React from "react";
import { useGetBooksQuery } from "../../features/books/booksApi";
import EditBookModal from "./EditBookModal/EditBookModal";
import DeleteBookModal from "./DeleteBookModal/DeleteBookModal";
import BorrowBookModal from "./BorrowBookModal/BorrowBookModal";
import ViewBookModal from "./ViewBookModal/ViewBookModal";
import { FaEdit, FaTrash, FaEye, FaBookOpen } from "react-icons/fa";
import Spinner from "../../components/Spinner/Spinner";

const AllBooks: React.FC = () => {
  const [editBookId, setEditBookId] = React.useState<string | null>(null);
  const [deleteBookId, setDeleteBookId] = React.useState<string | null>(null);
  const [borrowBookId, setBorrowBookId] = React.useState<string | null>(null);
  const [viewBookId, setViewBookId] = React.useState<string | null>(null);
  const [ page, setPage ] = React.useState<number>(1);
  const { isLoading, error, data } = useGetBooksQuery(page);

  // Destructure safely after null check
  const totalPages = data?.totalPages ?? 1;
  const books = data?.data ?? [];

  const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  if (isLoading) return <Spinner />;
  if (error) return <div>Failed to load summary.</div>;
  if (!books) return null;

  return (
    <div>
      <h2 className="w-full text-center mt-6 font-bold text-4xl 
      text-slate-800 mb-3">
        All Books
      </h2>
        <div className="overflow-auto">
          <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Title</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Author</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Genre</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">ISBN</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Copies</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Availability</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map((book, idx) => (
              <tr 
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
                key={book._id}
              >
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">{book.title}</td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">{book.author}</td>
                <td className="whitespace-nowrap w-20 p-3 text-sm text-gray-700">{book.genre}</td>
                <td className="whitespace-nowrap w-20 p-3 text-sm text-gray-700">{book.isbn}</td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">{book.copies}</td>
                <td className="whitespace-nowrap w-30 p-3 text-sm text-gray-700">
                  <span className={`p-1.5 text-xs font-medium uppercase 
                  tracking-wider ${book.available ? "text-green-800" 
                  : "text-red-800"} ${book.available ? "bg-green-200" 
                  : "bg-red-200"} rounded-lg bg-opacity-50`}>
                    {book.available ? "In stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700 space-x-2">
                  <button 
                    title="Edit Book"
                    onClick={() => setEditBookId(book._id)}>
                    <FaEdit />
                  </button>
                  <button title="Delete Book" onClick={() => setDeleteBookId(book._id)}>
                    <FaTrash />
                  </button>
                  <button title="Borrow Book" onClick={() => setBorrowBookId(book._id)}>
                    <FaBookOpen />
                  </button>
                  <button title="View Book" onClick={() => setViewBookId(book._id)}>
                    <FaEye />
                  </button>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
        <div className="mt-[1rem] flex justify-center items-center">
          <button
            className={`px-4 py-2 rounded-lg bg-blue-600 text-white 
            ${page === 1 ? "opacity-50" : "opacity-100"}`}
            onClick={handlePrevious} 
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="my-0 mx-[1rem]">
            Page {page} of {totalPages}
          </span>
          <button 
            className={`px-4 py-2 rounded-lg bg-blue-600 text-white 
            ${page === totalPages ? "opacity-50" : "opacity-100"}`}
            onClick={handleNext} 
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
        {/* Edit book modal */}
        {editBookId && (
          <EditBookModal bookId={editBookId} onClose={() => setEditBookId(null)} />
        )}
        {/* Delete book modal */}
        {deleteBookId && (
          <DeleteBookModal bookId={deleteBookId} onClose={() => setDeleteBookId(null)} />
        )}
        {/* Borrow book modal */}
        {borrowBookId && (
          <BorrowBookModal bookId={borrowBookId} onClose={() => setBorrowBookId(null)} />
        )}
        {/* View book modal */}
        {viewBookId && (
          <ViewBookModal bookId={viewBookId} onClose={() => setViewBookId(null)} />
        )}
    </div>
  )
}
export default AllBooks;