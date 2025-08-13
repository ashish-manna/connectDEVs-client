import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../redux/slice/feedSlice";

const UserCard = ({ user }) => {
    const { firstName, about } = user;
    const dispatch = useDispatch();

    const handleReqClick = async (status, _id) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
        console.log(res);
        dispatch(removeFeed(_id));
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={`${import.meta.env.VITE_DUMMY_IMG_URL}`}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleReqClick("interested", user._id)}>Interested</button>
                    <button className="btn btn-secondary" onClick={() => handleReqClick("ignored", user._id)}>Ignored</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard