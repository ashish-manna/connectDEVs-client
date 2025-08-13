import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/slice/userSlice";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [profileImgFile, setProfileImgFile] = useState(null);
    const [profileImgPreview, setProfileImgPreview] = useState(import.meta.env.VITE_DUMMY_IMG_URL);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [about, setAbout] = useState("");
    const [age, setAge] = useState("");
    const dispatch = useDispatch();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImgFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSaveProfileClick = async () => {
        try {
            const formData = new FormData();

            if (firstName !== user.firstName) formData.append("firstName", firstName);
            if (lastName !== user.lastName) formData.append("lastName", lastName);
            if (about !== user.about) formData.append("about", about);
            if (age !== user.age) formData.append("age", age);
            if (profileImgFile) {
                formData.append("profileImg", profileImgFile);
            }

            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/profile/edit`, formData, { withCredentials: true });
            dispatch(updateUser(res?.data?.user));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setAbout(user.about || "");
            setAge(user.age || "");
            setProfileImgPreview(user.photoUrl || import.meta.env.VITE_DUMMY_IMG_URL);
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
                        src={profileImgPreview}
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