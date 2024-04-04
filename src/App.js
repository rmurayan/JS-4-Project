import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Main from "./components/Home/Main";
import Page404 from "./components/Page404/index"
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./DB/database";
function PrivateRoute({ element, ...rest }) {
  // Check if the user is authenticated
  const isAuthenticated = auth.currentUser !== null;

  return isAuthenticated ? element : <Navigate to="/" />;
}
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/main"
          element={<PrivateRoute element={<Main />} />}
        />
        <Route path="*" element={<Page404/>} />

      </Routes>
    </Router>
  );
}
export default App;
