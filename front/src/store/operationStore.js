import create from 'zustand';

const useOperationStore = create((set) => ({
    operation: null,
    element: null,
    setElement: (element) => set({ element }),
    setOperation: (operation) => set({ operation }),
}));

export default useOperationStore;
