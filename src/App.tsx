import { BrowserRouter, Routes, Route } from "react-router";
import { Detail } from "./pages/Detail";
import { List } from "./pages/List";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/todo/:id" element={<Detail />} />
    </Routes>
  </BrowserRouter>
);
