import React from "react";
import { useGetBorrowSummaryQuery } from "../../features/books/booksApi";

const BorrowSummary: React.FC = () => {
  const [ page, setPage ] = React.useState<number>(1);
  const { data, isLoading, error } = useGetBorrowSummaryQuery(page);

  const borrowItems = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  if (isLoading) return <div>Loading summary...</div>;
  if (error) return <div>Failed to load summary.</div>;
  if (!borrowItems) return null;

  return (
    <div>
      <div className="w-full text-center mt-6 font-bold text-4xl 
        text-slate-800 mb-3">Borrow Summary</div>
      
      <div className="overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Book Title</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">ISBN</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {borrowItems.map((borrowItem, idx) => (
              <tr className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}`}>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">{borrowItem.book.title}</td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">{borrowItem.book.isbn}</td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">{borrowItem.totalQuantity}</td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
      {/* Pagination buttons */}
      <div className="mt-[1rem] flex justify-center items-center">
        <button 
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          onClick={handlePrevious} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="my-0 mx-[1rem]">
          Page {page} of {totalPages}
        </span>
        <button 
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          onClick={handleNext} disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default BorrowSummary