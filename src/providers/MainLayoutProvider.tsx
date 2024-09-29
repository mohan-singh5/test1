"use client";

import React from "react";
import StyledComponentsRegistry from "@/app/lib/registry";
import StoreProvier from "./StoreProvider";

export default function MainLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvier>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </StoreProvier>
  );
}
