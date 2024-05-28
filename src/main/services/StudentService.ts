import { dialog } from 'electron';
import type { OpenDialogOptions } from 'electron';
import * as XLSX from 'xlsx';
import { isBetweenNineAndThirtyThree } from '../utils/app';
import type { Student } from '../types/students';

class StudentService {
  static async importStudents(): Promise<object[]> {
    try {
      const dialogOption: OpenDialogOptions = {
        filters: [{ name: 'Excel', extensions: ['xlsx', 'xls'] }],
        properties: ['openFile'],
      };
      const { canceled, filePaths } = await dialog.showOpenDialog(dialogOption);
      if (!canceled) {
        const filePath = filePaths[0];
        const workbook = XLSX.readFile(filePath);
        workbook.SheetNames.forEach((sheetName) => {
          const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          console.log(jsonData);
        });
      }

      return [];
    } catch (error) {
      return [];
    }
  }
  static printData(data: object[]): void {
    const students: Student[] = [];
    data.forEach((item, index) => {
      const student: Student = { id: 0, name: '', school: '', grade: '', section: '' };
      if (isBetweenNineAndThirtyThree(index)) {
        const values = Object.values(item);
        console.log(values);

        student.id = values[6] as number;
        student.name = values[5] as string;
        student.section = values[0] as string;
        // console.log(item);
        // Object.keys(item).forEach((key) => {
        //   console.log(key, item[key]);
        // });
      }
      if (index === 5) {
        // console.log(item);
        console.log(Object.values(item));
        console.log(Object.values(item)[0]);
        student.school = Object.values(item)[0] as string;
      }
      if (index === 2) {
        // console.log(item);
        console.log(Object.values(item));
        console.log(Object.values(item)[0]);
        student.grade = Object.values(item)[0] as string;
      }
      if (isBetweenNineAndThirtyThree(index) || index === 5 || index === 2) {
        students.push(student);
      }
    });
    console.log(students);
  }
}

export default StudentService;
