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

// https://proyecto-devto-default-rtdb.firebaseio.com/


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

function convertArray(postObject){
    let arrayPost=[]
    for (const key in postObject) {
        let postData = postObject[key]
        postData = { ...postData, id:key}
        arrayPost = [...arrayPost, postData]
    }
    return arrayPost
}

function createNode(typeElement, text){
    let node = document.createElement(typeElement)
    node.textContent = text
    return node
}

function printPost(){
    let data=convertArray(getData()),cont=0
    
    let tBody = document.getElementById("list-posts")
        
    while (tBody.lastElementChild){
        tBody.removeChild(tBody.lastElementChild)
    }

    data.forEach(post=>{
        let {coments,id,cover_image,data_created,likes,title,usuario,hashtags}=post
        
        let divRow=document.createElement("div")
        divRow.classList.add("row")

            let divCard=document.createElement("div")
            divCard.classList.add("card", "my-2")
                if (cont==0){
                    let imgCard=document.createElement("img")
                    imgCard.classList.add("card-img-top", "col-12", "p-2")
                    imgCard.src=cover_image
                    imgCard.alt="principal_Image"
                    divCard.appendChild(imgCard)
                }
                let divUser=document.createElement("div")
                divUser.classList.add("container","p-2", "my-2")

                    let divRowUser=document.createElement("div")
                    divRowUser.classList.add("row")

                        let imgAvatar=document.createElement("img")
                        imgAvatar.classList.add("col-2", "rounded-pill")
                        imgAvatar.src=usuario.img
                        imgAvatar.alt="avatar"

                        let divUserName=document.createElement("div")
                        divUserName.classList.add("col-8")

                            let h5User=createNode("h5",usuario.name)
                            h5User.classList.add("card-title")

                            let h6Data=createNode("h6",data_created)
                            h6Data.classList.add("card-subtitle", "mb-2", "text-muted")

                        divUserName.appendChild(h5User)
                        divUserName.appendChild(h6Data)

                    divRowUser.appendChild(imgAvatar)
                    divRowUser.appendChild(divUserName)
                divUser.appendChild(divRowUser)

                let divTitle=document.createElement("div")
                divTitle.classList.add("container")

                    let divRowTitle=document.createElement("div")
                    divRowTitle.classList.add("row")

                        let h3Title=document.createElement("h3")
                        h3Title.classList.add("col-12")

                            let aTitle=createNode("a",title)
                            aTitle.href="index_post.html" /*buscar como mandar datos entre paginas*/
                            localStorage.setItem("post",JSON.stringify(post))
                        
                            h3Title.appendChild(aTitle)
                        hashtags.forEach(item=>{
                            let name=createNode("span",`#${item}`)
                            name.classList.add("col-3")
                            divRowTitle.appendChild(name)
                        })

                    divRowTitle.appendChild(h3Title)

                    let divRowReactions=document.createElement("div")
                    divRowReactions.classList.add("row")

                        let divReactions=document.createElement("div")
                        divReactions.classList.add("col-6","d-flex","flex-row","justify-content-around")

                            let spanHeart=document.createElement("span")

                                const SVG_NS = 'http://www.w3.org/2000/svg'
                                let heart=document.createElementNS(SVG_NS,"svg")
                                heart.setAttributeNS(null,"width","16")
                                heart.setAttributeNS(null,"height","16")
                                heart.setAttributeNS(null, "viewBox", "0 0 16 16")
                                heart.setAttributeNS(null,"fill","currentColor")
                                heart.classList.add("bi", "bi-heart")
                                

                                    let trazado = document.createElementNS(SVG_NS, 'path')
                                    trazado.setAttributeNS(null, "d", "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z")
                                    trazado.setAttributeNS(null,"id","trazado")
                                heart.appendChild(trazado)

                            spanHeart.appendChild(heart)
                            let pHeart=createNode("p",`${likes} likes`)
                        divReactions.appendChild(spanHeart)
                        divReactions.appendChild(pHeart)

                            let spanChat=document.createElement("span")
                            // spanChat.classList.add("col-3")

                                let chat=document.createElementNS(SVG_NS,"svg")
                                chat.setAttributeNS(null,"width","16")
                                chat.setAttributeNS(null,"height","16")
                                chat.setAttributeNS(null, "viewBox", "0 0 16 16")
                                chat.setAttributeNS(null,"fill","currentColor")
                                chat.classList.add("bi", "bi-chat-right")

                                let trazadochat = document.createElementNS(SVG_NS, 'path')
                                    trazadochat.setAttributeNS(null, "d", "M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z")
                                    trazadochat.setAttributeNS(null,"id","trazado")
                                chat.appendChild(trazadochat)

                            spanChat.appendChild(chat)
                            let pChat=createNode("p",`${coments} coments`)
                        divReactions.appendChild(spanChat)
                        divReactions.appendChild(pChat)
                        
                    divRowReactions.appendChild(divReactions)
                        let divButton=document.createElement("div")
                        divButton.classList.add("col-6", "d-flex","flex-row","justify-content-around")
                            let pButton=createNode("p","min read")
                            divButton.appendChild(pButton)

                            let buttonSave=createNode("button","Save")
                            buttonSave.classList.add("btn","btn-secondary")
                            divButton.appendChild(buttonSave)
                    divRowReactions.appendChild(divButton)
                divTitle.appendChild(divRowTitle)
                divTitle.appendChild(divRowReactions)
            
            divCard.appendChild(divUser)
            divCard.appendChild(divTitle)
            
        divRow.appendChild(divCard)
        tBody.appendChild(divRow)
        cont++
    })
}

//apoyo para crear nuevos posts
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
getData()

printPost()



/*

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
