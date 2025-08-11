import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/slice/userSlice'

const Layout = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

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
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout