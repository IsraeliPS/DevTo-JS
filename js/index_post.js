var data = localStorage.getItem("post");
localStorage.clear(); //clean the localstorage
var value = JSON.parse(data)

function createNode(typeElement, text){
    let node = document.createElement(typeElement)
    node.textContent = text
    return node
}

console.log(value)

printPost()

function printPost(){
    let data=value,cont=0
    
    let tBody = document.getElementById("list-posts")
        
    while (tBody.lastElementChild){
        tBody.removeChild(tBody.lastElementChild)
    }
    
    let {coments,id,cover_image,data_created,likes,title,usuario,hashtags}=data
    
    let divRow=document.createElement("div")
    divRow.classList.add("row")

        let divCard=document.createElement("div")
        divCard.classList.add("card", "my-2")
            
            let imgCard=document.createElement("img")
            imgCard.classList.add("card-img-top", "col-12", "p-2")
            imgCard.src=cover_image
            imgCard.alt="principal_Image"
            divCard.appendChild(imgCard)
            
            //*************inicia */

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
                    divRowTitle.classList.add("row" )

                        let h3Title=document.createElement("h3")
                        h3Title.classList.add("col-12")

                        let aTitle=createNode("a",title)
                        divRowTitle.appendChild(h3Title)
                        
                            h3Title.appendChild(aTitle)
                        hashtags.forEach(item=>{
                            let name=createNode("p",`#${item}`)
                            name.classList.add("col-3","hashtagsPosts","text-center")
                            divRowTitle.appendChild(name)
                        })
                divTitle.appendChild(divRowTitle)
                
                let divText=createNode("div",)
                divText.classList.add("container")


        divCard.appendChild(divUser)
        divCard.appendChild(divTitle)

    divRow.appendChild(divCard)
    tBody.appendChild(divRow)
        cont++
}
