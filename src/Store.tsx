import { create } from "zustand";

interface GalleryState {
  selectedGadget: string | null;
  primaryColor: string;
  canvasUrl: string | null;

  setSelectedGadget: (id: string) => void;
  clearSelectedGadget: () => void;

  setPrimaryColor: (color: string) => void;

  setCanvasUrl: (canvas: string) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  selectedGadget: null,
  primaryColor: "#fa5252",
  canvasUrl: null,

  setSelectedGadget: (id: string) =>
    set(() => ({
      selectedGadget: id,
    })),

  clearSelectedGadget: () => set(() => ({ selectedGadget: null })),

  setPrimaryColor: (color: string) =>
    set(() => ({
      primaryColor: color,
    })),

  setCanvasUrl: (canvas: string) =>
    set(() => ({
      canvasUrl: canvas,
    })),
}));
