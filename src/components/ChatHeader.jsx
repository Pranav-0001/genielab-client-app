import { RotateCw, X } from "lucide-react";
import React from "react";

export default function ChatHeader() {
  return (
    <div className="px-2 md:px-8 bg-blue-50 md:h-16 h-12 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src="https://static-00.iconduck.com/assets.00/user-avatar-robot-icon-2048x2048-ehqvhi4d.png"
          alt=""
          className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow"
        />
        <div>
          <h1 className="font-semibold text-l">My Bot</h1>
          <p className="text-xs text-gray-600">
            <span className="h-1 w-1 bg-black"></span>Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="cursor-pointer ">
          <RotateCw />
        </button>
        <button className="cursor-pointer ">
          <X />
        </button>
      </div>
    </div>
  );
}
