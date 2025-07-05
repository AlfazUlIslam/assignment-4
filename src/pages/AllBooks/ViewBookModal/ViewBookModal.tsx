import React from "react";
import { useGetBookQuery } from "../../../features/books/booksApi";
import type { IBook } from "../../../features/books/bookTypes";
import "./ViewBookModal.css"

interface IProps {
    bookId: string;
    onClose: () => void;
};

const ViewBookModal: React.FC<IProps> = (props) => {
    const { bookId, onClose } = props;
    const { data, isLoading, error } = useGetBookQuery(bookId);
    
    const book: IBook | undefined | null = data?.data;

    if (isLoading) return <div>Loading book...</div>;
    if (error) return <div>Failed to load book.</div>;
    if (!book) return null;

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="w-[300px] bg-white p-6 rounded-xl shadow-lg flex flex-col 
            justify-center items-center gap-3 mx-auto mt-6 sm:w-96">
                <h2 className="w-full text-center mb-3 font-bold text-4xl 
                text-slate-800">
                    {book.title}
                </h2>
                <h4 className="w-full text-center mb-3 font-bold text-2xl 
                text-slate-800">
                    by {book.author}
                </h4>
                <div className="w-full text-center mb-3 font-semibold text-md 
                text-slate-800">
                    <div>Genre:{book.genre}</div>
                    <div>ISBN:{book.isbn}</div>
                    <div>Copies:{book.copies}</div>
                    <div>Availability:{book.available ? "In stock" : "Out of stock"}</div>
                </div>
                <hr className="w-full h-[1px] bg-black" />
                <p  className="w-full text-center mb-3 font-bold text-lg 
                text-slate-800">
                    {book.description}
                </p>
                <button 
                    className="bg-blue-500 w-full text-gray-100 py-2 
                    rounded-lg hover:bg-blue-600 transition-all 
                    duration-1000"
                    onClick={onClose}
                >CLOSE</button>
            </div>
            </div>
        </div>
    )
}
export default ViewBookModal