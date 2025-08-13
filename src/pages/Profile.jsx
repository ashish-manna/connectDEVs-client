import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [profileImg, setProfileImg] = useState(import.meta.env.VITE_DUMMY_IMG_URL);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [about, setAbout] = useState("");
    const [age, setAge] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSaveProfileClick = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000)
    }
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setAbout(user.about || "");
            setAge(user.age || "");
            setProfileImg(user.profileImg || import.meta.env.VITE_DUMMY_IMG_URL);
        }
    }, [user]);

    return user && (
        <div className="w-full flex justify-center my-10 px-5 md:my-10">
            {showToast && <div className="toast toast-top toast-center z-999">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={profileImg}
                        alt="profile-pic" />
                </figure>
                <input type="file" onChange={handleImageUpload} className="file-input w-1/2 my-2 mx-auto" />
                <div className="card-body">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name:</legend>
                        <input type="text" className="input" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name:</legend>
                        <input type="text" className="input" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age:</legend>
                        <input type="number" className="input" onChange={(e) => setAge(e.target.value)} value={age} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About:</legend>
                        <input type="text" className="input" onChange={(e) => setAbout(e.target.value)} value={about} />
                    </fieldset>
                    <p>{about}</p>
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