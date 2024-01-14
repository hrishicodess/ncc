import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />}>
        </Route>
        </Routes>
        </BrowserRouter>
  );
}

export default App;
