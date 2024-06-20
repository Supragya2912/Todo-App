const express = require('express');
const TodoModel = require('../src/models/todoModel');

const todoRoutes = () =>{

    const router = express.Router();

    //get all todos
    router.get('/all', async (req, res) => {
        const response = await TodoModel.find({});
        res.json(response);
    });

    //add a todo
    router.post ('/addTodo', async(req,res)=>{

        const {title, description} = req.body;

        const todo = new TodoModel({
            title,
            description
        });

        const response = await todo.save();
        res.json(response);
    });

    //update a todo
    router.put('/updateTodo/:id', async(req,res)=>{

        const {id} = req.params;
        const {title, description} = req.body;  


        try{
            const updateTodo =  await TodoModel.findByIdAndUpdate(id, { title, description });
            res.json(updateTodo);
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    });

    //mark as complete
    router.post('/markCompleted/:id', async(req,res)=>{
        
        const {id} = req.params;

        try{
            const completedTodo = await TodoModel.findByIdAndUpdate(id, {completed: true});
            res.json(completedTodo);
        }catch(error){
            res.status(500).json({message: "Server Error"});
        }
    });

    //get a todo=
    router.get('/getTodo/:id', async(req,res)=>{
        const {id} = req.params;

        try{
            const todo = await TodoModel.findById(id);
            res.json(todo);
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    });

    router.post('/markIncomplete/:id', async(req,res)=>{
        const {id} = req.params;

        try{
            const incompleteTodo = await TodoModel.findByIdAndUpdate(id, {completed: false});
            res.json(incompleteTodo);
        }catch(error){
            res.status(500).json({message: "Server Error"});
        }
    });

    //delete a todo
    router.delete('/deleteTodo/:id', async(req,res)=>{
        const {id} = req.params;

        try{
            const deletedTodo = await TodoModel.findByIdAndDelete(id);
            res.json(deletedTodo);
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }

    });


    return router;
}



module.exports = todoRoutes;