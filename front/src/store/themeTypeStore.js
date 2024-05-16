import create from 'zustand';
import { get } from '../services/rest.service.ts'

const useThemeTypeStore = create((set) => ({
    themeTypes: [],
    getThemeTypes: (url) => {
        get(url).then((response) => {
            set((state) => ({ themeTypes: response.data?.data ? response.data.data : [] }))
        })
    }
}));

export default useThemeTypeStore;