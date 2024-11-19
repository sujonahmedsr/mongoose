import { Request, Response } from "express";
import { studentsServices } from "./studentsServices";

const createStudents = async (req: Request, res: Response) => {
    try {
        const {students: studentData} = req.body;
        // call from services 
        const result = await studentsServices.createStudentsIntoDB(studentData)

        // response 
        res.status(200).json({
            success: true,
            message: 'student user created successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'student not created an error occurd',
            data: error
        })
    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await studentsServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: 'students are retrive successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'an error occurd',
            data: error
        })
    }
}
const getSingleStudents = async (req: Request, res: Response) => {
    try {
        const {studentId} = req.params
        const result = await studentsServices.getSingleStudentsFromDb(studentId)
        res.status(200).json({
            success: true,
            message: 'student is retrive successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'an error occurd',
            data: error
        })
    }
}


const deleteAStudent = async (req: Request, res: Response) => {
    try {
        const {studentId} = req.params
        const result = await studentsServices.deleteSingleStudentsFromDb(studentId)
        res.status(200).json({
            success: true,
            message: 'student is deleted successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'an error occurd',
            data: error
        })
    }
}





export const studentsControllers = {
    createStudents,
    getAllStudents,
    getSingleStudents,
    deleteAStudent
}