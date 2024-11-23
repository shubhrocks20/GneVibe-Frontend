import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Handshake, Menu, Users, UserPlus, Users2 } from "lucide-react";
import { FaUser } from "react-icons/fa";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  acceptConnectionRequest,
  getConnectionsList,
  getUsersList,
  receivedConnectionRequest,
  sendConnectionRequest,
} from "@/http/route";

const MemberCard = ({
  member,
  onConnect,
  isConnected,
  onAccept,
  showActions = true,
  isPending = false,
  navigate,
}) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 max-w-xs mx-auto">
    <div className="flex items-center mb-4">
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="rounded-full w-16 h-16 border-4 border-purple-600 mr-3 object-cover"
      />
      <h3 className="text-xl font-bold text-white">{member.name}</h3>
    </div>
    <p className="text-gray-300 mb-2">{member.email}</p>
    <p className="text-gray-400 italic mb-4">
      Branch: {member.acadamics.branch}
    </p>
    <div className="flex flex-col space-y-2">
      {showActions && (
        <>
          <Button
            variant="default"
            className="w-full"
            onClick={() => navigate(`/profile/${member._id}`)}
          >
            <FaUser className="mr-2" /> View Profile
          </Button>
          {isPending ? (
            <>
              <Button
                variant="default"
                className="w-full"
                onClick={() => onAccept(member._id)}
              >
                <Handshake className="mr-2" /> Accept Request
              </Button>
              <Button variant="destructive" className="w-full">
                <Handshake className="mr-2" /> Reject Request
              </Button>
            </>
          ) : (
            !isConnected && (
              <Button
                variant={isConnected ? "secondary" : "default"}
                className="w-full"
                onClick={() => onConnect(member._id)}
                disabled={isConnected}
              >
                <Handshake className="mr-2" />
                {isConnected ? "Connected" : "Send Connection"}
              </Button>
            )
          )}
        </>
      )}
    </div>
  </div>
);

const Members = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState("all-members");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getUsersList,
    queryKey: ["users-list"],
  });

  const { data: myConnections } = useQuery({
    queryKey: ["my-connections"],
    queryFn: getConnectionsList,
  });

  const { data: pendingConnections } = useQuery({
    queryFn: receivedConnectionRequest,
    queryKey: ["pending-request"],
  });

  const members = userData?.users;
  const myConnectionIds =
    myConnections?.connections?.map((connection) => connection.id) || [];
  const receivedRequests = pendingConnections?.pendingConnections;

  const connectionSendMutation = useMutation({
    mutationFn: sendConnectionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-connections"] });
      queryClient.invalidateQueries({ queryKey: ["pending-request"] });
    },
  });

  const connectionAcceptMutation = useMutation({
    mutationFn: acceptConnectionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-connections"] });
      queryClient.invalidateQueries({ queryKey: ["pending-request"] });
    },
  });

  const handleSendConnection = (userId) => {
    if (myConnectionIds?.includes(userId)) return;
    connectionSendMutation.mutate(userId);
  };

  const handleConnectionAccept = (userId) => {
    connectionAcceptMutation.mutate(userId);
  };

  if (isLoading)
    return <div className="text-white text-center">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );

  const sections = {
    "all-members": {
      title: "All Members",
      icon: Users,
      content: members?.map((member) => (
        <MemberCard
          key={member._id}
          member={member}
          onConnect={handleSendConnection}
          isConnected={myConnectionIds.includes(member._id)}
          navigate={navigate}
        />
      )),
    },
    "pending-requests": {
      title: "Pending Requests",
      icon: UserPlus,
      content: receivedRequests?.map((request) => {
        const member = members.find((m) => m._id === request.id);
        return member ? (
          <MemberCard
            key={member._id}
            member={member}
            onAccept={handleConnectionAccept}
            isPending={true}
          />
        ) : null;
      }),
    },
    "my-connections": {
      title: "My Connections",
      icon: Users2,
      content: myConnections?.connections?.map((connection) => {
        const member = members.find((m) => m._id === connection.id);
        return member ? (
          <MemberCard key={member._id} member={member} showActions={false} />
        ) : null;
      }),
    },
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Meet Our Members</h1>
          <p className="text-xl mb-8">Connect with our vibrant community</p>
        </div>
      </header>

      <section className="px-4 sm:px-10 bg-gray-900 min-h-screen">
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-white">
              {sections[activeSection].title}
            </h2>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Navigation</DrawerTitle>
                  <DrawerDescription>
                    Choose a section to view
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-2">
                  {Object.entries(sections).map(([key, section]) => (
                    <Button
                      key={key}
                      variant={activeSection === key ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveSection(key);
                        setIsDrawerOpen(false);
                      }}
                    >
                      <section.icon className="mr-2 h-5 w-5" />
                      {section.title}
                    </Button>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections[activeSection].content}
          </div>
        </div>
      </section>
    </>
  );
};

export default Members;
