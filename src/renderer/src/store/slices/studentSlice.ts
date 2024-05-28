import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: number;
  name: string;
  section: string;
  school: string;
  grade: string;
}
export type StudentSliceState = {
  Students: Student[];
};

const initialState: StudentSliceState = {
  Students: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.Students.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<number>) => {
      state.Students = state.Students.filter((student) => student.id !== action.payload);
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
