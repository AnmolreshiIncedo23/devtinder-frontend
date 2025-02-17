import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

    const [emailId, setEmailId] = useState("elon@gmail.com");
    const [password, setPassword] = useState("Start@123456#");
    const [firstName, setFirstName] = useState("");
    const [showToast, setToast] = useState(false);
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, {
                withCredentials: true
            })
            setToast(true);
            setTimeout(()=>{
                setToast(false);
                dispatch(addUser(res.data));
                navigate("/");
            },3000);
        }
        catch (err) {
            setError(err?.response?.data || "something went wrong!!");
            console.log(err);
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, {
                withCredentials: true
            });
            dispatch(addUser(res.data.data));
            return navigate("/profile");

        } catch (err) {
            setError(err?.response?.data || "something went wrong!!");
            console.log(err);
        }
    }
    return (<>
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
                    {!isLoginForm && (<><div className="">
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">FirstName</span>
                            </div>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                        <div className="">
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">lastName</span>
                                </div>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </label>
                        </div></>)}
                    <div className="">
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="">
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" value={password} placeholder="Type here" onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <p className="text-red-500 text-sm">{error}</p>
                    <div className="card-actions justify-center w-full">
                        <button className="btn btn-secondary w-full" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Signup"}</button>
                    </div>

                    <p className=" text-sm cursor-pointer flex justify-center hover:underline" onClick={() => setIsLoginForm(value => !value)}>{isLoginForm ? "New User ? Signup Here" : "Exisiting User?Login Here"}</p>
                </div>
            </div>
        </div>
        { showToast && (<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>User Authenticated Sucessfully!</span>
            </div>
        </div>)}
    </>

    )
}

export default Login