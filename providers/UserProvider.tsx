"use client";

import { useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { getDetails } from "@/app/actions/dashboard/get-details.action";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);

      const res = await getDetails();

      if (res?.responseCode === "000") {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
