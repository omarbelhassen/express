const express = require ("express");
const { getMaxListeners } = require("process");
const app = express ();

let users = [
    {
        name:"omar belhassen",
        email:"omarbelhassen@gmail.com",
        id : 0,
    },
{
    name:"jhon doe",
    email : "jhon@gmail.com",
    id : 1
},
];
app.use(express.json());

app.get("/users";(req , res)=> {
    res.send(users);
    
});

app.post("/add_user", (req,res)=> {
    console.log(req.body);
    const newUser = req.body ;
    newUser.id = Date.now();
    users = [...users,newUser];
    res.send ({msg:"User added with succes",users});

});
app.put("/users/:userId",(req , res)=> {
    const id =req.params.userId;
    let userToEdit = users.find((user) => user.id.toString() === id);
if (!userToEdit) {
    return res.status(404).send("User not found");
}
userToEdit = {...userToEdit,...req.body};
users= users.map((user)=>(user.id.toString() === id ?  userToEdit : user));
res.send({msg:"User edited",users});

});
app.delete("/users/:userId",(req ,res)=> {
    const id = req.params.userId;
    users = users.filter((user) => user.id.toString() !== id);
    res.send({msg:"User DELETED";users});
});

const port = 5000;
app.listen(port,()=>{
    console.log(`🚀 The JSON Server is Running on port ${port}`);
});