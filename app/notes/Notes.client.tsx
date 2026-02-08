'use client';
import css from './page.module.css';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import NoteModal from '../../components/no';
import { fetchNotes } from '../../lib/api';
import { FetchNotesResponse } from '../../lib/api';

type Props = {
  items: FetchNotesResponse;
};

const NotesClient = ({ items }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isSuccess } = useQuery({
    queryKey: ['note', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    initialData: items,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  const openForm = () => {
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />
        {isSuccess && data.notes.length === 0 && (
          <>
            <span> No Match found</span>
          </>
        )}
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} onPage={setPage} />
        )}

        <button className={css.button} onClick={openForm}>
          Create note +
        </button>
      </div>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={closeForm} />}
    </div>
  );
};

export default NotesClient;