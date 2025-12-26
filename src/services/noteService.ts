import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

type FetchNotesParams = {
    page: number;
    perPage: number;
    search?: string;
}

type FetchNotesResponse = {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
    const res = await axios.get<FetchNotesResponse>('/notes', {params});
    return res.data;
};

type CreateNoteData = {
    title: string;
    content: string;
    tag: string;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
    const res = await axios.post<Note>('/notes', noteData);
    return res.data;
};

export const deleteNote = async(id: string):Promise<Note>=> {
    const res = await axios.delete<Note>(`/notes/${id}`);
    return res.data;
}