import React , { useState} from 'react';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import PfpCover from "../../Media/ProfileCover.jpeg";
import { Avatar, Button } from "@mui/material";
import Pfp from "../../Media/manojitPfp.jpg";
import VerifiedLogo from "../../Media/verificationIcon.png";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ProfileTabs from '../Tabs/ProfileTabs';
import ProfileModal from './ProfileModel';


const Profile = () => {

  const navigate = useNavigate();

  const handleBack = () => navigate(-1);  

  const [openProfileModel, setOpenProfileModel] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleClose = () => setOpenProfileModel(false);

  

  const handleFollowUser = () => {
    console.log("Follow User");
  };
  return (
    <div>

      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />

        <h1 className="py-5 text-xl font-bold opcacity-90 ml-5">
          Manojit Malik
        </h1>
      </section>

      <section>
        <img className="w-[100%] h-[50rem-] object-cover" src={PfpCover} alt=''/>
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="Manojit Malik"
            src={Pfp}
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
            <h1 className="font-bold text-lg">Manojit Malik</h1>
            {true && <img className="ml-2 w-5 h-5" src={VerifiedLogo} alt="" />}
          </div>
        </div>
        <div className="flex items-center">
        <h1 className="text-gray-500">@i_mnog</h1>
        
        </div>
        
        <div className="mt-2 space-y-3">
          
        <p className="text-left"> {/* Added text-left class to align the text to the left */}
      Hello I am Manojit Malik and I am maker of this twitter(X) clone
              application
    </p>

          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">India</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined March 2024</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>59</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold">
              <span>6</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
          <ProfileTabs />
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModel}/>
      </section>
    </div>
  );
};

export default Profile;
