import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const EditProfileDialog = ({ isOpen, onClose, userProfile, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userProfile,
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("branch", data.acadamics.branch);
    formData.append("urn", data.acadamics.urn);
    formData.append(
      "yearOfAdmission",
      data.acadamics.yearOfAdmission
    );
    if(data.image && data.image.length > 0) formData.append('image', data.image[0])
    onUpdate(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label>Profile Image</Label>
            <Input type="file" accept="image/*" {...register("image")} />
          </div>
          <div className="mb-4">
            <Label>Name</Label>
            <Input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label>Branch</Label>
            <Select
              {...register("acadamics.branch", {
                required: "Branch is required",
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">Computer Science</SelectItem>
                <SelectItem value="ME">Information Technology</SelectItem>
                <SelectItem value="EE">Electrical Engineering</SelectItem>
                <SelectItem value="CE">Civil Engineering</SelectItem>
                <SelectItem value="ECE">
                  Electronics And Communication
                </SelectItem>
                <SelectItem value="PE">Production Engineering</SelectItem>
              </SelectContent>
            </Select>
            {errors.acadamics?.branch && (
              <p className="text-red-500">{errors.acadamics.branch.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label>URN</Label>
            <Input
              type="text"
              {...register("acadamics.urn", { required: "URN is required" })}
              className={errors.acadamics?.urn ? "border-red-500" : ""}
            />
            {errors.acadamics?.urn && (
              <p className="text-red-500">{errors.acadamics.urn.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label>Year of Admission</Label>
            <Input
              type="number"
              {...register("acadamics.yearOfAdmission", {
                required: "Year of Admission is required",
                min: {
                  value: 2000,
                  message: "Year must be 2000 or later",
                },
              })}
              className={
                errors.acadamics?.yearOfAdmission ? "border-red-500" : ""
              }
            />
            {errors.acadamics?.yearOfAdmission && (
              <p className="text-red-500">
                {errors.acadamics.yearOfAdmission.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
