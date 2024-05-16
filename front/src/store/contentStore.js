import create from 'zustand';
import { get } from '../services/rest.service.ts'

const useContentStore = create((set) => ({
    content: [],
    getContent: (url) => {
        get(url).then((response) => {
            set((state) => ({ content: response.data?.data ? response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [] }))
        })
    }
}));

export default useContentStore;
