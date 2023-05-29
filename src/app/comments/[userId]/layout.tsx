"use client"
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks";
import { fetchIntialComments } from "../../../../store/comments.slice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchIntialComments())
  },[])

  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      {children}
    </div>
  );
}
