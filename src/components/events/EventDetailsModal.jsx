// EventDetailsModal.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; // Import Shadcn Dialog components

const EventDetailsModal = ({ event, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-600 mt-4">{event.description}</p>
            <div className="flex items-center mt-4">
              <img
                src={event.organizer.image}
                alt={event.organizer.name}
                className="rounded-full w-10 h-10 border-2 border-blue-500 mr-2 object-cover"
              />
              <div>
                <span className="text-gray-600 font-semibold">
                  {event.organizer.name}
                </span>
                <span className="text-gray-500 text-sm block">
                  {event.organizer.email}
                </span>
              </div>
            </div>
            <p className="text-gray-500 mt-2">
              Date: {new Date(event.eventDate).toLocaleDateString()} at{" "}
              {new Date(event.eventDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-gray-500 mt-2">
              Participants:{" "}
              {event.participants.length > 0
                ? event.participants.join(", ")
                : "No participants yet"}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
