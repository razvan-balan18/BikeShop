import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';
import Article from './pages/articles/Article';
import ManageUsers from './pages/admin/ManageUsers';
import ManageArticles from './pages/admin/ManageArticles';
import CreateArticle from './pages/admin/CreateArticle';
import AllUsers from './pages/users/AllUsers';
import CreateUser from './pages/admin/CreateUser';
import Login from './loginSignup/Login';
import Signup from './loginSignup/Signup';
import Cart from './Cart';
import Contact from './Contact';
import { AuthProvider, useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

// Protected route component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/articles/Article" element={
          <ProtectedRoute>
            <Article />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/users/all-users" element={
          <ProtectedRoute requireAdmin>
            <AllUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/create-user" element={
          <ProtectedRoute requireAdmin>
            <CreateUser />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit-user" element={
          <ProtectedRoute requireAdmin>
            <ManageUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/manage-articles" element={
          <ProtectedRoute requireAdmin>
            <ManageArticles />
          </ProtectedRoute>
        } />
        <Route path="/admin/create-article" element={
          <ProtectedRoute requireAdmin>
            <CreateArticle />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
