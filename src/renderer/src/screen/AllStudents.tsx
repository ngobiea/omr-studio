import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { isBetweenNineAndThirtyThree } from '@renderer/utils/app';
import type { Student } from '@renderer/store/slices/studentSlice';
import { Table } from 'flowbite-react';

const getData = (data: object[]) => {
  const students: Student[] = [];
  data.forEach((item, index) => {
    const student: Student = { id: 0, name: '', school: '', grade: '', section: '' };
    if (isBetweenNineAndThirtyThree(index)) {
      const values = Object.values(item);
      student.id = values[1] as number;
      student.name = values[5] as string;
      student.section = values[0] as string;
      student.school = Object.values(data[5])[0] as string;
      student.grade = Object.values(data[2])[0] as string;
      students.push(student);
    }
  });
  return students;
};
const AllStudents: React.FC = () => {
  // const [columns, setColumns] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseExcel(file);
    }
  };

  const getExcelSheetColumnNumberByName = (
    workbook: XLSX.WorkBook,
    sheetName: string,
    colName: string
  ): string | undefined => {
    const sheet = workbook.Sheets[sheetName];
    const columnIndex = Object.keys(sheet).find((key) => {
      if (sheet[key]?.v) {
        return String(sheet[key].v).includes(colName);
      } else {
        return undefined;
      }
    });

    return columnIndex;
  };

  const parseExcel = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: 'array' });
        const studentIdColName = 'اسم الطالب';
        const studentIdColumns: string[] = [];
        let allStudents:Student[]  = [];

        workbook.SheetNames.forEach((sheetName) => {
          if (workbook.Sheets[sheetName]) {
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            // console.log(jsonData);
            const studentsData = getData(jsonData as object[]);
            console.log(studentsData);
            allStudents = [...allStudents, ...studentsData];
            const col = getExcelSheetColumnNumberByName(workbook, sheetName, studentIdColName);
            if (col) {
              studentIdColumns.push(col);
            }
          }
        });

        // setColumns(studentIdColumns);
        setStudents(allStudents);
      }
    };

    reader.onerror = (error) => {
      console.error('File reading error:', error);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div className="overflow-x-auto overflow-y-scroll h-screen">
        <Table hoverable className="w-full">
          <Table.Head>
            <Table.HeadCell className="p-4">رقم رخصة الاقامة</Table.HeadCell>
            <Table.HeadCell>اسم المدرسة</Table.HeadCell>
            <Table.HeadCell>الصف</Table.HeadCell>
            <Table.HeadCell>الفصل</Table.HeadCell>
            <Table.HeadCell>اسم الطالب</Table.HeadCell>
          </Table.Head>
          {students.map((student) => {
            return (
              <Table.Body className="divide-y" key={student.id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {student.id}
                  </Table.Cell>
                  <Table.Cell>{student.school}</Table.Cell>
                  <Table.Cell>{student.grade}</Table.Cell>
                  <Table.Cell>{student.section}</Table.Cell>
                  <Table.Cell>{student.name}</Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
        </Table>
      </div>
    </>
  );
};

export default AllStudents;
