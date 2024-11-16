import React from "react";
import { Session } from "next-auth";
import Image from "next/image";
import SignInButton from "../../SignInButton";

interface props {
  session: Session | null;
}

const Profile = ({ session }: props) => {
  return (
    <div className="h-[95vh] w-[100vw] bg-sky-100">
      <div className="pt-5">
        <div className="flex justify-center ">
          <Image
            src="https://lh3.googleusercontent.com/a/ACg8ocLtmNFEzdsoD39623q2ejgyb2SkCZab6PvXkVWYYkFPQohXqJaO=s96-c"
            alt="User Profile"
            width={96}
            height={96}
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center p-5 text-3xl font-semibold">
          {session?.user.name}
        </div>
        <div className="flex justify-center">
          <SignInButton/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
