import Navbar from '../components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/slice/userSlice'

const Layout = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const isChatPage = location.pathname.startsWith('/chat');

    const fetchUser = async () => {
        if (user) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, { withCredentials: true })
            dispatch(addUser(res.data.user));
        } catch (err) {
            navigate("/login");
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className=''>
            {!isChatPage && <Navbar />}
            <div className={`${!isChatPage ? "pt-20" : "pt-0"} min-h-screen`}>
                <Outlet />
            </div>
            {!isChatPage && <Footer />}
        </div>
    )
}

export default Layout