import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../redux/slice/feedSlice";
import { useEffect, useState } from "react";
import formattedDate from "../utils/formattedDate";

const UserCard = ({ user }) => {
    const { firstName, about, age, createdAt } = user;
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleReqClick = async (status, _id) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
        console.log(res);
        setStatus(status);

        setTimeout(() => {
            dispatch(removeFeed(_id));
            setStatus("");
        }, 400)
    }
    useEffect(() => {
        setImageLoaded(false);
    }, [user._id]);

    return (
        <div key={user._id} className={`card bg-base-300 w-96 shadow-sm transition-all mb-2 duration-400 ease-out ${status === "interested"
            ? "rotate-12 translate-x-[200px] opacity-0"
            : ""
            }
        ${status === "ignored"
                ? "-rotate-12 -translate-x-[200px] opacity-0"
                : ""
            }`}>
            <figure>
                {!imageLoaded && (
                    <div className="flex w-full flex-col gap-4 p-4">
                        <div className="skeleton h-72 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                )}

                <img
                    src={user?.photoUrl}
                    alt={firstName}
                    onLoad={() => setImageLoaded(true)}
                    className={`${!imageLoaded ? "hidden" : "block"}`}
                />
            </figure>
            {imageLoaded && (
                <div className="card-body">
                    <div className="">
                        <h2 className="card-title">{firstName}</h2>
                        <div className="flex justify-between items-center">
                            <h4 className="opacity-50 font-bold text-sm">Age: {age}</h4>
                            <h4 className="opacity-50 font-bold text-sm">Joined:{formattedDate(createdAt)}</h4>
                        </div>
                    </div>
                    <p>{about}</p>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleReqClick("interested", user._id)}
                        >
                            Interested
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleReqClick("ignored", user._id)}
                        >
                            Ignored
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserCard