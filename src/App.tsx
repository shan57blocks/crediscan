import { createHashRouter, RouterProvider } from "react-router-dom";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";

const router = createHashRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/search-result",
    element: <SearchResult />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
