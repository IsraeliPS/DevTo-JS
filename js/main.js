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
    printPost()
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
                            aTitle.onclick=()=>{saveData(post,"index_post.html")}
                            
                            h3Title.appendChild(aTitle)
                        hashtags.forEach(item=>{
                            let name=createNode("span",`#${item}`)
                            name.classList.add("col-3", "text-center")
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
                            
                            let aUpdate=document.createElement("a")
                                let buttonUpdate=createNode("button","Modificar")
                                buttonUpdate.classList.add("btn","btn-warning")
                                
                                buttonUpdate.onclick=()=>{saveData(post,"newPost.html")}

                            aUpdate.appendChild(buttonUpdate)
                        divButton.appendChild(aUpdate)

                            let buttonDelete=createNode("button","Eliminar")
                            buttonDelete.classList.add("btn","btn-danger")
                            buttonDelete.onclick=()=>deletePost(id)

                            divButton.appendChild(buttonDelete)
                            
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

function saveData(objectPost,goLocation){
    localStorage.clear()
    localStorage.setItem("post",JSON.stringify(objectPost))
    location.href=goLocation
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

let lisa={
    coments:"10",
    cover_image:"https://images.party-city.es/images/link/19_BALL1154ar_097_L2.jpg",
    data_created:"11-11-2021",
    hashtags:[
        "javascript",
        "css",
        "Go"
    ],
    likes:4,
    post_text:"What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    title:"Entendiendo conceptos :P",
    usuario:{
        img:"data:image/png;base64,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",
        name:"Lisa",
        user_id:"Lisa.Github"
    }
}

let bart={
    coments:"1",
    cover_image:"https://p4.wallpaperbetter.com/wallpaper/325/140/18/alone-stars-purple-background-hd-wallpaper-preview.jpg",
    data_created:"11-11-2021",
    hashtags:[
        "javascript"
    ],
    likes:20,
    post_text:`What is Lorem Ipsum?
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title:"El niño rata ataca de nuevo",
    usuario:{
        img:"https://i.pinimg.com/originals/df/39/7a/df397a234d8b4bf00af6edc54e6c8d0f.png",
        name:"Bart",
        user_id:"Bart.Github"
    }
}

let homero={
    coments:"10",
    cover_image:"https://images.party-city.es/images/link/19_BALL1154ar_097_L2.jpg",
    data_created:"11-11-2021",
    hashtags:[
        "javascript",
        "css",
        "Go"
    ],
    likes:4,
    post_text:"What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    title:"Agregado para probar eliminar desde index_post",
    usuario:{
        img:"https://3.bp.blogspot.com/-JfL1o7oSnKI/VmodObHF9cI/AAAAAAAABLY/nKKRXw0-yiU/s1600/homero_456_336.jpg",
        name:"Homero",
        user_id:"Homero.Github"
    }
}

// createPost(lisa)
printPost()