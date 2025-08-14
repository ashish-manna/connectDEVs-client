import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password }, { withCredentials: true });
            dispatch(addUser(res.data.user));
            navigate("/");
        } catch (err) {
            console.log(err);
            setErrorMessage(err.message);
        }
    }
    const handleSignUp = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, { firstName: name, age, email, password }, { withCredentials: true });
            setIsLoginPage(!isLoginPage);
            setErrorMessage("");
        } catch (err) {
            setErrorMessage(err?.response?.data?.message);
        }
    }
    return (
        <div className="w-full px-5 flex justify-center py-10 md:py-20">
            <div className="bg-neutral p-10 rounded-lg">
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold text-4xl mb-2">{isLoginPage ? "Login" : "Sign Up"}</h1>
                    {!isLoginPage && <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3"
                            maxLength="30"
                            title="Only letters, numbers or dash"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </label>}
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mail@gmail.com" required />
                    </label>
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            minLength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                    </label>
                    {!isLoginPage && <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input type="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                    </label>}
                    <p className="text-[11px] mt-2">{!isLoginPage ? "Already Have an Account?" : "Don't Have any Account?"} <span className="font-bold text-sm cursor-pointer" onClick={() => {
                        setIsLoginPage(!isLoginPage);
                    }}>{isLoginPage ? "Sign Up" : "Login"}</span></p>
                    <button onClick={isLoginPage ? handleLogin : handleSignUp} className="btn btn-active btn-primary">SUBMIT</button>
                    <p className="text-red-500">{errMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default Login