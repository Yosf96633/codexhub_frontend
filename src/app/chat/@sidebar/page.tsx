import Link from "next/link";
import React from "react";

const page = () => {
  const users = [
    "Ali",
    "Yousaf",
    "Ehsan",
    "Moiz",
    "Daniyal",
    "Sahil",
    "Hamza",
    "Usman",
    "Ahmed",
    "Bilal",
    "Kashif",
    "Saad",
    "Ayan",
    "Zayan",
    "Hassan",
    "Zeeshan",
    "Imran",
    "Owais",
    "Fahad",
    "Rehan",
    "Shahzaib",
    "Talha",
    "Junaid",
    "Taha",
    "Faizan",
    "Asad",
    "Noman",
    "Sameer",
    "Arham",
    "Rayan",
  ];

  return (
    <div className=" max-h-screen overflow-auto max-w-md  p-2">
      {users.map((_, i) => (
        <Link href={`/chat/${_}`}>
          <div
            className=" bg-gray-400 font-semibold text-black text-center mb-2 rounded-lg px-6 py-2"
            key={i}
          >
            {_}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
