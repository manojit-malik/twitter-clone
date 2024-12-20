import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import noPfpCover from "../../Media/Gray.jpg";
import { Avatar, Button } from "@mui/material";
import noPfp from "../../Media/User.jpeg";
import VerifiedLogo from "../../Media/verificationIcon.png";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ProfileTabs from "../Tabs/ProfileTabs";
import ProfileModal from "./ProfileModel";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleBack = () => navigate(-1);

  const [openProfileModel, setOpenProfileModel] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleClose = () => setOpenProfileModel(false);

  const userName =
    auth.user?.fullName.split(" ").join("_").toLowerCase() + auth.user?.id;

  const handleFollowUser = () => {
    console.log("Follow User");
  };

  console.log("website:", auth.user?.website);

  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />

        <h1 className="py-5 text-xl font-bold opcacity-90 ml-5">
          {auth.user?.fullName}
        </h1>
      </section>

      <section>
        <img
          className="w-[100%] h-[225px] object-cover"
          src={auth.user?.backgroundImage || noPfpCover}
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="pfp"
            src={auth.user?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {true ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.user?.fullName}</h1>
            {true && <img className="ml-2 w-5 h-5" src={VerifiedLogo} alt="" />}
          </div>
        </div>
        <div className="flex items-center">
          <h1 className="text-gray-500">@{userName}</h1>
        </div>

        <div className="mt-2 space-y-3">
          <div className="mt-2 space-y-3">
            <p className="text-left">{auth.user?.bio}</p>

            <div className="py-1 flex flex-col space-y-3">
              {" "}
              {/* Changed to flex-col */}
              {auth.user?.website && (
                <div className="flex items-center text-gray-500">
                  <LinkIcon />
                  <p className="ml-2">{auth.user.website}</p>
                </div>
              )}
              {auth.user?.location && (
                <div className="flex items-center text-gray-500">
                  <LocationOnIcon />
                  <p className="ml-2">{auth.user.location}</p>
                </div>
              )}
              <div className="flex items-center text-gray-500">
                <CalendarMonthIcon />
                <p className="ml-2">Joined March 2024</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.user?.following.length}</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.user?.followers.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <ProfileTabs />
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModel} />
      </section>
    </div>
  );
};

export default Profile;
