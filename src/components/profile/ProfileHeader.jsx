import React from "react";
import { FaUser, FaEnvelope, FaGraduationCap, FaEdit } from "react-icons/fa";

const ProfileHeader = ({ userProfile, onEdit }) => {
  return (
    <div className="flex items-center mb-6 relative">
      <img
        src={userProfile.image}
        alt={userProfile.name}
        className="rounded-full w-32 h-32 border-4 border-purple-600 mr-4"
      />
      <div>
        <h1 className="text-3xl font-bold text-white">{userProfile.name}</h1>
        <p className="text-gray-400">{userProfile.role}</p>
        <p className="text-gray-300 mt-2">{userProfile.email}</p>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute -top-4 right-0 mt-2 mr-2 text-purple-500 hover:text-purple-400"
        >
          <FaEdit className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
