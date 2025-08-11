import { useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const handleSaveProfileClick = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000)
    }
    return user && (
        <div className="w-full flex justify-center my-10 md:my-10">
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={`${import.meta.env.VITE_DUMMY_IMG_URL}`}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user.firstName}</h2>
                    <p>{user.about}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleSaveProfileClick}>Save Profile</button>
                        <button className="btn btn-secondary" onClick={() => navigate("/")}>Back To Feed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile