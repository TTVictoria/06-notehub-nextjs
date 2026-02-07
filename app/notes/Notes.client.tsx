"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";


export default function NotesClient() {
  const { data: notes, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;

  return (
    <div>
      <h1>Notes</h1>
      <SearchBox />
      <NoteList notes={notes} />
    </div>
  );
}
