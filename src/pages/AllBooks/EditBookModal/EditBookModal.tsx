import React from "react";
import { useGetBookQuery, useUpdateBookMutation } from "../../../features/books/booksApi";
import type { IBook } from "../../../features/books/bookTypes";
import { toast } from "react-toastify";

interface IProps {
    bookId: string;
    onClose: () => void;
};

const EditBookModal: React.FC<IProps> = (props) => {
    const { bookId, onClose } = props;
    const { data, isLoading, error } = useGetBookQuery(bookId);
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const [ formData, setFormData ] = React.useState<Partial<IBook>>({});

    const book: IBook | undefined | null = data?.data;

    React.useEffect(() => {
        if (book) {
            setFormData(book);
        }
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
            name === 'copies'
                ? Number(value)
                : name === 'genre'
                ? value.toUpperCase()
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //  || !formData.copies
        if (!formData.title || !formData.author || !formData.genre || 
        !formData.description || !formData.isbn) {
            toast.warn("All fields are required.", {
                position: "top-right",
                autoClose: false,
                closeButton: true
            });
            return;
        };

        try {
            await updateBook({ id: bookId, updates: formData }).unwrap();
            toast.success(
                <span>
                    <strong>{formData?.title}</strong> updated
                </span>, 
                {
                    position: "top-right",
                    autoClose: false,
                    closeButton: true
                }
            );
            onClose(); // Close modal on success
        } catch (err: any) {
            console.error("Failed to update book:", err);
            const apiError = err?.data;
    
            if (apiError?.message) {
                toast.error(apiError.message, {
                    position: "top-right",
                    autoClose: false,
                    closeButton: true
                });
            } else {
                toast.error("Something went wrong. Please try again.", {
                    position: "top-right",
                    autoClose: false,
                    closeButton: true
                });
            }
        };
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    if (isLoading) return <div>Loading book...</div>;
    if (error) return <div>Failed to load book.</div>;
    if (!book) return null;
        
    return (
        <div className="modal">
            <div className="modal-content">
            <form
                className="w-[300px] bg-white p-6 rounded-xl shadow-lg 
                flex flex-col justify-center items-center gap-3 mx-auto 
                mt-6 sm:w-96" 
                onSubmit={handleSubmit}
            >
                <h2 
                    className="w-full text-center mb-3 font-bold text-4xl 
                    text-slate-800"
                >
                    Edit Book
                </h2>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Title:
                    <input
                    className="py-2 bg-slate-200 text-slate-600 px-4 
                    rounded-lg"
                    name="title" value={formData.title || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Author:
                    <input 
                    className="py-2 bg-slate-200 text-slate-600 px-4 
                    rounded-lg"
                    name="author" value={formData.author || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Genre:
                    <input 
                    className="py-2 bg-slate-200 text-slate-600 px-4 
                    rounded-lg"
                    name="genre" value={formData.genre || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Description:
                    <input 
                        className="py-2 bg-slate-200 text-slate-600 px-4 
                        rounded-lg"
                        name="description" value={formData.description || ""} 
                        onChange={handleChange} 
                    />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    ISBN:
                    <input 
                    className="py-2 bg-slate-200 text-slate-600 px-4 
                    rounded-lg"
                    name="isbn" value={formData.isbn || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                        Copies:
                        <div className="flex items-center gap-2">
                            {/* Decrement button */}
                            <button
                                type="button"
                                className="px-3 py-1 bg-slate-300 rounded-lg text-slate-700"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        copies: Math.max((prev.copies ?? 0) - 1, 0),
                                    }))
                                }
                                disabled={(formData.copies ?? 0) <= 0}
                            >
                                -
                            </button>
                            {/* Copies input */}
                            <input 
                                className="py-2 bg-slate-200 text-slate-600 
                                px-4 rounded-lg"
                                type="number"
                                name="copies" 
                                value={formData.copies ?? 0} 
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                max={book.copies}
                                min={0}
                            />
                            {/* Increment button */}
                             <button
                                type="button"
                                className="px-3 py-1 bg-slate-300 rounded-lg text-slate-700"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        copies: Math.min((prev.copies ?? 0) + 1, book.copies),
                                    }))
                                }
                                disabled={(formData.copies ?? 0) >= book.copies}
                            >
                                +
                            </button>
                        </div>
                    </label>
                </div>
                <div className="w-full">
                    <button 
                        className="bg-blue-500 w-full text-gray-100 py-2 
                        rounded-lg hover:bg-blue-600 transition-all duration-1000"
                        type="submit" 
                        disabled={isUpdating}
                    >
                    {isUpdating ? "Updating..." : "Update Book"}
                    </button>
                </div>
                <div className="w-full">
                    <button 
                        className="bg-blue-500 w-full text-gray-100 py-2 
                        rounded-lg hover:bg-blue-600 transition-all duration-1000"
                        type="button" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default EditBookModal