import { model, Schema } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./studentsInterface";
import bcrypt from 'bcrypt'
import validator from "validator";


// create schema 


const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid'
    }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
})
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Gurdian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Gurdian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Gurdian contact no is required'],
  },
  address: {
    type: String,
    required: [true, 'Gurdian address is required'],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'Id is already exist'], unique: true },
  password: { type: String, required: [true, 'Password is required'], maxlength: [12, 'Password can not be more than 12'] },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum:
    {
      values: ['male', 'female', 'other'],
      message: `{VALUE} is not valid. You can use 'male', 'female' or 'other'`
    },
    required: [true, 'Gender is required']
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required'], unique: true, validate: {
    validator: (value: string) => validator.isEmail(value),
    message: '{VALUE} is not valid'
  } },
  contactNo: { type: String, required: [true, 'Contact no is required'], validate: {
    validator: (value: string) => validator.isMobilePhone(value),
    message: '{VALUE} is not valid'
  } },
  emergencyContactNo: { type: String, required: [true, 'Emergency contact no is required'] },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required']
  },
  presentAddress: { type: String, required: [true, 'Address is required'] },
  permanentAddres: { type: String, required: [true, 'Address is required'] },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian is required']
  },
  localGuardian: {
    type: localGuradianSchema,
    required: [true, 'localGuardian is required']
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
    },
    default: 'active'
  },
  isDeleted: {type: Boolean, default: true}
},{
  toJSON: {
    virtuals: true
  }
});


// mongoose virtual 
studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})


// for password hidden from database with bcrypt package

const hasingSalt = process.env.HASING

studentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(hasingSalt))
  next()
})

studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})

studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next()
})




//   create model 

export const StudentModel = model<Student>('Student', studentSchema);