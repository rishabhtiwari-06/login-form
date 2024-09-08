"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);
  return (
    <div className="flex h-72 flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-10 pb-5">Welcome Your are Logged In</h1>
      <div>
        {session && (
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>

          
        )}
      </div>
    </div>
  );
};

export default Dashboard;
