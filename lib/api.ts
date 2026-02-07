import axios from "axios";

const API_URL = "https://nextjs.org/docs/messages/module-not-found";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async () => {
  const { data } = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};
