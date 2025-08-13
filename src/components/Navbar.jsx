import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/slice/userSlice";
import { removeAllFeed } from "../redux/slice/feedSlice";
import { removeAllConnection } from "../redux/slice/connectionSlice";
import { removeAllRequest } from "../redux/slice/requestSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(removeAllFeed());
            dispatch(removeAllConnection());
            dispatch(removeAllRequest());
            navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className="navbar fixed top-0 bg-base-300 shadow-sm z-99">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">ConnectDEVs</Link>
            </div>
            <div className="flex gap-2">
                {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                {user && <>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={"/profile"} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li><Link to={"/connections"}>Connections</Link></li>
                            <li><Link to={"/request"}>Requests</Link></li>
                            <li><div onClick={handleLogoutClick}>Logout</div></li>
                        </ul>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Navbar