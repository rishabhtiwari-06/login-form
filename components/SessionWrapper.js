"use client";
import Page from "@/app/Login/page";
import { SessionProvider } from "next-auth/react"
import React from "react"

export default function SessionWrapper({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}