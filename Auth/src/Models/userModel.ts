//WHEN INVOLVING TS WITH MONGOOSE THER ARE 2 BIGGER ISSUES DEVELOPER FACE


// 1)mongoose constructor can take anything in it without even checking sahi property jarhi hai ya nahi. Example scehma may 2 cheezen hen
// email(String) and password(String) lekin ager ts aap involve ba karo tou aap email ki jaga em bhi likhe den
// tab bhi its totally fine for mongoose same goes for password.Ager str type password may aap str ki jaga 4545 bhi kardo
// tab bhi totally fine hai

//2)when getting a document from User db, you will get extra properties as well like currentTime
//  or updateTime


import mongoose from 'mongoose';

//Inteface that descirbe the properties that are required to create new User
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describe the properties that a user model "User" has

interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

User.build({ email: 'asd', password: 'pass' });

//THE REASON WHY IM COMMENTING THIS FUCNTION, WE USE USERSCHEMA.STATICS METHOD TO INCLUDE BUILDFUNCTION IN USER CLASS
//NOW WE CAN USE THIS LIKE USER.BUILD({email:'email', password:'password'})

//in order to create new user use this function instaed of "new User"
//doing this below trick just to involve ts in this user creating process

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };




// buildUser({email : 'email', password:"pass" }) 
export { User };
