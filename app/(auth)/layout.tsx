"use client";

import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      {/* Lado direito */}
      <div className="relative w-1/2 h-full">
        <Image
          src="https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg"
          fill
          alt="abajour"
          className="object-cover"
        />
      </div>

      {/* Lado esquerdo */}
      <div className="flex w-1/2 h-full items-center justify-center">
        <div className="w-full max-w-sm flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
