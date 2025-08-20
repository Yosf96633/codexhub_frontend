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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/store/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.post(`/v1/users/login`, {
        email: data.email,
        password: data.password,
      });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      toast.success("Login successfully!");
      login({ username: result.data.data.username, email: result.data.data.email });
      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
      }, 1000);
      reset();
    } catch (error: any) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        toast.error(error.response.data.message || "Something went wrong!");
        setIsLoading(false);
      } else {
        console.error("Unexpected error:", error.message);
        toast.error("Unexpected error occurred!");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black relative text-white flex items-center justify-center">
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

      {/* Subtle Green Glow Background */}
      <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <div
          className="absolute inset-0 w-[40vw] h-[40vw] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #64E79E 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: -1,
          }}
        />
      </div>

      <div className={cn("flex flex-col gap-6 relative z-20 w-full max-w-md mx-4", className)} {...props}>
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex gap-4 items-center justify-center">
            <div className="h-[2px] w-6 bg-white" />
            <p className="italic text-white text-xl font-light">Built with <span className="text-[#64E79E] font-medium">RAG</span></p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-black border-2 border-[#13472A] shadow-2xl shadow-[#64E79E]/10">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-medium text-white text-center">
              Login to your account
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your credentials to access your AI-powered workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={cn(
                    "bg-[#27312c] border-[#13472A] text-white placeholder:text-gray-500",
                    "focus:border-[#64E79E] focus:ring-[#64E79E] focus:ring-1",
                    "h-12 rounded-lg",
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={cn(
                      "bg-[#27312c] border-[#13472A] text-white placeholder:text-gray-500",
                      "focus:border-[#64E79E] focus:ring-[#64E79E] focus:ring-1",
                      "h-12 rounded-lg pr-12",
                      errors.password && "border-red-500 focus:border-red-500"
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-[#64E79E]"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[#64E79E] hover:bg-[#52c285] text-black font-medium text-lg rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Login to Code-X</span>
                  
                  </>
                )}
              </Button>

              {/* Sign up Link */}
              <div className="text-center pt-4 border-t border-[#13472A]">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="text-[#64E79E] hover:text-[#52c285] font-medium underline underline-offset-4 transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <div className="text-center text-gray-500 text-sm">
          AI isn't the future. It's now.
        </div>
      </div>
    </div>
  );
}