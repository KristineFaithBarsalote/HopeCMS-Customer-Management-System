import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const UserRightsContext = createContext({ rights: {}, userType: null });

export function UserRightsProvider({ children }) {
  const [rights, setRights] = useState({});
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) loadRights(session.user.id);
    });
  }, []);

  async function loadRights(userId) {
    const { data: userRow } = await supabase
      .from("user")
      .select("user_type")
      .eq("userId", userId)
      .single();

    if (userRow) setUserType(userRow.user_type);

    const { data: rightsRows } = await supabase
      .from("UserModule_Rights")
      .select("rights_id, right_value")
      .eq("userId", userId);

    if (rightsRows) {
      const map = {};
      rightsRows.forEach(r => { map[r.rights_id] = r.right_value; });
      setRights(map);
    }
  }

  return (
    <UserRightsContext.Provider value={{ rights, userType }}>
      {children}
    </UserRightsContext.Provider>
  );
}