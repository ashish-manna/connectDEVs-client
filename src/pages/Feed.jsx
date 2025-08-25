import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slice/feedSlice";
import UserCard from "../components/UserCard";
import { Link } from "react-router-dom";

const Feed = () => {
    const dispatch = useDispatch();
    const feedList = useSelector((store) => store?.feed);
    const fetchFeed = async () => {
        if (feedList) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/feed`, { withCredentials: true });
            dispatch(addFeed(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchFeed();
    }, [])

    if (feedList?.length === 0) return <div className="text-center opacity-75">You have got all in your feed.</div>

    return feedList && (
        <div className="w-full flex justify-center px-5 md:py-0 my-15 md:my-20">
            <Link to={'/buymechai'}>
                <img src="/mug.png" className="w-10 h-10 fixed right-2 top-20" />
            </Link>
            <UserCard user={feedList[0]} />
        </div>
    )
}

export default Feed