const express = require("express");
const router = express.Router();
const db = require('../models/index');

//scrape from header for our post
router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get("/", async (req, res) => {
  // let records = await db.todos.findAll();
  // let records = result.json()
  res.render('index')
});


// const createTodo = () => {
//   db.todos.create({description: "cook breakfast"})
// }
// createTodo()

// const deleteRecord = (id) => {
//   db.todos.destroy({where:{id:id}})
  
// }


//! test endpoints using thunder client before messing with frontend
// GET /todos, displays all of the todos
router.get('/todos', async (req, res) => {
  try {
  let records = await db.todos.findAll();
  console.log(records);
  res.json(records)
  } catch (error) {
    console.log(error);
  }
  
  
})

// GET /todos/:id , displays todos by id
router.get('/todos/:id', async (req, res) => {
  let id = req.params.id;
  let record = await db.todos.findByPk(id)
  res.send(record)
})

// POST /todos, creates a new todo
router.post('/todos', async (req, res) => {
  let description = req.body.description;
  console.log(req.body.description);
  let newTodo = await db.todos.create({description: `${description}`});
  let records = await db.todos.findAll();
 
  res.send(records)
})

// PUT /todos/:id, update a todo item
router.put('/todos/:id', async (req, res) => {
  let id = req.params.id;
  let updatedDescription = req.body.description;

  let updateTodo = await db.todos.update({description: updatedDescription}, {where:{id:id}});
  let records = await db.todos.findAll();
  res.json(records)
  
})

// DELETE /todos/:id, delete a todo
router.delete('/todos/:id', async (req, res) => {
  let id= req.params.id;
  let deleteTodo = await db.todos.destroy({where:{id:id}});
  res.json(deleteTodo)
  
})

module.exports = router;
