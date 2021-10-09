function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("mySidebar").style.overflow="show";
    // document.getElementById("main-sidebar").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = 0
    // document.getElementById("mySidebar").style.overflow="hidden";
    // document.getElementById("mySidebar").style.marginLeft= 0;
    // document.getElementById("main-sidebar").style.marginLeft= 0;
}


// $("createPost").click(()=>launchModal())
// https://proyecto-devto-default-rtdb.firebaseio.com/
let newObject={
    coments:"18",
    cover_image:"https://images.party-city.es/images/link/19_BALL1154ar_097_L2.jpg",
    data_created:"02-11-2021",
    hashtags:[
        "javascript",
        "css"
    ],
    likes:5,
    post_text:"algo mas deberia ir aqui",
    title:"El uso del html en el bootcamp",
    usuario:{
        img:"https://3.bp.blogspot.com/-JfL1o7oSnKI/VmodObHF9cI/AAAAAAAABLY/nKKRXw0-yiU/s1600/homero_456_336.jpg",
        name:"Bart",
        user_id:"Bart.Github"
    }
}


function getData(){
    let postObject
    $.ajax({
        method:"GET",
        url:"https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts.json",
        success:response=>{
            postObject=response
        },
        error:error=>{
            console.log(error)
        },
        async:false
    })
    console.log(postObject)
    return postObject
}

function createPost(postObject){
    let resp

    $.ajax({
        method:"POST",
        url:"https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts.json",
        data:JSON.stringify(postObject),
        success:(response)=>{
            resp=response
            console.log(response)
        },
        error:(error)=>{
            console.log(error)
        },
        async:false
    })
    return resp
}

function updatePost(idPost,objectPost){
    $.ajax({
        method:"PATCH",
        url:`https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts/${idPost}.json`,
        data:JSON.stringify(objectPost),
        success:(response)=>{
            console.log(response)
        },
        error:(error)=>{
            console.log(error)
        },
        async:false
    })
}

function deletePost(idPost){
    $.ajax({
        method:"DELETE",
        url:`https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts/${idPost}.json`,
        data:idPost,
        success:(response)=>{
            // console.log("El registro fue eliminado correctamente")
            console.log(response)
            
        },
        error:(error)=>{
            console.log(error)
        },
        async:false
    })
}

// // console.log(newObject)
// createPost(newObject)

/*
function convertArray(personObject){
    let arrayPerson=[]
    for (const key in personObject) {
        let personData = personObject[key]
        personData = { ...personData, id:key}
        arrayPerson = [...arrayPerson, personData]
    }
    return arrayPerson
}




function deletePerson(keyProduct){
    $.ajax({
        method:"DELETE",
        url:`https://api-13va-default-rtdb.firebaseio.com/kraken/mentors/${keyProduct}.json`,
        data:keyProduct,
        success:(response)=>{
            console.log("El registro fue eliminado correctamente")
            printCard()
        },
        error:(error)=>{
            console.log(error)
        },
        async:false
    })
}

function validar(){
    let objectData={name:"",phone:"",github:"",urlGithub:"",}
    $(".form-group .register").each(function(index){
        if (this.value){
            objectData[this.name]=this.value
            this.value=""
        }
        else{
            alert(`Todos los campos son requeridos`)
            objectData={}
        }
    })
    return objectData
}

function createNode(typeElement, text){
    let node = document.createElement(typeElement)
    node.textContent = text
    return node
}

function launchModal(data){
    let {name,phone,github,urlGithub,id}=data
    let inputsComplete=$(".form-group .modalPerson")
    
    inputsComplete.each(function(index){
        switch(this.name){
        case "id":
            this.value=id    
            break;
        case "name":
            this.value=name
            break;
        case "phone":
            this.value=phone
            break;
        case "github":
            this.value=github
            break;
        case "urlGithub":
            this.value=urlGithub
            break;
        }
    })
    
}

function printCard(){
    let data=getData(),cont=0
    
    let tBody = document.getElementById("list-names")
        
    while (tBody.lastElementChild){
        tBody.removeChild(tBody.lastElementChild)
    }

    data.forEach(person=>{
        // console.log(person)
        let {name,id,github,urlGithub,phone}=person

        
        let divContainer = document.createElement("div")
        divContainer.classList.add("card","m-2")

        let divRow = document.createElement("div")
        divRow.classList.add("card-body","d-flex","flex-column", "align-items-center",)

        let h5Name = createNode("h5", name)
        h5Name.classList.add("card-title")

        let h6Phone = createNode("h6", phone)
        h6Phone.classList.add("card-subtitle", "mb-2")
        
        let h6Github = createNode("h6", github)
        h6Github.classList.add("card-subtitle", "mb-2")

        let pUrlGithub = createNode("p", urlGithub)
        pUrlGithub.classList.add("card-text")

        let divButtons = document.createElement("div")
        divButtons.classList.add("d-flex","w-100", "justify-content-around")

        let buttonEdit = createNode("a", "Editar")
        buttonEdit.classList.add("btn", "btn-warning")
        buttonEdit.role="button"
        buttonEdit.setAttribute("data-bs-toggle","modal")
        buttonEdit.setAttribute("data-bs-target","#exampleModal")
        buttonEdit.onclick = () => launchModal(person)
        
        let buttonDelete = createNode("a", "Eliminar")
        buttonDelete.classList.add("btn", "btn-danger")
        buttonDelete.onclick = () => deletePerson(id)

        divButtons.appendChild(buttonEdit)
        divButtons.appendChild(buttonDelete)
        divRow.appendChild(h5Name)
        divRow.appendChild(h6Phone)
        divRow.appendChild(h6Github)
        divRow.appendChild(pUrlGithub)
        divRow.appendChild(divButtons)
        
        divContainer.appendChild(divRow)
        tBody.appendChild(divContainer)
        cont++
    })
}

function preUpdate(){
    let objectPerson={name:"",phone:"",github:"",urlGithub:""}
    let inputs=$(".form-group .modalPerson")
    let id=""
    inputs.each(function(index){
        switch(this.name){
        case "id":
            id=this.value
            break;
        case "name":
            objectPerson.name=this.value
            break;
        case "phone":
            objectPerson.phone=this.value
            break;
        case "github":
            objectPerson.github=this.value
            break;
        case "urlGithub":
            objectPerson.urlGithub=this.value
            break;
        }
    })
    updatePerson(id,objectPerson)
    printCard()
    $("#exampleModal").modal("hide")
}

$("#btnAgregar").click(()=>{
    let data=validar()
    data?createPerson(data):console.log("datos erroneos")
})

$("#updateData").click(()=>preUpdate())

printCard()
*/
getData()
