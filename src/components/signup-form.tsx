"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

// Zod validation schema
const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/v1/users/sign-up", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Account created successfully!", {
        description: "Welcome! You can now sign in to your account.",
      });

      setTimeout(() => {
        setIsLoading(false);
        router.push("/login");
      }, 1000);

      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Unexpected error", {
        description: "Something went wrong. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black relative text-white">
      {/* Grid Background - Same as Hero */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #242424 1px, transparent 1px),
            linear-gradient(to bottom, #242424 1px, transparent 1px)
          `,
          backgroundSize: "200px 200px",
        }}
      />
   
      {/* Green Ring Image - Top Right */}
      <div className="absolute z-20 top-10 right-10 select-none">
        {/* Green radial background */}
        <div
          className="absolute inset-0 w-[20vw] h-[20vw] rounded-full"
          style={{
            background: "radial-gradient(circle, #64E79E 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: -1,
          }}
        />
        {/* Ring Image */}
        <img
          className="w-[20vw] relative"
          src="/green_ring.png"
          alt="green ring"
        />
      </div>

      <div className="relative h-screen z-10 flex justify-center items-center">
        
        <div className={cn("flex flex-col gap-6 w-full max-w-md mx-4", className)} {...props}>
          
          {/* Signup Card - Styled like Hero's right panel */}
          <Card className="p-5 bg-black border-2 border-[#13472A] rounded-4xl">
            <div className="bg-[#27312c] p-6 rounded-4xl space-y-6">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-white font-bold text-3xl text-center">
                  Create your account
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Enter your details below to create your account
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      {...register("username")}
                      className={cn(
                        "bg-[#2b6c47] border border-[#63e199] text-white placeholder:text-gray-300",
                        "focus:border-[#64E79E] focus:ring-[#64E79E]",
                        errors.username && "border-red-500"
                      )}
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username.message}</p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={cn(
                        "bg-[#2b6c47] border border-[#63e199] text-white placeholder:text-gray-300",
                        "focus:border-[#64E79E] focus:ring-[#64E79E]",
                        errors.email && "border-red-500"
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...register("password")}
                        className={cn(
                          "bg-[#2b6c47] border border-[#63e199] text-white placeholder:text-gray-300 pr-10",
                          "focus:border-[#64E79E] focus:ring-[#64E79E]",
                          errors.password && "border-red-500"
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-300" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-300" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#64E79E] hover:bg-[#52c285] text-black flex justify-center items-center space-x-2 py-2 px-3 rounded-4xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        <p>Creating account</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-medium">Sign up</p>
                      
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4 text-[#64E79E]">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}