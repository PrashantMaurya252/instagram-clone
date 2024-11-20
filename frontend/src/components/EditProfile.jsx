import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useRef } from "react";
import { Textarea } from "./ui/textarea";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const imageRef = useRef()
  
  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" alt="avatar-image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600 ">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <input ref={imageRef} type="file" className="hidden"/>
          <Button onClick={()=>imageRef?.current.click()} className="bg-[#0095F6] h-8 rounded-lg hover:bg-[#318bc7]">Change photo</Button>
        </div>
        <div>
            <h1>Bio</h1>
            <Textarea/>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
