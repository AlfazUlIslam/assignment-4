import React from "react";
import { useGetBookQuery, useUpdateBookMutation } from "../../../features/books/booksApi";
import type { IBook } from "../../../features/books/bookTypes";

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
            [name]: name === 'copies' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBook({ id: bookId, updates: formData }).unwrap();
            onClose(); // Close modal on success
        } catch (err) {
            console.error("Failed to update book:", err);
        };
    };

    if (isLoading) return <div>Loading book...</div>;
    if (error) return <div>Failed to load book.</div>;
    if (!book) return null;
        
    return (
        <div className="modal">
            <div className="modal-content">
            <form
                className="w-96 bg-white p-6 rounded-xl shadow-lg flex flex-col 
                justify-center items-center gap-3 mx-auto mt-6" 
                onSubmit={handleSubmit}
            >
                <h2 className="w-full text-center mb-3 font-bold text-4xl 
            text-slate-800">
                Edit Book
            </h2>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Title:
                    <input
                    className="py-2 bg-slate-100 text-slate-500 px-1 
                    rounded-lg"
                    name="title" value={formData.title || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Author:
                    <input 
                    className="py-2 bg-slate-100 text-slate-500 px-1 
                    rounded-lg"
                    name="author" value={formData.author || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Genre:
                    <input 
                    className="py-2 bg-slate-100 text-slate-500 px-1 
                    rounded-lg"
                    name="genre" value={formData.genre || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    ISBN:
                    <input 
                    className="py-2 bg-slate-100 text-slate-500 px-1 
                    rounded-lg"
                    name="isbn" value={formData.isbn || ""} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <label className="w-full flex flex-col">
                    Copies:
                    <input 
                    className="py-2 bg-slate-100 text-slate-500 px-1 
                    rounded-lg"
                    type="number" name="copies" value={formData.copies ?? 0} onChange={handleChange} />
                    </label>
                </div>
                <div className="w-full">
                    <button 
                    className="bg-blue-500 w-full text-gray-100 py-2 
                rounded-xl hover:bg-blue-600 transition-all duration-1000"
                    type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Book"}
                    </button>
                </div>
                <div className="w-full">
                    <button 
                    className="bg-blue-500 w-full text-gray-100 py-2 
                rounded-xl hover:bg-blue-600 transition-all duration-1000"
                    type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default EditBookModal