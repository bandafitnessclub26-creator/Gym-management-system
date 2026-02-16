import { createContext, useContext, useEffect, useState } from "react";
import { Member } from "../app/types";
import { membersApi } from "../app/lib/api";



interface MembersContextType {
  members: Member[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const MembersContext = createContext<MembersContextType | null>(null);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadMembers = async () => {
    setLoading(true);
    const data = await membersApi.getAll();
    setMembers(data || []);
    setLoading(false);
    setHasLoaded(true);
  };

  useEffect(() => {
    if (!hasLoaded) {
      loadMembers();
    }
  }, [hasLoaded]);

  return (
    <MembersContext.Provider
      value={{ members, loading, refresh: loadMembers }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembersContext() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembersContext must be used inside MembersProvider");
  }
  return context;
}
