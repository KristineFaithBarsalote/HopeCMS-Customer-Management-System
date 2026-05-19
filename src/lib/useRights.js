import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export function useRights() {
  const [rights, setRights] = useState({});
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch on mount
    fetchRights();

    // Re-fetch when auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchRights();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchRights() {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setRights({});
      setUserType(null);
      setLoading(false);
      return;
    }

    const { data: userRow } = await supabase
      .from("user")
      .select("user_type, record_status")
      .eq("id", user.id)
      .single();

    if (userRow) setUserType(userRow.user_type);

    const { data: userRights } = await supabase
      .from("UserModule_Rights")
      .select("rightcode, right_value")
      .eq("userid", user.id);

    if (userRights) {
      const rightsMap = {};
      userRights.forEach(r => {
        rightsMap[r.rightcode] = r.right_value;
      });
      setRights(rightsMap);
    }

    setLoading(false);
  }

  return { rights, userType, loading };
}