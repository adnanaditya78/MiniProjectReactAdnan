import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ListPage from "./pages/List";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DetailPage from "./pages/Detail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
