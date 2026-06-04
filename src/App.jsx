import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Eksplor from "./pages/Eksplor";
import Tes from "./pages/Tes";
import TesQuestions from "./pages/TesQuestions";
import Profil from "./pages/Profil";
import Detail from "./pages/Detail";
import Hasil from "./pages/Hasil";
import Login from "./pages/Login";
import Register from "./pages/Register";

function HasilPage() {
  const { state } = useLocation();
  return <Hasil result={state?.result ?? "software-engineer"} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<Landing />} />
        <Route path="/eksplor"        element={<Eksplor />} />
        <Route path="/detail/:slug"   element={<Detail />} />
        <Route path="/tes"            element={<Tes />} />
        <Route path="/tes/questions"  element={<TesQuestions />} />
        <Route path="/hasil"          element={<HasilPage />} />
        <Route path="/profil"         element={<Profil />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}