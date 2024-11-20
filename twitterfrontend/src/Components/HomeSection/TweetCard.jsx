import React , { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Typography } from "@mui/material";
import UserImg from "../../Media/User.jpeg";
import { useNavigate } from "react-router-dom";
import VerifiedLogo from "../../Media/verificationIcon.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SBRImage from "../../Media/SpringBootReact.png";
import BatmanImage from "../../Media/Batman.jpg";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import { FavoriteOutlined } from "@mui/icons-material";
import ReplyModel from "./ReplyModel";

const TweetCard = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openReplyModel, setOpenReplyModel] = useState(false);
  const handleOpenReplyModel = (event) => {
    event.stopPropagation();
    setOpenReplyModel(true);
  }
  const handleCloseReplyModel = (event) => {
    event.stopPropagation();
    setOpenReplyModel(false);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteTweet = () => {
    console.log("Delete Tweet");
    handleClose();
  };

  const handleCreateRetweet = () => {
    console.log("Create retweet");
  };

  const handleLikeRetweet = () => {
    console.log("Like Tweet");
  };

  return (
    <React.Fragment>
      {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
            <RepeatIcon/>
            <p>You Retweet</p>
        </div> */}

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className="cursor-pointer"
          alt="UserImage"
          src={UserImg}
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <Typography
                Wrap
                sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
                className="font-semibold"
              >
                <span>Manojit Malik</span>
              </Typography>

              <Typography variant="body2" className="text-gray-600">
                <span>@i_mnog . 2m</span>
              </Typography>
              <img className="ml-2 w-5 h-5" src={VerifiedLogo} alt="" />
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2" onClick={() => navigate(`/tweet/${3}`)}>
            <div className="cursor-pointer">
              <p className="mb-2 p-0">
                Keep Going for Twitter clone using ReactJS and SpringBoot.
              </p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                src={BatmanImage}
                alt=""
              />
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>43</p>
              </div>

              <div
                className={`${
                  true ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                <p>54</p>
              </div>

              <div
                className={`${
                  true ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {true ? (
                  <FavoriteIcon
                    onClick={handleLikeRetweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteOutlined
                    onClick={handleLikeRetweet}
                    className="cursor-pointer"
                  />
                )}
                <p>54</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>430</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
      <ReplyModel open={openReplyModel} handleClose={handleCloseReplyModel} />

      </section>
    </React.Fragment>
  );
};

export default TweetCard;
