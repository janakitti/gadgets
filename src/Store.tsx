import { create } from "zustand";
import { LibraryEntry } from "./GadgetLibrary";

interface GalleryState {
  selectedGadget: LibraryEntry | null;
  primaryColor: string;
  canvasUrl: string | null;

  setSelectedGadget: (gadget: LibraryEntry) => void;
  clearSelectedGadget: () => void;

  setPrimaryColor: (color: string) => void;

  setCanvasUrl: (canvas: string) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  selectedGadget: null,
  primaryColor: "#fa5252",
  canvasUrl: null,

  setSelectedGadget: (gadget: LibraryEntry) =>
    set(() => ({
      selectedGadget: gadget,
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
