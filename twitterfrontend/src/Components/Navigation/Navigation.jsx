import React from "react";
import XLogo from "../../Media/XLogo.svg";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import UserImg from "../../Media/User.jpeg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout");
    handleClose();
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5">
          <img
            height={30}
            width={30}
            viewBox="0 0 24 24"
            aria-hidden="true"
            src={XLogo}
            alt="Twitter's Logo in SVG Format"
          />
        </div>

        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${6}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="py-7">
          <Button
            sx={{
              width: "90%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "1e88e5",
            }}
            variant="contained"
          >
            Post
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar alt="UserImage" src={UserImg} />
          <div>
            <Typography
              Wrap
              sx={{ width: "160px", overflow: "hidden", whiteSpace: "nowrap" }}
            >
              <span>Manojit Malik</span>
            </Typography>

            <Typography variant="body2" className="opacity-70">
              <span>@i_mnog</span>
            </Typography>
          </div>

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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
