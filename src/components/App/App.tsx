import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';

export default function App() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const perPage = 12;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
                <SearchBox
                    value={search}
                    onChange={setSearch}
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
            <NoteList
                page={page}
                perPage={perPage}
                search={debouncedSearch}
                onTotalPages={setTotalPages}
            />
            
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    )
};