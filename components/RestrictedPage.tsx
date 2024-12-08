import React from "react";
import Image from "next/image";

const RestrictedPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-[#5F0F40] via-[#1b0938] to-neutral-950">
      <div className="flex flex-col gap-6 items-start justify-center px-6 w-full h-fit">
        <span className="flex gap-2">
          <p className="text-white text-2xl font-semibold font-oswald absolute top-4 left-1/2 transform -translate-x-1/2">
            Orbit Space
          </p>
        </span>
        <Image
          src={"/earth.png"}
          alt="Restricted"
          width={500}
          height={500}
          draggable={false}
          className="w-24 h-24 object-cover shadow-2xl"
        />
        <div className="space-y-2">
          <h1 className=" text-white text-2xl font-base font-semibold">
            Restricted Device Detected
          </h1>
          <p className=" text-white text-sm font-base">
            I apologies for this unexpected behaviour, but this project is
            solely made for larger screen devices like tablets and
            laptop/desktops.
          </p>
          <p className="text-white text-sm font-base pt-4">
            Thank you for your understanding.
          </p>
          <p className="text-white text-xs font-base font-medium">
            from,{" "}
            <a href="https://github.com/Sayantanmpaul" className="underline">
              Devloper
            </a>{" "}
            Orbit Space✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestrictedPage;
