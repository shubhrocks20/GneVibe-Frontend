// EventItem.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Import Shadcn Button
import ParticipantModal from "./ParticipationModel";
import { FaUsers, FaRegEye, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons

const EventItem = ({ event, userId, onParticipateChange }) => {
  const { name, organizer, description, image, eventDate, participants } =
    event;
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

  // Check if the current user is a participant
  const isParticipating = participants.includes(userId);

  const handleParticipateClick = (e) => {
    onParticipateChange(event._id, !isParticipating);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-4 cursor-pointer"
      onClick={() => setIsEventDetailsOpen(true)}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center mt-2">
          <img
            src={organizer.image}
            alt={organizer.name}
            className="rounded-full w-10 h-10 border-2 border-blue-500 mr-2 object-cover"
          />
          <div>
            <span className="text-gray-600">{organizer.name}</span>
            <span className="text-gray-500 text-sm block">
              {organizer.email}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-gray-500 mt-2">
          Date: {new Date(eventDate).toLocaleDateString()} at{" "}
          {new Date(eventDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-gray-500 mt-2">
          Participants:{" "}
          {participants.length > 0
            ? participants.length
            : "No participants yet"}
        </p>
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleParticipateClick}
            className={`flex items-center justify-center ${
              isParticipating ? "bg-red-500" : "bg-blue-500"
            } text-white rounded-md p-2 hover:bg-opacity-80 transition duration-200`}
          >
            {isParticipating ? (
              <FaSignOutAlt className="mr-2" />
            ) : (
              <FaSignInAlt className="mr-2" />
            )}
            {isParticipating ? "Withdraw from Event" : "Join Event"}
          </Button>
          <Button
            onClick={() => setIsParticipantModalOpen(true)}
            className="flex items-center justify-center bg-green-500 text-white rounded-md p-2 hover:bg-opacity-80 transition duration-200"
          >
            <FaUsers className="mr-2" />
            Participants Details
          </Button>
        </div>
        <ParticipantModal
          eventId={event._id}
          isOpen={isParticipantModalOpen}
          onClose={() => setIsParticipantModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default EventItem;
