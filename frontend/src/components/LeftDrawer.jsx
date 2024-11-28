import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import CreatePost from "./CreatePost"

const LeftDrawer = ({authuser,sidebarItems,likeNotification,open,setOpen,sidebarHandler,sheetOpen,setSheetOpen}) => {

    
  return (
    <div>
        <Sheet key={"left"} open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">
                <Avatar>
                    <AvatarImage src="" alt="avatar"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[300px]">
            <SheetHeader className="flex justify-start items-center my-3 border-b-[1px] border-gray-400 text-left ">
              <SheetTitle className="text-left flex justify-start items-center text-xl pb-2">{authuser?.username}</SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
            </SheetHeader>
            {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div> */}
            {sidebarItems?.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 "
              >
                {item.icon}
                <span className="font-semibold">{item.text}</span>
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
                   <CreatePost open={open} setOpen={setOpen} />
              </div>
              
            );
          })}
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default LeftDrawer