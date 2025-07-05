import React from "react";
import { useNavigate } from "react-router";
import { useGetBookQuery, useBorrowBookMutation } from "../../../features/books/booksApi";
import type { IBorrow, IBook } from "../../../features/books/bookTypes";
import { toast } from "react-toastify";

interface IProps {
    bookId: string;
    onClose: () => void;
};

const BorrowBookModal: React.FC<IProps> = (props) => {
    const { bookId, onClose } = props;
    const { data, isLoading, error } = useGetBookQuery(bookId);
    const [ borrowBook, { isLoading: isBorrowing } ] = useBorrowBookMutation();
    const [ formData, setFormData ] = React.useState<Partial<IBorrow>>({
        quantity: 1, dueDate: ""
    });

    const navigate = useNavigate();
    const book: IBook | undefined | null = data?.data;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookId || !formData.quantity || !formData.dueDate) {
            toast.warn("All fields are required.", {
                position: "top-right",
                autoClose: false,
                closeButton: true
            });
            return;
        }

        try {
            await borrowBook({
                updates: {
                    book: bookId,
                    quantity: formData.quantity,
                    dueDate: new Date(formData.dueDate).toISOString(),
                }
            }).unwrap();

            toast.success(`You have successfully borrowed "${book?.title}"`, {
                position: "top-right",
                autoClose: false,
                closeButton: true
            });

            navigate("/borrow-summary");
        } catch (err) {
            console.error("Failed to borrow book:", err);
            toast.error("Failed to borrow book. Please try again.", {
                position: "top-right",
                autoClose: false,
                closeButton: true
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    if (isLoading) return <div>Loading book...</div>;
    if (error || !book) return <div>Failed to load book.</div>;

    return (
        <div className="modal">
            <div className="modal-content">
            <form 
                className="w-[300px] bg-white p-6 rounded-xl shadow-lg flex flex-col 
                justify-center items-center gap-3 mx-auto mt-32 sm:w-96" 
                onSubmit={handleSubmit}
            >
                <h2 
                    className="w-full text-center mb-3 font-bold text-4xl 
                    text-slate-800"
                >
                    Borrow Book: {book.title}
                </h2>
                <div>
                    <label>
                        Quantity:
                        <div className="flex items-center gap-2">
                            {/* Decrement button */}
                            <button
                                type="button"
                                className="px-3 py-1 bg-slate-300 rounded-lg text-slate-700"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        quantity: Math.max((prev.quantity ?? 0) - 1, 0),
                                    }))
                                }
                                disabled={(formData.quantity ?? 0) <= 0}
                            >
                                -
                            </button>
                            {/* Quantity input */}
                            <input
                                className="bg-slate-200"
                                type="number"
                                name="quantity"
                                value={formData.quantity ?? 1}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                min={1}
                                max={book.copies}
                            />
                            {/* Increment button */}
                             <button
                                type="button"
                                className="px-3 py-1 bg-slate-300 rounded-lg text-slate-700"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        quantity: Math.min((prev.quantity ?? 0) + 1, book.copies),
                                    }))
                                }
                                disabled={(formData.quantity ?? 0) >= book.copies}
                            >
                                +
                            </button>
                        </div>
                    </label>
                </div>
                <label>
                    Due Date:
                    <input
                        className="bg-slate-200"
                        type="date"
                        name="dueDate"
                        value={formData.dueDate ?? ""}
                        onChange={handleChange}
                    />
                </label>
                <button 
                    className="bg-blue-500 w-full text-gray-100 
                    py-2 rounded-lg hover:bg-blue-600 transition-all 
                    duration-1000"
                    type="submit" 
                    disabled={isBorrowing}
                >
                    {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </button>
                <button 
                    className="bg-blue-500 w-full text-gray-100 py-2 
                    rounded-lg hover:bg-blue-600 transition-all duration-1000"
                    type="button" 
                    onClick={onClose}
                >
                    Cancel
                </button>
            </form>
            </div>
        </div>
    )
}
export default BorrowBookModal