/* eslint-disable react/prop-types */
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
// import UserCard from "./UserCard";


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setToast] = useState(false);

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setToast(true);
            setTimeout(()=>{
                setToast(false);
            },3000);

        }
        catch (err) {
            setError(err.response.data);
        }
    }
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div className="">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name</span>

                                    </div>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />

                                </label>
                            </div>
                            <div className="">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input type="text" value={lastName} placeholder="Type here" onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </div>
                            <div className="">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Photo Url</span>

                                    </div>
                                    <input type="text" value={photoUrl} placeholder="Type here" onChange={(e) => setPhotoUrl(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </div>
                            <div className="">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age</span>

                                    </div>
                                    <input type="text" value={age} placeholder="Type here" onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </div>
                            <div className="">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">About</span>

                                    </div>
                                    <input type="textarea" value={about} placeholder="Type here" onChange={(e) => setAbout(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </div>
                            <div className="">
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender</span>

                                    </div>
                                    <input type="text" value={gender} placeholder="Type here" onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </div>
                            <p className="text-red-500 text-sm">{error}</p>
                            <div className="card-actions justify-center w-full">
                                <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
                {/* <UserCard/> */}
            </div>
            {showToast && (<div className="toast toast-top toast-center">

                <div className="alert alert-success">
                    <span>Profile Saved Succesfully.</span>
                </div>
            </div>)}
        </>

    )
}

export default EditProfile