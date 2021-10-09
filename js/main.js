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

{/* <div class="container j_container_principal mt-3">
    <div class="row">
        <div  class="card j_primer_post my-2">
            <img class="card-img-top col-12 p-2"
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--lSkD28fy--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1k4vkpo8vtj6vljpmtu7.jpg"
                alt="Post_image_top">
            <div class="container p-2 my-2">
                <div class="row">
                    <img class="col-2 rounded-pill" src="https://res.cloudinary.com/practicaldev/image/fetch/s--a7qicupw--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/389568/4495a4a0-202f-4c66-8cec-003bbf8dc66d.jpg" alt="avatar">
                    <div class="col-8">
                        <h5 class="card-title j_author ">

                            Suhail Shaikh
                        </h5>

                        <h6 class="card-subtitle mb-2 text-muted j_fecha">Aug 19 (1 day ago)</h6>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <h3 class="col-12">
                        <a href="index_post.html">ReactJs Roadmap🗺 for beginners - 2021</a>
                    </h3>
                    <span class="col-3 j_tags"> #react</span>
                    <span class="col-3 j_tags"> #javascript</span>
                    <span class="col-3 j_tags"> #webdev</span>
                    <span class="col-3 j_tags"> #beginners</span>


                </div>
                <div class="row j_button_section">
                    <div class="col-6">
                        <span class="reactions">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                            436 reactions
                        </span>
                        <span class="comments">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                                <path
                                    d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                            </svg>
                            18 comments
                        </span>
                    </div>
                    <div class="col-6">
                        <p class="text-end">
                            4 min read
                            <button type="button" class="btn btn-secondary">
                                Save
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}

function printPost(){


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
