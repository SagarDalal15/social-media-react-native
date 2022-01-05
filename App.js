import React from "react";
import { UserContextProvider } from "./contexts/user";

import MyNavigation from "./MyNavigation";

export default function App() {
  return (
    <UserContextProvider>
      <MyNavigation />
    </UserContextProvider>
  );
}
