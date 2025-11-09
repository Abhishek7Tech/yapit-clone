import { create } from "zustand";
import AllLessons from "../utils/AllLessons";

type Lesson = {
  group: number;
  showLessons: boolean;
};

type LessonsState = {
  allLessons: Lesson[];
  toggleLessons: (index: number) => void;
};

const useLessonsStore = create<LessonsState>((set) => ({
  allLessons: AllLessons,
  toggleLessons: (index: number) =>
    set((state) => ({
      allLessons: state.allLessons.map((lesson) =>
        lesson.group === index
          ? { ...lesson, showLessons: !lesson.showLessons }
          : lesson
      ),
    })),
}));

export default useLessonsStore;