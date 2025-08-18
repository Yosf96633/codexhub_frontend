"use client";
import { useAuth } from "@/store/useAuth";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const Hero = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.post("/v1/users/logout");
      if (!result.data.success) {
        toast(result.data.message);
      }
      logout();
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        // backend returned 400/401/500 etc.
        console.error("Server error:", error.response.data);
        toast.error(error.response.data.message || "Something went wrong!");
        setIsLoading(false);
      } else {
        // network or unexpected error
        console.error("Unexpected error:", error.message);
        toast.error("Unexpected error occurred!");
        setIsLoading(false);
      }
    }
  };
  const { user } = useAuth();
  return (
    <div className=" h-screen grid place-content-center">
      <p className=" text-center text-6xl my-6 font-extrabold">
        Hi, {user === null ? "Guest" : user.username}
      </p>
      {user?.username && (
        <Button
          className=" flex justify-center items-center space-x-2"
          disabled={isLoading}
          onClick={handleLogout}
        >
          {isLoading &&  <Loader2 className=" animate-spin"/>}
          <p>Logout</p>
        </Button>
      )}
    </div>
  );
};
export default Hero;
