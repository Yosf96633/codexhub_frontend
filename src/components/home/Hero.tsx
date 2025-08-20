"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/store/useAuth";
const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  console.log(user , isAuthenticated)
  const list = [
    "Blockchain Integration",
    "AI Bot",
    "AI-First Strategy",
    "Blockchain Integration",
    "AI Tools",
    "Web3 Solution",
    "Custom AI Development",
  ];
  return (
    <div className="min-h-screen w-full bg-black relative text-white">
      {/* Grid Background */}
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
      <div>
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-[60%] -translate-y-[10%] select-none">
          {/* Green radial background */}
          <div
            className="absolute inset-0 w-[30vw] h-[30vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #64E79E 0%, transparent 70%)",
              filter: "blur(40px)",
              zIndex: -1,
            }}
          />

          {/* Ring Image */}
          <img
            className="w-[30vw] relative"
            src="/green_ring.png"
            alt="green ring"
          />
        </div>
        <div className=" relative h-screen z-10 flex justify-center items-center gap-12">
          {/* Left side */}
          <div className=" space-y-10">
            {/* Main heading */}
            <div className="">
              <h1 className=" text-7xl font-medium text-white">
                Welcome to <span className=" text-[#64E79E]"> Code-X</span>
              </h1>
              <div className=" flex gap-10 items-center">
                <div className=" h-1 w-16 bg-white" />
                <p className=" italic text-white text-7xl font-light">
                  Built with RAG
                </p>
              </div>
            </div>
            {/* Sub heading */}
            <p className=" text-2xl">
              We help brands move faster with <br />
              smart AI solutions.
            </p>
            {/* button */}
            {isAuthenticated ? (
               <Link href={"/chat"} className="">
                <button className=" bg-[#64E79E] flex py-2 px-3 cursor-pointer items-center justify-center space-x-2 rounded-4xl">
                  <p className=" text-black text-lg font-medium">
                    Chat with your Codebase
                  </p>
                  <div className=" p-2.5 bg-white rounded-full inline-block">
                    <ArrowRight className=" text-black" />
                  </div>
                </button>
              </Link>
            ) : (
              <Link href={"/login"} className="">
                <button className=" bg-[#64E79E] flex py-2 px-3 cursor-pointer items-center justify-center space-x-2 rounded-4xl">
                  <p className=" text-black text-lg font-medium">
                    Get Started Now
                  </p>
                  <div className=" p-2.5 bg-white rounded-full inline-block">
                    <ArrowRight className=" text-black" />
                  </div>
                </button>
              </Link>
            )}
          </div>
          {/* Right side */}
          <div className=" p-5 bg-black border-2 border-[#13472A] max-w-md rounded-4xl">
            <div className="bg-[#27312c] p-4 rounded-4xl space-y-2">
              <h1 className=" text-white font-bold text-3xl">
                AI isn’t the future. It’s now.
              </h1>
              <div className=" flex flex-wrap gap-4">
                {list.map((e, i) => (
                  <div
                    className=" bg-[#2b6c47] text-white  rounded-4xl p-4 border border-[#63e199]"
                    key={i}
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
