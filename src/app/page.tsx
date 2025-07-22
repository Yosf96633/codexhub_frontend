import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className=" h-screen grid place-content-center">
          <Link className=" font-semibold text-xl " href={'/chat'}>Go to chat</Link>
         </div>
  );
}
