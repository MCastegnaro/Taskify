"use client";

import { useAuth } from "@/app/hooks/useAuthContext";
import Logo from "@/public/images/embraer.png";
import { Avatar, Dropdown } from "flowbite-react";
import Image from "next/image";

interface HeaderProps {
  showOptions: boolean;
}

export default function Header({ showOptions = true }: HeaderProps) {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-dark-blue flex-col p-6 shadow-sm">
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="flex items-center justify-start gap-16">
          <Image alt="Logo of Embraer" src={Logo} />
        </div>
        {showOptions && user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                placeholderInitials={getInitials(user.username)}
                className="cursor-pointer"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
