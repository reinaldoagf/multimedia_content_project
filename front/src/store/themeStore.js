import create from 'zustand';
import { get } from '../services/rest.service.ts'

const useThemeStore = create((set) => ({
    themes: [],
    getThemes: (url) => {
        get(url).then((response) => {
            set((state) => ({ themes: response.data?.data ? response.data.data : [] }))
        })
    }
}));

export default useThemeStore;
