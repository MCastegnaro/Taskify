import Logo from "@/public/images/embraer.png";
import { Avatar } from "flowbite-react";
import Image from "next/image";

interface HeaderProps {
  showOptions: boolean;
}

export default function Header({ showOptions = true }: HeaderProps) {
  return (
    <div className="bg-dark-blue flex-col p-6 shadow-sm">
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="flex items-center justify-start gap-16">
          <Image alt="Logo of Embraer" src={Logo} />
        </div>
        {showOptions && (
          <Avatar
            className="flex self-center"
            rounded
            placeholderInitials="MC"
          />
        )}
      </div>
    </div>
  );
}
