import React, { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditProfileDialog from "../profile/EditProfileDialog";
import ProfileHeader from "../profile/ProfileHeader";
import AcademicDetails from "../profile/Academics";
import { fetchUserDetails, updateUserDetails } from "@/http/route";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Using useQuery to fetch user data
  const {
    data: userProfile,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
  });
  const updateProfileMutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      toast({
        title: "Profile Updated",
        description:
          data.message || "Your profile has been updated successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      setDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while updating the profile.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const handleEdit = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpdateProfile = (updatedProfile) => {
    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <ProfileHeader userProfile={userProfile} onEdit={handleEdit} />
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
      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        userProfile={userProfile}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
