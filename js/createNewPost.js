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

// https://mkt.trato.io/wp-content/uploads/2017/04/imagen-blog-14-1.jpeg
//Aprendiendo javascript a golpes
//Aqui andamos aprendiendo porque el niño quería programar
function preCargarPost(){
    let objectPost={}, valHash={}
    let image,val=0, cont=0
    
    //**********************************************verifica imagen
    image=$("#image-url").val()
    if(image){
        objectPost={...objectPost,"cover_image":image}
    }
    else{
        val++
    }
    
    //**********************************************carga fecha
    let dateNow=new Date()
    const year = dateNow.getFullYear();
    const day = dateNow.getDate();
    const month = dateNow.getMonth() + 1; 
    let date=`${day}-${month}-${year}`
    objectPost={...objectPost,"data_created":date}
    

    //**********************************************carga los hashtagas seleccionados
    let hash=$(".hashValue")
    
    if (Object.keys(hash).length >2){
        for (const ts of hash){
            let txt=ts.textContent
            valHash={...valHash,[cont]:txt}
            cont++
        }
        objectPost={...objectPost,"hashtags":valHash}
    }
    else val++

    //**********************************************carga titulo y post
    cont=0
    let textArea=$("textarea")
    for (const txt of textArea){
        if (txt.value){
            switch(cont){
                case 0:
                    objectPost={...objectPost,"title":txt.value}
                    break
                case 1:
                    objectPost={...objectPost,"post_text":txt.value}
                    break
            }
        }
        else
            val++
        cont++
    }
    
    //**********************************************carga usuario, cometarios y likes
    let usuario={
        img:"https://3.bp.blogspot.com/-JfL1o7oSnKI/VmodObHF9cI/AAAAAAAABLY/nKKRXw0-yiU/s1600/homero_456_336.jpg",
        name:"homero",
        user_id:"homero.github"
    }
    objectPost={...objectPost,"usuario":usuario,"coments":0,"likes":0}
    console.log("objeto a mostrar",objectPost)
    console.log("valor contador",val)
    val>0?alert("Todos los campos son requeridos"):createPost(objectPost)
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

function createNode(typeElement, text){
    let node = document.createElement(typeElement)
    node.textContent = text
    return node
}

function cargaHashtags(){
    let hashObject
    let arrayHash=[]
    $.ajax({
        method:"GET",
        url:"https://proyecto-devto-default-rtdb.firebaseio.com/Posts/hashtags.json",
        success:response=>{
            hashObject=response
        },
        error:error=>{
            console.log(error)
        },
        async:false
    })
    
    for (const value in hashObject) {
        arrayHash = [...arrayHash, hashObject[value]]
    }

    
    let tDatalist = document.getElementById("tagsInput")
        
    while (tDatalist.lastElementChild){
        tDatalist.removeChild(tDatalist.lastElementChild)
    }  

    arrayHash.forEach((index)=>{
        let opt=document.createElement("option")
        opt.value=index
        tDatalist.appendChild(opt)
    })

}

$("#publish-button").click(()=>preCargarPost())

$("#tag-input").focus(()=>cargaHashtags())

$("#tag-input").change(function(){
    let tTable = $("#hashtagsSelected")
    let valor=$("#tag-input").val()
    
    let tdRow=createNode("td",valor)
    tdRow.classList.add("hashValue", "mr-3")
    $(tTable).append(tdRow)
    $("#tag-input").val("")
})



