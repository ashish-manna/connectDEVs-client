import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/slice/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connectionList = useSelector((store) => store?.connection);

    const getConnectionList = async () => {
        if (connectionList) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/connections`, { withCredentials: true });
            dispatch(addConnection(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getConnectionList();
    }, [])

    if (connectionList?.length === 0) return <div className="text-center opacity-75">Your connections will show here.</div>
    return connectionList && (
        <div className="w-full md:max-w-1/2 mx-0 md:mx-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Connections</li>
                {connectionList.map((user) =>
                    <li key={user._id} className="list-row">
                        <div><img className="size-10 rounded-box" src={user.photoUrl} /></div>
                        <div>
                            <div>{user.firstName}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{user.about}</div>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default Connections