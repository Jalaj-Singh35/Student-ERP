const mongoose=require("mongoose");
const initData=require("./data.js");
// const Teacher=require("../models/listing.js");
const Subject=require("../model/subject.js");


main().then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/erpDatabase');
}

const initDB=async ()=>{
    await Subject.deleteMany({});
    initData.data=initData.data.map(obj=>({...obj,teachers:'66a53edb8083c46a9d514797'})) ;
    await Subject.insertMany(initData.data);
    console.log("data was initialized");
}


// User.find({}).then((res)=>{
//     console.log(res);
// })

initDB();



// Subject.findById('66a603ff130e6809cd42fece').populate("teachers").then((res)=>{
//     console.log(res);
// })