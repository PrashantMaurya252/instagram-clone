import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";

const ChatPage = () => {
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const isOnline = false;
  const dispatch = useDispatch();

  return (
    <div className="flex ml-[16%] h-screen">
      <section>
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers.map((suggestedUser) => {
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                key={suggestedUser?.id}
                className="flex gap-3 item-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <Avatar>
                  <AvatarImage
                    src={suggestedUser?.profilePicture}
                    alt="image"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-grey-300 sticky top-0">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span>{selectedUser?.username}</span>
            </div>
          </div>
        </section>
      ) : (
        <span>Hello</span>
      )}
    </div>
  );
};

export default ChatPage;
