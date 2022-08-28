
const express = require('express');
const app = express();

const db = require('./models/index');

const port = 3000;
app.use(express.static('public'));

app.set('view engine', 'ejs');

//scrape from header for our post
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
app.use(require('./routes/index'));

// const createTodos = async () => {
    
// }

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})