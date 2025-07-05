import React from "react";
import { useCreateBookMutation } from "../../features/books/booksApi";
import type { IBook } from "../../features/books/bookTypes";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddBook: React.FC = () => {
  const [ createBook, { isLoading: isCreating } ] = useCreateBookMutation();
  const [ formData, setFormData ] = React.useState<Partial<IBook>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,
          [name]: name === 'copies' ? Number(value) : value,
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.title || !formData.author || !formData.genre || 
      !formData.description || !formData.isbn || !formData.copies) {
          toast.warn("All fields are required.", {
              position: "top-right",
              autoClose: false,
              closeButton: true
          });
          return;
      };

      try {
          await createBook({ updates: formData }).unwrap();
          toast.success(
            <span>
              <strong>{formData?.title}</strong> added
            </span>, 
            {
              position: "top-right",
              autoClose: false,
              closeButton: true
            }
          );
          setFormData({});
          navigate("/books");
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

  return (
    <div>
        <h2 className="w-full text-center mt-6 font-bold text-4xl 
        text-slate-800">
            Add A Book
        </h2>
        {/* w-96 */}
        <form 
            className="w-[300px] bg-white p-6 rounded-xl shadow-lg flex flex-col 
            justify-center items-center gap-3 mx-auto mt-6 sm:w-96"
            onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label className="w-full flex flex-col">
              Title:
              <input
                className="py-2 bg-slate-200 text-slate-600 px-4 
                rounded-lg"
                type="text"
                name="title"
                value={formData.title ?? ""}
                onChange={handleChange}
              />
          </label>
          </div>
          <div className="w-full">
            <label className="w-full flex flex-col">
              Author:
              <input
                className="py-2 bg-slate-200 text-slate-600 px-4 
                rounded-lg"
                type="text"
                name="author"
                value={formData.author ?? ""}
                onChange={handleChange}
              />
          </label>
          </div>
          <div className="w-full">
            <label className="w-full flex flex-col">
              Genre:
              <input
                className="py-2 bg-slate-200 text-slate-600 px-4 
                rounded-lg"
                type="text"
                name="genre"
                value={formData.genre ?? ""}
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
                type="text"
                name="isbn"
                value={formData.isbn ?? ""}
                onChange={handleChange}
              />
          </label>
          </div>
          <div className="w-full">
            <label className="w-full flex flex-col">
              Description:
              <input
                className="py-2 bg-slate-200 text-slate-600 px-4 
                rounded-lg"
                type="text"
                name="description"
                value={formData.description ?? ""}
                onChange={handleChange}
              />
          </label>
          </div>
          <div className="w-full">
            <label className="w-full flex flex-col">
              Copies:
              <input
                className="py-2 bg-slate-200 text-slate-600 px-4 
                rounded-lg"
                type="number"
                name="copies"
                value={formData.copies ?? 1}
                onChange={handleChange}
                min={1}
              />
          </label>
          </div>
            <div className="w-full">
                <button 
                className="bg-blue-500 w-full text-gray-100 py-2 
                rounded-lg hover:bg-blue-600 transition-all duration-1000"
                type="submit" 
                disabled={isCreating}
            >
                {isCreating ? "Adding..." : "Add Book"}
            </button>
            </div>
      </form>
      {/* <button onClick={handleClick} disabled={isCreating}>ADD</button>  */}
    </div>
  )
}
export default AddBook