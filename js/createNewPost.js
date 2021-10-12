
let data = localStorage.getItem("post")
localStorage.clear() //clean the localstorage
let value = JSON.parse(data)
if (value){
    fillForm(value)
}

function fillForm(value){
    let {cover_image,title,hashtags,post_text}=value
    
    //**********************************************carga imagen
    $("#image-url").val(cover_image)

    //**********************************************carga titulo y post
    cont=0
    let textArea=$("textarea")
    for (const txt of textArea){
        switch(cont){
            case 0:
                txt.value=title
                break
            case 1:
                txt.value=post_text
                break
        }
        cont++
    }
    
    //**********************************************carga los hashtags
    hashtags.forEach((valor)=>{
        let tTable = $("#hashtagsSelected")
            let tdCell=createNode("td",valor)
            tdCell.classList.add("hashValue", "mr-3")
                let tdSpan=createNode("span","x")
                tdSpan.classList.add("closeHashtag")
                tdSpan.setAttribute("onclick","this.removeChild(this.parentNode);return false;")
                tdCell.appendChild(tdSpan)
            // <span class="boton" onclick="cerraranuncio('primeranuncio')">x</span>
        $(tTable).append(tdCell)
    })
}

function quitarTD(valor){
    this.parentNode.parentNode.parentNode
        .removeChild(this.parentNode.parentNode)
}
//**************metodos para actualizar
function preUpdatePost(value){
    let {id}=value,valHash={},val=0,cont=0
    
    //**********************************************verifica imagen
    let img=$("#image-url").val()
    if(img)
        value.image=img
    else
        val++
    //**********************************************carga los hashtags seleccionados
    let hash=$(".hashValue")
    
    if (Object.keys(hash).length >2){
        for (const ts of hash){
            let txt=ts.textContent
            valHash={...valHash,[cont]:txt}
            cont++
        }
        value.hashtags=valHash
    }
    else val++

    //**********************************************carga titulo y post
    cont=0
    let textArea=$("textarea")
    for (const txt of textArea){
        if (txt.value){
            switch(cont){
                case 0:
                    value.title=txt.value
                    break
                case 1:
                    value.post_text=txt.value
                    break
            }
        }
        else
            val++
        cont++
    }

    val>0?alert("Todos los campos son requeridos"):updatePost(id,value)
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

//**************metodos para crear
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
    

    //**********************************************carga los hashtags seleccionados
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
    // console.log("objeto a mostrar",objectPost)
    // console.log("valor contador",val)
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

$("#publish-button").click(()=>{
    if (value){        
        preUpdatePost(value)
    }
    else{       
        localStorage.clear() //clean the localstorage 
        preCargarPost()
    }
})

$("#tag-input").focus(()=>cargaHashtags())

$("#tag-input").change(function(){
    let tTable = $("#hashtagsSelected")
    let valor=$("#tag-input").val()
    
    let tdCell=createNode("td",valor)
    tdCell.classList.add("hashValue", "mr-3")
    $(tTable).append(tdCell)
    $("#tag-input").val("")
})



