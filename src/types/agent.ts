
import { Database } from "@/integrations/supabase/types";

export type AgentType = Database["public"]["Tables"]["agents"]["Row"];
export type AgentContactType = Database["public"]["Tables"]["agent_contacts"]["Row"];

export type AgentWithContacts = AgentType & {
  agent_contacts: AgentContactType[];
};
