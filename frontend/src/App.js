import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UserList";

function App(){
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UserList />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;