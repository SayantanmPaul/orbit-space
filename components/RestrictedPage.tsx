import React from "react";
import Image from "next/image";

const RestrictedPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 items-start justify-center px-6 w-full h-fit">
        <Image
          src={"/solar-system.gif"}
          alt="Restricted"
          width={500}
          height={500}
          draggable={false}
          className="w-24 h-24 object-cover"
        />
        <div className="space-y-2">
          <h1 className=" text-2xl font-base font-semibold">
            Restricted Device Detected
          </h1>
          <p className=" text-sm font-base">
            I apologies for this unexpected behaviour, but this project is
            solely made for larger screen devices like tablets and
            laptop/desktops.
          </p>
          <p className=" text-sm font-base pt-4">
            Thank you for your understanding.
          </p>
          <p className=" text-xs font-base font-medium">
            from, Creator Orbit Space✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestrictedPage;
