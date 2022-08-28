let ul = document.querySelector('#appendHere');
let inputDescription = document.querySelector('#input1');
let form= document.querySelector('#formOne');
// let headers = { "Content-type": "application/json; charset=UTF-8" };



//when the form is submitted
form.addEventListener('submit', async e=>{
    e.preventDefault();

    console.log(inputDescription.value);
    
    //make fetch call to store info into an obj
    let newTodo = {
        description: inputDescription.value
    }

    console.log(newTodo);

    //make api call to add a new message
    let results = await fetch('/todos', {
        method: "POST",
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newTodo)
    })
    
    let toDoItem = await results.json();
    console.log(toDoItem);
    updateTodo(toDoItem);

    
    inputDescription.value = '';
  
})

const displayTodo = async () => {
    let result = await fetch('/todos');
    let toDosItem = await result.json();

    console.log(toDosItem);
    updateTodo(toDosItem);
   
}

const updateTodo = (toDoArr) => {
    let htmlBlock ="";
    // let showEdit= true;
    toDoArr.forEach(item=>{
        htmlBlock += `
        <li id='li-${item.id}'>
            <div class="row pr-3" id='default-state-${item.id}'>
                <div class="col-10" id='text-${item.id}'>

                    ${item.description}
                </div>


                <div class="col-2 text-right pr-2">

                    <button class="button btn">
                        <span>
                            <i id='${item.id}' class="fas fa-pencil-alt"></i>
                        </span>
                    </button>

                    <button class="button btn trash" id='trash-${item.id}'>
                        <span>
                            <i id='${item.id}' class="fas fa-trash"></i>
                        </span>
                    </button>

                </div>

            </div>

            <div class="row pr-3 visually-hidden" id='edit-state-${item.id}'>
                <div class="col-10">

                    ${item.description}
                </div>
            <div id="editContainer" class="input-group">
                <div class="input-group-prepend ">
                     <span class="input-group-text h-100">Todo</span>
            </div>

            <textarea name="task" id="update-${item.id}" class="form-control" aria-label="With textarea"
            placeholder="Edit a todo item...">${item.description}</textarea>
                <div class="input-group-append">
                <button class="btn btn-outline-info h-100" type="submit" id="${item.id}">Edit</button>
                </div>
                <div class="input-group-append">
                <button class="btn btn-outline-danger h-100" type="button" id="${item.id}">Cancel</button>
            </div>
        </div>

        </li>

        `
    })

    //attach to a dom element
    ul.innerHTML = htmlBlock;


    //trash button
    let trash = document.querySelectorAll('.trash')

    console.log(trash);

    trash.forEach(button =>{
        button.addEventListener('click', async e=>{
            e.preventDefault()
            console.log(e.target.id);

                //make api call to add a new message
        let results = await fetch(`/todos/${e.target.id}`, {
            method: "DELETE",
            headers: {'Content-type': 'application/json; charset=UTF-8'},
           
            })
            displayTodo()
        })
    })



    //pencil button
    let pencil = document.querySelectorAll('.fa-pencil-alt');
   
    console.log(pencil);
   

    pencil.forEach(pencilButton =>{
        pencilButton.addEventListener('click', async e=>{
            e.preventDefault();
            console.log(e);

            let toDoText = document.getElementById(`text-${e.target.id}`)
            
            let li = document.getElementById(`li-${e.target.id}`)

            let htmlBlock = `
            <div class="row pr-3 " id='edit-state-${e.target.id}'>
                  
                <div id="editContainer" class="input-group">
                    <div class="input-group-prepend ">
                        <span class="input-group-text h-100">Todo</span>
                </div>

                <textarea name="task" id="update-${e.target.id}" class="form-control" aria-label="With textarea"
                placeholder="Edit a todo item...">${toDoText.innerText}</textarea>
                    <div class="input-group-append">
                    <button class="btn btn-outline-info h-100" type="submit" id="${e.target.id}">Edit</button>
                    </div>
                    <div class="input-group-append">
                    <button class="btn btn-outline-danger h-100" type="button" id="cancel-${e.target.id}">Cancel</button>
                </div>
            </div>
            `
            
            li.innerHTML = htmlBlock;


            //edit button
            let editbutton = document.getElementById(`${e.target.id}`);
            console.log(editbutton);
            editbutton.addEventListener('click', async edit=>{

                edit.preventDefault();
                console.log(edit);

                //make api call to add a new message
                let editDOMElement= document.getElementById(`update-${e.target.id}`)
                let results = await fetch(`/todos/${e.target.id}`, {
                    method: "PUT",
                    headers: {'Content-type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify({
                        description: editDOMElement.value
                    })
                })
                    displayTodo()
            })



            //cancle button
            let cancelbutton =document.getElementById(`cancel-${e.target.id}`);
            cancelbutton.addEventListener('click', cancel=>{
                cancel.preventDefault();
                displayTodo()
            })

        })

    })
  
}

displayTodo()




