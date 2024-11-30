import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser, setUserProfile } from "@/redux/authSlice";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
 
  

  const { userProfile, user } = useSelector((store) => store.auth);
  
  
  const [activeTab, setActiveTab] = useState("posts");
  const [followers, setFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setFollowers(userProfile?.followers || []);
    setUserFollowing(user?.following || []);
}, [userProfile, user]);

  

  if(!user || ! userProfile) return <h1>Please wait data is fetchng...</h1>

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const followUnFollowHandler = async () => {
    try {
      const res = await axios.post(
        `https://instagram-clone-awa2.onrender.com/api/v1/user/followorunfollow/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        let updatedFollowers = [];
        let updatedFollowing = [];

        if (followers) {
          updatedFollowers = followers?.includes(user._id)
            ? followers?.filter((item) => item != user._id)
            :  [...followers, user._id];
          updatedFollowing = userFollowing?.includes(userId)
            ? userFollowing?.filter((item) => item != userId)
            :  [...followers, userId];
        }

        setFollowers(updatedFollowers);
        setUserFollowing(updatedFollowing);
        dispatch(
          setUserProfile({ ...userProfile, followers: updatedFollowers })
        );

        dispatch(setAuthUser({ ...user, following: updatedFollowing }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilePhoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className=" flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <div className="flex gap-2">
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit profile
                      </Button>
                    </Link>

                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      View archive
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      Ad tools
                    </Button>
                  </div>
                ) : followers?.includes(user._id) ? (
                  <>
                    <Button
                      variant="secondary"
                      className=" h-8 "
                      onClick={followUnFollowHandler}
                    >
                      Unfollow
                    </Button>
                    <Button variant="secondary" className=" h-8 ">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    className="bg-[#0095F6] h-8 hover:bg-[#3192d2]"
                    onClick={followUnFollowHandler}
                  >
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length}{" "}
                  </span>{" "}
                  posts
                </p>
                <Link to={`/followers/${userProfile._id}`}>
                  <p>
                    <span className="font-semibold">
                      {userProfile?.followers?.length}{" "}
                    </span>{" "}
                    followers
                  </p>
                </Link>

                <Link to={`/following/${userProfile._id}`}>
                  <p>
                    <span className="font-semibold">
                      {userProfile?.following?.length}{" "}
                    </span>{" "}
                    following
                  </p>
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <span>{userProfile?.bio || "Bio here..."}</span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <span>😎 Continuous Learner</span>
                <span>😎 Full Stack Developer</span>
                <span>😎 MERN Stack</span>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span className="py-3 cursor-pointer ">REELS</span>
            <span className="py-3 cursor-pointer ">TAGS</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost?.map((post) => {
              return (
                <div key={post?._id} className="relative group cursor-pointer">
                  <img
                    src={post?.image}
                    alt="post-image"
                    className="rounded-sm my-2 w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex items-center gap-2 hover:rtext-gray-300">
                        <Heart />
                        <span>{post?.likes.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:rtext-gray-300">
                        <MessageCircle />
                        <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
