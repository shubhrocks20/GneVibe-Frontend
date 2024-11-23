import React from "react";
import AcademicDetails from "./Academics";
import ProfileHeader from "./ProfileHeader";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "@/http/route";

const UserProfile = () => {
  const { _id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-single"],
    queryFn: () => getSingleUser(_id),
  });

  const userProfile = data?.user;
  
  
  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <ProfileHeader userProfile={userProfile} />
          <div className="flex items-center mb-4">
            <FaUser className="h-6 w-6 text-purple-500 mr-2" />
            <p className="text-xl text-white">
              Connections: {userProfile?.connections?.length}
            </p>
          </div>
          <AcademicDetails acadamics={userProfile.acadamics} />
          <div className="flex items-center mt-6">
            <FaEnvelope className="h-6 w-6 text-purple-500 mr-2" />
            <p className="text-gray-300">Email: {userProfile.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
