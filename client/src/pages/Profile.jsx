import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/imageicon.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  actionFailure,
  actionSuccess,
  actionStart,
  endAction,
} from "../redux/userSlice";
import axios from "axios";
import Swal from "sweetalert2";

function Profile() {
  const [updateButton, setUpdateButton] = useState(false);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const updateFormButton = () => {
    setUpdateButton(updateButton ? false : true);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A7273",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(actionStart());
          const res = axios.patch(
        `http://localhost:8000/api/user/updateprofile/${currentUser._id}`,
        userData,
        { withCredentials: true }
      );
        dispatch(actionSuccess(res.data.user));
        setUpdateButton(false);
          Swal.fire({
            title: "Updated",
            text: "Your profile has been updated.",
            icon: "success",
          });
          navigate("/profile");
        }
      });
    } catch (error) {
      console.log(error.data);
      dispatch(actionFailure(error.response.data.message));
    }
  };

  const handleSignOut =() => {
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A7273",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Out",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(actionStart());
          const res = axios.get("http://localhost:8000/api/auth/signout");
          Swal.fire({
            title: "signed out!",
            text: "You signed out successfully",
            icon: "success",
          });
          navigate("/");
          dispatch(endAction());
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(actionFailure(error.response.data.message));
    }
  };

  const handleDeleteAccount = () => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete your account?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0A7273",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(actionStart());
          const res = axios.delete(
            `http://localhost:8000/api/user/deleteprofile/${currentUser._id}`,
            { withCredentials: true }
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
          });
          navigate("/");
          dispatch(endAction());
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(actionFailure(error.response.data.message));
    }
  };

  return (
    <section className="text-color3">
      <button
        hidden={currentUser.role == "User"}
        className={`${
          currentUser.role !== "admin"
            ? "none"
            : "w-fit bg-color3  mb-2 mt-3 ml-[2%] text-lg p-1 rounded-md text-center text-color2"
        }`}
      >
        <Link to="/dashboard">Admin Dashboard</Link>
      </button>
      <h2 className="text-2xl font-bold pt-3 text-center">Profile Page</h2>
      <p className="text-lg text-center">
        Fill your information here
      </p>
      <p className="p-1 text-center ss:text-end text-lg text-color4 mr-10">
        Points: {currentUser.points}
      </p>

      <div className="ss:flex mt-[32px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col ss:w-[50%] ml-[7%] font-semibold  ss:border-r-2 border-b-2 ss:border-b-0 border-color1 "
        >
          <label className="ml-[2%] text-1xl mt-[8px] ">Name:</label>
          <input
            disabled={!updateButton}
            defaultValue={currentUser.name}
            id="name"
            type="text"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%]"
            onChange={handleChange}
          />
          <label className="ml-[2%] text-1xl mt-[8px]">Email:</label>
          <input
            disabled={!updateButton}
            defaultValue={currentUser.email}
            id="email"
            type="email"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%]"
            onChange={handleChange}
          />
          <label hidden={!updateButton} className="ml-[2%] text-1xl mt-[8px]">
            Password:
          </label>
          <input
            hidden={!updateButton}
            id="password"
            type="password"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%]"
            onChange={handleChange}
            defaultValue={userData.password}
          />
          <label className="ml-[2%] text-1xl mt-[8px] ">address:</label>
          <input
            disabled={!updateButton}
            defaultValue={currentUser.address}
            id="address"
            type="text"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%]"
            onChange={handleChange}
          />
          <label className="ml-[2%] text-1xl mt-[8px] ">Phone Number:</label>
          <input
            disabled={!updateButton}
            defaultValue={currentUser.phoneNumber}
            id="phoneNumber"
            type="number"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%] "
            onChange={handleChange}
          />

          <button
            type="button"
            disabled={loading}
            onClick={updateFormButton}
            className="rounded-md mt-4 mb-3 place-self-center text-lg p-1 bg-color3 text-color2  w-fit"
          >
            {updateButton ? "Cancel update" : "Add/update profile"}
          </button>

          <button
            type="submit"
            disabled={loading}
            hidden={!updateButton}
            className="w-fit bg-color3 mt-4 mb-4 text-lg p-1 rounded-md place-self-center text-color2"
          >
            Submit
          </button>
          {error && (
            <p className="text-red-700 place-self-center text-lg">{error}</p>
          )}
        </form>

        <div className="border-b-2 border-b-color1 ss:border-b-0 ss:ml-[24px] mt-[32px] ss:mt-0">
          <h3 className="text-xl font-bold ml-[40px]">
            Order History
          </h3>

          <div className="xs:flex gap-10 mt-5 ml-14 ss:ml-0">
            <img src={img} alt="" className="w-[88px]" />
            <div>
              <p className="text-lg font-semibold">Price: 20$</p>
              <p className="text-lg font-semibold">Ordered at: 10/11/2024</p>
              <p className="text-lg font-semibold">Delivered at: 15/11/2024</p>
            </div>
          </div>

          {/* <div className="xs:flex gap-10 mt-5 ml-14 ss:ml-0">
            <img src={img} alt="" className="w-[88px]"/>
            <div>
              <p className="text-lg font-semibold">Price: 20$</p>
              <p className="text-lg font-semibold">Ordered at: 10/11/2024</p>
              <p className="text-lg font-semibold">Delivered at: 15/11/2024</p>
            </div>
          </div>
          <div className="xs:flex gap-10 mt-5 ml-14 ss:ml-0">
            <img src={img} alt="" className="w-[88px]"/>
            <div>
              <p className="text-lg font-semibold">Price: 20$</p>
              <p className="text-lg font-semibold">Ordered at: 10/11/2024</p>
              <p className="text-lg font-semibold">Delivered at: 15/11/2024</p>
            </div>
          </div> */}
        </div>
      </div>
      <div className=" flex justify-around mt-3 ml-[8%] ">
        <button onClick={handleSignOut} className="text-lg ">
          Sign Out
        </button>
        <button onClick={handleDeleteAccount} className="text-red-700 text-lg">
          Delete Account
        </button>
      </div>
    </section>
  );
}

export default Profile;
