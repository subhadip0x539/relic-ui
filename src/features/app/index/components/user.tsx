import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { useUserStore } from "@/store/user.slice";
import { LogOut } from "lucide-react";

export function User() {
  const { me } = useUserStore();
  const { logout } = useAuth();

  const fname = me.fname;
  const lname = me.lname;
  const username = me.username;
  const fullname = `${fname} ${lname}`.trim() ?? username;
  const initials = `${fname[0]}${lname[0]}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={me.avatar} alt={`${me.fname} ${me.lname}`} />
          <AvatarFallback className="rounded-full">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={15}
        className="min-w-52 rounded-sm p-2"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={me.avatar} alt={`${me.fname} ${me.lname}`} />
              <AvatarFallback className="rounded-full">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-px">
              <div className="text-xs">{fullname}</div>
              <div className="text-xs text-muted-foreground">{username}</div>
            </div>
          </div>
          <Button
            onClick={() => logout()}
            className="rounded-sm w-full"
            variant="destructive"
          >
            <LogOut />
            Log out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
