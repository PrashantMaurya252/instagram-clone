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

const FollowingPage = () => {
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const currentUserId = params.id;
  const [userFollowing, setUserFollowing] = useState(null);
  const [followers, setFollowers] = useState(user?.followers);
  const dispatch = useDispatch();

  const allFollowers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/allfollowing/${currentUserId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUserFollowing(res?.data.userFollowing);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const unfollowHandler = async (userId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followorunfollow/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        let updatedFollowers = [];
        if (userFollowing) {
            updatedFollowers = followers?.includes(userId)
            ? followers.filter((item) => item !== userId)
            : [...followers, userId];
        }

        setFollowers(updatedFollowers);
        dispatch(setAuthUser({ ...user, followers: updatedFollowers }));
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
      <h1 className="py-5 px-2 font-semibold text-lg">Following</h1>
      <Table>
        <TableCaption>A list of user following</TableCaption>
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
        {userFollowing &&
          userFollowing?.map((item, index) => (
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
                      {followers.includes(item._id)
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

export default FollowingPage;
