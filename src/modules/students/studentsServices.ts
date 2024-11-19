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
    // const result = await StudentModel.findOne({ id })
    const result = await StudentModel.aggregate([{$match: {id: id}}])
    return result
}
const deleteSingleStudentsFromDb = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, {isDeleted: true})
    return result
}

export const studentsServices = {
    createStudentsIntoDB,
    getAllStudentsFromDb,
    getSingleStudentsFromDb,
    deleteSingleStudentsFromDb
}