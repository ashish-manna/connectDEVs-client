import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../redux/slice/requestSlice";

const Request = () => {
    const dispatch = useDispatch();
    const requestList = useSelector((store) => store?.request);

    const handleStatusChangeClick = async (status, id) => {
        try {
            axios.post(`${import.meta.env.VITE_BASE_URL}/request/review/${status}/${id}`, {}, { withCredentials: true });
            dispatch(removeRequest(id));
        } catch (err) {
            console.log(err.message);
        }
    }
    const fetchRequest = async () => {
        if (requestList.length > 0) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/received/request`, { withCredentials: true });
            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchRequest();
    }, [])

    if (requestList?.length === 0) return <div className="text-center mt-5 opacity-75">Sorry, No Pending Request Found</div>;
    return requestList && (
        <div className="w-full md:max-w-1/2 mx-0 md:mx-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Pending Connection Request</li>
                {requestList.map((req) => (
                    <li key={req._id} className="list-row">
                        <div><img className="size-10 rounded-box" src={`${import.meta.env.VITE_DUMMY_IMG_URL}`} /></div>
                        <div>
                            <div>{req.firstName}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{req.about}</div>
                        </div>
                        <button onClick={() => handleStatusChangeClick("accepted", req._id)} className="btn btn-square btn-ghost hover:bg-green-100 text-green-500">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                        <button onClick={() => handleStatusChangeClick("rejected", req._id)} className="btn btn-square btn-ghost hover:bg-red-100 text-red-500">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Request