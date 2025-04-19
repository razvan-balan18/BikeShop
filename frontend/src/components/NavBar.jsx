import { Link } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart, AiOutlinePhone } from "react-icons/ai";
import { useAuth } from "../AuthContext";

export default function NavBar() {
    const { user, isAdmin, logout } = useAuth();

    return (
        <div className="navbar bg-base-100 p-5">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">BikeShop</Link>
            </div>
            <div className="navbar-center">
                <h1 className="text-2xl font-bold">Premium Cycling Equipment</h1>
            </div>
            <div className="navbar-end flex items-center gap-2">
                <Link to="/contact" className="btn btn-ghost btn-sm">
                    <AiOutlinePhone className="text-lg" />
                    Contact
                </Link>
                
                <Link to="/cart" className="btn btn-ghost btn-sm">
                    <AiOutlineShoppingCart className="text-lg" />
                    Cart
                </Link>

                {isAdmin && (
                    <>
                        <Link to="/users/all-users" className="btn btn-outline btn-secondary">
                            Manage Users
                        </Link>
                        <Link to="/admin/create-article" className="btn btn-outline btn-primary">
                            Create Article
                        </Link>
                    </>
                )}

                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{user.email}</span>
                        <button 
                            onClick={logout}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            <AiOutlineLogout className="text-lg" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                            <AiOutlineLogin className="text-lg" />
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-outline btn-secondary btn-sm">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}