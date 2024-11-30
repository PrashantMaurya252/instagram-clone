import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";

const FollowersPage = () => {
  const { userProfile, user } = useSelector((store) => store.auth);
  const params = useParams();
  const currentUserId = params.id;
  const [userFollowing, setUserFollowing] = useState(user?.following);
  const [followers, setFollowers] = useState(null);
  const dispatch = useDispatch();

  const allFollowers = async () => {
    try {
      const res = await axios.get(
        `https://instagram-clone-awa2.onrender.com/api/v1/user/allfollowers/${currentUserId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setFollowers(res?.data.userFollowers);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const unfollowHandler = async (userId) => {
    try {
      const res = await axios.post(
        `https://instagram-clone-awa2.onrender.com/api/v1/user/followorunfollow/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        let updatedFollowing = [];
        if (userFollowing) {
          updatedFollowing = userFollowing?.includes(userId)
            ? userFollowing.filter((item) => item !== userId)
            : [...userFollowing, userId];
        }

        setUserFollowing(updatedFollowing);
        dispatch(setAuthUser({ ...user, following: updatedFollowing }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    allFollowers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="py-5 px-2 font-semibold text-lg">Followers</h1>
      <Table>
        <TableCaption>A list of your followers</TableCaption>
        <TableHeader>
          <TableRow className="pb-2">
            <TableHead className="w-[200px]">
              <Avatar>
                <AvatarImage src="" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableHead>
            <TableHead>Username</TableHead>

            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        {followers &&
          followers?.map((item, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage
                      src={item?.profilePicture}
                      alt="avatar"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item?.username}</TableCell>

                <TableCell className="text-right">
                  {user._id === item._id ? (
                    <button className=""> </button>
                  ) : (
                    <button
                      className="border-[2px] border-blue-400 py-1 px-3 font-semibold rounded-[5px] text-blue-400 hover:bg-blue-400 hover:text-white"
                      onClick={() => unfollowHandler(item._id)}
                    >
                      {user?.following.includes(item._id)
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
      </Table>
    </div>
  );
};

export default FollowersPage;
