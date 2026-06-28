import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://gaiwwoqwqkmpvowadnux.supabase.co";
const supabasePublishableKey = "sb_publishable_p_F1sD9QaQwBM4h3bE4NgQ_MsrEafM5";

export const adminEmail = "supportsouliat@gmail.com";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export function isAdminUser(user) {
  return user?.email?.toLowerCase() === adminEmail;
}

export async function createPasswordAccount(email, password) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://supportsouliat.github.io/souliat/"
    }
  });
}

export async function signInWithPassword(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function getSessionUser() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

export async function signOutUser() {
  return supabase.auth.signOut();
}

export async function saveMessage(user, message) {
  return supabase.from("souliat_messages").insert({
    user_id: user.id,
    sender_email: user.email,
    sender_name: message.senderName || null,
    message_type: message.messageType,
    topic: message.topic || null,
    selected_professional: message.selectedProfessional || null,
    content: message.content,
    metadata: message.metadata || {}
  });
}

export async function loadMyMessages() {
  return supabase
    .from("souliat_messages")
    .select("id, created_at, message_type, topic, selected_professional, content, status, admin_response, responded_at")
    .order("created_at", { ascending: false });
}

export async function loadAdminMessages() {
  return supabase
    .from("souliat_messages")
    .select("id, created_at, sender_email, sender_name, message_type, topic, selected_professional, content, status, admin_response")
    .order("created_at", { ascending: false });
}

export async function answerMessage(id, response) {
  return supabase
    .from("souliat_messages")
    .update({
      admin_response: response,
      status: "answered",
      responded_at: new Date().toISOString()
    })
    .eq("id", id);
}
