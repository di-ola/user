const Joi= require ('joi');
const express= require('express');
const app= express();

app.use(express.json());

const users =[
    { id: 1, name: 'first_name'},
    { id: 2, name: 'last_name'},
    { id: 3, name:'email'},
]

app.get('/api/users', (req,res)=>{
    res.send(users);
});

app.post('/api/users', (req, res)=>{
    const {error} = validateUser(req.body);
   
if(error)return res.status(400).send(result.error.details[0].message);
    
   
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user); 
  res.send(user);

});

app.put('/api/users/:id', (req,res)=>{
    const user =  users.find(u=> u.id ===parseInt (req.params.id));
   if(!user) return res.status(404).send('The user with the given id was not found.');
    const {error} = validateUser(req.body);
   
if(error)return res.status(400).send(result.error.details[0].message);
    
   
   user.name = req.body.name
   res.send(user);

})
app.delete('/api/users/:id', (req,res)=>{
    const user =  users.find(u=> u.id ===parseInt (req.params.id));
   if(!user)return res.status(404).send('The user with the given id was not found.');
   
   const index = users.indexOf(user);
   users.splice(index, 1);

   res.send(user);
})

app.get('/api/users/:id',(req,res)=>{
   const user =  users.find(u=> u.id ===parseInt (req.params.id));
   if(!user)return res.status(404).send('The user with the given id was not found.');
   res.send(user);

});

function validateUser(user){
    const schema= Joi.object ({
        name: Joi.string().min(3).required()
       
    });

    return schema.validate(user);
    
}



const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`listening on port ${port}...`)); 