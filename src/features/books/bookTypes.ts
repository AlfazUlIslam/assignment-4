export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY" | "";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetBooksResponse {
  data: IBook[];
  page: number;
  totalPages: number;
  totalItems: number;
};

export interface IGetBookResponse {
  success: boolean;
  message: string;
  data: IBook | null;
};

export interface IUpdateBookResponse {
  success: boolean;
  message: string;
  data: IBook | null;
};

export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: string;
};

export interface IBorrowBookResponse {
  success: boolean;
  message: string;
  data: IBorrow
};

export interface ICreateBookResponse {
  success: boolean;
  message: string;
  data: IBook;
};

export interface IBorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};

export interface IBorrowSummaryResponse {
  data: IBorrowSummaryItem[];
  page: number;
  totalPages: number;
  totalItems: number;
};