import React from "react";
import { useDeleteBookMutation, useGetBookQuery } from "../../../features/books/booksApi";
import type { IBook } from "../../../features/books/bookTypes"
import { toast } from "react-toastify";

interface IProps {
    bookId: string;
    onClose: () => void;
};

const DeleteBookModal: React.FC<IProps> = (props) => {
    const { bookId, onClose } = props;
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
    const { data, isLoading: isFetching } = useGetBookQuery(bookId);

    const book: IBook | undefined | null = data?.data;

    const handleDelete = async () => {
        try {
            await deleteBook(bookId).unwrap();
            toast.success(
                <span>
                    <strong>{book?.title}</strong> deleted
                </span>, 
                {
                    position: "top-right",
                    autoClose: false,
                    closeButton: true
                }
            );
            onClose();
        } catch (err) {
            console.error('Failed to delete book:', err);
            toast.error("Failed to delete book. Please try again.", {
                position: "top-right",
                autoClose: false,
                closeButton: true
            });
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div 
                    className="w-[300px] bg-white p-6 rounded-xl shadow-lg flex flex-col 
                    justify-center items-center gap-3 mx-auto mt-60 sm:w-96"
                >
                    {isFetching ? (
                        <p>Loading book info...</p>
                    ) : (
                        <p>Are you sure you want to delete <strong>{book?.title}</strong>? It will be permanently deleted.</p>
                    )}
                    <button 
                        className="bg-red-500 w-full text-gray-100 py-2 
                        rounded-lg hover:bg-red-600 transition-all duration-1000"
                        onClick={handleDelete} 
                        disabled={isDeleting}
                        >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <button 
                        className="bg-blue-500 w-full text-gray-100 py-2 
                        rounded-lg hover:bg-blue-600 transition-all duration-1000"
                    onClick={onClose}>
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeleteBookModal