import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import LeftDrawer from "./LeftDrawer";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sheetOpen,setSheetOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://instagram-clone-awa2.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setSheetOpen(false)
      setTimeout(()=>{
        setOpen(true);
      },500)
      
      
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];
  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen screen-1350:h-fit screen-1350:w-fit screen-1350:top-3 screen-1350:left-3 screen-1350:static">
      <div className="hidden screen-1350:block absolute left-1 top-3 ">
        <LeftDrawer authuser={user} sidebarItems={sidebarItems} likeNotification={likeNotification} open={open} setOpen={setOpen} sidebarHandler={sidebarHandler} sheetOpen={sheetOpen} setSheetOpen={setSheetOpen}/>
      </div>

      <div className="screen-1350:hidden flex flex-col">
        <div className="my-8 pl-3  flex justify-start items-center">
          <img src="https://i.pinimg.com/236x/e3/e6/d1/e3e6d1c4355a6213f8e7ec88d5ced07b.jpg" alt="logo" className="w-[50px] h-[50px] object-cover rounded-xl"/>
        </div>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 "
              >
                {item.icon}
                <span>{item.text}</span>
                {item.text === "Notification" &&
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 absolute bottom-6 left-6 bg-red-600 hover:bg-red-600"
                        >
                          {likeNotification?.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col gap-1">
                          {likeNotification?.length === 0 ? (
                            <p>No new Notification</p>
                          ) : (
                            likeNotification?.map((notification, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        notification?.userDetails
                                          ?.profilePicture
                                      }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm">
                                    <span className="font-bold">
                                      {notification?.userDetails?.username}{" "}
                                    </span>
                                    liked your post
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
