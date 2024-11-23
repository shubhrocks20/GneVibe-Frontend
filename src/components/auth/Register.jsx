import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import useAuthStore from "@/store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);
  if (token) {
    return <Navigate to="/" />;
  }

  // Register Mutation using TanStack Query
  const registerMutation = useMutation({
    mutationFn: (data) => axiosInstance.post("/user/register", data),
    onSuccess: (response) => {
      const result = response.data;
      toast({
        title: "Success",
        description: result.message || "Registration successful",
        variant: "success",
      });
      setIsLogin(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Network error or server issue",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  // Login Mutation using TanStack Query
  const loginMutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.post("/user/login", {
        email: data.email,
        password: data.password,
      }),
    onSuccess: (response) => {
      const result = response.data;
      setToken(result.token);
      toast({
        title: "Success",
        description: result.message || "Login successful",
        variant: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Network error or server issue",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const onSubmit = (data) => {
    if (isLogin) {
      loginMutation.mutate(data);
    } else {
      registerMutation.mutate(data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-800 gap-10 p-4">
      <div className="text-center mb-6">
        <h1 className="text-white text-3xl font-bold mb-2">GNE VIBE</h1>
        <img
          src="./logo.jpg"
          alt="GNE VIBE Logo"
          className="mx-auto mb-4 max-w-xs rounded-lg shadow-md"
        />
        <ul className="list-none p-0 my-4 text-white text-sm leading-relaxed">
          <li className="mb-2">✨ Connect with campus peers</li>
          <li className="mb-2">📚 Access academic resources</li>
          <li className="mb-2">🎯 Stay updated with campus events</li>
          <li className="mb-2">🤝 Join student communities</li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-black p-6 rounded-lg shadow-lg w-full md:w-1/3"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <>
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
                onValueChange={(value) => {
                  setValue("acadamics.branch", value);
                }}
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Information Technology">
                    Information Technology
                  </SelectItem>
                  <SelectItem value="CSE">Computer Science</SelectItem>
                  <SelectItem value="EE">Electrical Engineering</SelectItem>
                  <SelectItem value="CE">Civil Engineering</SelectItem>
                  <SelectItem value="ECE">
                    Electronics And Communication
                  </SelectItem>
                  <SelectItem value="PE">Production Engineering</SelectItem>
                </SelectContent>
              </Select>
              {errors.acadamics?.branch && (
                <p className="text-red-500">
                  {errors.acadamics.branch.message}
                </p>
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
          </>
        )}

        <div className="mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={
            isLogin ? loginMutation.isPending : registerMutation.isPending
          }
        >
          {isLogin ? (
            loginMutation.isPending ? (
              <Loader className="h-4 animate-spin" />
            ) : (
              "Login"
            )
          ) : registerMutation.isPending ? (
            <Loader className="h-4 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>

        <div className="mt-4 text-center">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <Button type="button" onClick={() => setIsLogin(false)}>
                Click here to register
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Button type="button" onClick={() => setIsLogin(true)}>
                Click here to login
              </Button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default Register;
