import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

type Props = {
    page: number;
    perPage: number;
    search: string;
    onTotalPages: (pages: number) => void;
};

export default function NoteList({
    page,
    perPage,
    search,
    onTotalPages,
}: Props) {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes({ page, perPage, search }),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    useEffect(() => {
        if (data) {
            onTotalPages(data.totalPages);
        }
    }, [data, onTotalPages]);

    if (isLoading || isError || !data || data.notes.length === 0) {
        return null;
    }

    return (
        <ul className={css.list}>
            {data.notes.map((note: Note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button
                            className={css.button}
                            onClick={() => deleteMutation.mutate(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
