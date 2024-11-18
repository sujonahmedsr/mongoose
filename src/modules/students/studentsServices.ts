import { Student } from "./studentsInterface";
import { StudentModel } from "./studentsSchema";

const createStudentsIntoDB = async (student: Student) => {
   const result =  await StudentModel.create(student);
   return result
}

const getAllStudentsFromDb = async () => {
    const result = await StudentModel.find()
    return result
}
const getSingleStudentsFromDb = async (id: string) => {
    const result = await StudentModel.findOne({ id })
    return result
}

export const studentsServices = {
    createStudentsIntoDB,
    getAllStudentsFromDb,
    getSingleStudentsFromDb
}