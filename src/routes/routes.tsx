import { createBrowserRouter } from "react-router";
import App from "../App";
import { AllBooks, AddBook, BorrowSummary } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <AllBooks />
            },
            {
                path: "books",
                element: <AllBooks />
            },
            {
                path: "create-book",
                element: <AddBook />
            },
            {
                path: "borrow-summary",
                element: <BorrowSummary />
            }
        ]
    }
]);

export default router;