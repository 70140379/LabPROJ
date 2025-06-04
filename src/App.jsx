import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Shop from "./pages/Shop"
import CategoryPage from "./pages/CategoryPage";
import Support from "./pages/Support";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop/category/:categoryId" element={<CategoryPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route path="/shop" element={<Shop />} /> 
      </Routes>
    </Router>
  );
}

export default App;