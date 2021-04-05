//WHEN INVOLVING TS WITH MONGOOSE THER ARE 2 BIGGER ISSUES DEVELOPER FACE

// 1)mongoose constructor can take anything in it without even checking sahi property jarhi hai ya nahi. Example scehma may 2 cheezen hen
// email(String) and password(String) lekin ager ts aap involve ba karo tou aap email ki jaga em bhi likhe den
// tab bhi its totally fine for mongoose same goes for password.Ager str type password may aap str ki jaga 4545 bhi kardo
// tab bhi totally fine hai

//2)when getting a document from User db, you will get extra properties as well like currentTime
//  or updateTime

import mongoose from 'mongoose';


//THIS WILL SOLVE TS 1ST PROBLEM
//Inteface that descirbe the properties that are required to create new User
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describe the properties that a user model "User" has

//THIS WILL SOLVE ALSO TS 1ST PROBLEM
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}


//THIS WILL SOLVE SECOND TS PROBLEM
//An interface that describes the single user document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
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

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);



// <UserDoc, UserModel> this is what we called angle bracket sytnax. it is very generic syntax in ts
//these generic syntax is basically function or types.these are basically types being provided to
//model function as args. This means model function is going to written sth of type model

//THE REASON WHY IM COMMENTING THIS FUCNTION, WE USE USERSCHEMA.STATICS METHOD TO INCLUDE BUILDFUNCTION IN USER CLASS
//NOW WE CAN USE THIS LIKE USER.BUILD({email:'email', password:'password'})

//in order to create new user use this function instaed of "new User"
//doing this below trick just to involve ts in this user creating process

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

// buildUser({email : 'email', password:"pass" })
export { User };



// const user = User.build({ email: 'asd', password: 'pass' });
// user.email;
// user.password;
// user.updatedAt; such properties wont be allowed because of UserDoc interface

//now in order to create new user use above syntax^^^^^^