import { create } from "zustand";

interface GalleryState {
  selectedGadget: string | null;
  primaryColor: string;

  setSelectedGadget: (id: string) => void;
  clearSelectedGadget: () => void;

  setPrimaryColor: (color: string) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  selectedGadget: null,
  primaryColor: "#f4e9ff",

  setSelectedGadget: (id: string) =>
    set(() => ({
      selectedGadget: id,
    })),

  clearSelectedGadget: () => set(() => ({ selectedGadget: null })),

  setPrimaryColor: (color: string) =>
    set(() => ({
      primaryColor: color,
    })),
}));
