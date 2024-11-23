// ParticipantModal.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; // Import Shadcn Dialog components
import { useQuery } from "@tanstack/react-query";
import { listParticipants } from "@/http/route";

const ParticipantModal = ({ eventId, isOpen, onClose }) => {
  const {
    data: participants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => listParticipants(eventId),
    queryKey: ["event-participants"],
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error}</p>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Participants Details</DialogTitle>
          <DialogDescription>
            {participants.length > 0 ? (
              <ul>
                {participants.map((participant) => (
                  <li
                    key={participant._id}
                    className="flex items-center mt-2 border-b "
                  >
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="rounded-full w-10 h-10 border-2 border-blue-500 mr-2 object-cover"
                    />
                    <div>
                      <span className="text-gray-600">{participant.name}</span>
                      <span className="text-gray-500 text-sm block">
                        {participant.email}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        Branch: {participant.acadamics.branch}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        URN: {participant.acadamics.urn}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        Year of Admission:{" "}
                        {participant.acadamics.yearOfAdmission}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No participants yet</p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantModal;
