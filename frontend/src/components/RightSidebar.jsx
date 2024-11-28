import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import store from "@/redux/store";
import { Link } from "react-router-dom";
import SuggestedUser from "./SuggestedUser";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="w-fit my-10 pr-32 screen-900:hidden">
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
      <SuggestedUser authuser={user}/>
    </div>
  );
};

export default RightSidebar;
