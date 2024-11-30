
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { setAuthUser, setSuggestedUsers } from "@/redux/authSlice";

const SuggestedUser = ({authuser}) => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  const [userFollowing,setUserFollowing] = useState(authuser?.following)


  
  const dispatch = useDispatch()
  console.log(authuser,userFollowing,"userFollowing")

  const followUnFollowHandler = async (userId) => {
    try {
      const res = await axios.post(
        `https://instagram-clone-awa2.onrender.com/api/v1/user/followorunfollow/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        
        let updatedFollowing = [];

        if(userFollowing){
          updatedFollowing = userFollowing?.includes(userId) ? userFollowing?.filter((item)=>item !== userId) : [...userFollowing,userId]
        }

        setUserFollowing(updatedFollowing)
        dispatch(setAuthUser({...authuser,following:updatedFollowing}))
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium  cursor-pointer"> See All</span>
      </div>

      {suggestedUsers?.map((user) => {
        return (
          <div key={user?._id} className="flex items-center justify-between my-5">
            <div className="flex items-center gap-2">
              <Link to={`profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <Link to={`profile/${user?._id}`}>
                  <h1 className="font-semibold text-sm">{user?.username}</h1>
                </Link>

                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here"}
                </span>
              </div>
            </div>
            <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]" onClick={()=>followUnFollowHandler(user._id)}>{userFollowing?.includes(user?._id) ? "Unfollow" : 'Follow'}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUser;
