import { useState, } from 'react';
import { useDebounce } from 'use-debounce';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

export default function App() {
    const [page, setPage] = useState(1);
    const perPage = 12;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, debouncedSearch],
        queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    });
    const totalPages = data?.totalPages ?? 0;
    
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    value={search}
                    onChange={handleSearchChange}
                />
                {totalPages > 1 && (
                <Pagination
                    pageCount={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                />
                )}
                <button className={css.button}
                    onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>
            {!isLoading && !isError && data && data.notes.length > 0 && (
                    <NoteList notes={data.notes} />
            )}
            
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    )
};