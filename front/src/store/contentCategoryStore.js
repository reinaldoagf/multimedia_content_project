import create from 'zustand';
import { get } from '../services/rest.service.ts'

const useContentCategoryStore = create((set) => ({
    contentCategories: [],
    getContentCategories: (url) => {
        get(url).then((response) => {
            set((state) => ({ contentCategories: response.data?.data ? response.data.data : [] }))
        })
    }
}));

export default useContentCategoryStore;
