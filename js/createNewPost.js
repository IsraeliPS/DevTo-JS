let data = localStorage.getItem("post");
localStorage.clear(); //clean the localstorage
let value = JSON.parse(data);

let text = $("#newPost");
if (value) {
  let pCell = createNode("p", "Modify Post");
  pCell.classList.add("align-middle", "my-2", "text-center");
  text.append(pCell);

  fillForm(value);
} else {
  let pCell = createNode("p", "Create Post");
  pCell.classList.add("align-middle", "my-2", "text-center");
  text.append(pCell);
}

//metodos carga los datos para modificar desde post
function fillForm(value) {
  let { image, title, tags, dateCreation, textContainer } = value;

  //**********************************************carga imagen
  $("#image-url").val(image);

  //**********************************************carga titulo y post
  cont = 0;
  let textArea = $("textarea");
  for (const txt of textArea) {
    switch (cont) {
      case 0:
        txt.value = title;
        break;
      case 1:
        txt.value = textContainer;
        break;
    }
    cont++;
  }

  //**********************************************carga los hashtags
  tags.forEach((valor) => {
    let tTable = $("#hashtagsSelected");
    let tdCell = createNode("td", valor);
    tdCell.classList.add("hashValue", "mr-3");
    // let tdSpan=createNode("span","x")
    // tdSpan.classList.add("closeHashtag")
    // tdSpan.setAttribute("onclick","this.removeChild(this.parentNode);return false;")
    // tdCell.appendChild(tdSpan)
    // <span class="boton" onclick="cerraranuncio('primeranuncio')">x</span>
    $(tTable).append(tdCell);
  });
}

//**************metodos para actualizar
function preUpdatePost(value) {
  let { _id } = value,
    valHash = {},
    val = 0,
    cont = 0;

  //**********************************************verifica imagen
  let img = $("#image-url").val();
  if (img) value.image = img;
  else val++;
  //**********************************************carga los hashtags seleccionados
  let hash = $(".hashValue");

  if (Object.keys(hash).length > 2) {
      let txt=""
    for (const ts of hash) {
      txt += ts.textContent+",";
    }
    value.tags = txt;
  } else val++;

  //**********************************************carga titulo y post
  cont = 0;
  let textArea = $("textarea");
  for (const txt of textArea) {
    if (txt.value) {
      switch (cont) {
        case 0:
          value.title = txt.value;
          break;
        case 1:
          value.textContainer = txt.value;
          break;
      }
    } else val++;
    cont++;
  }
 val > 0 ? alert("Todos los campos son requeridos") : updatePost(_id, value);
}

function updatePost(idPost, objectPost) {
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg3MDg3YWY5Njc1NjZiODY4OTgzYzYiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjM0MjQzMH0.ihxZifL9hQe1f38j_zmzOmO96zqJRT6FRjPkCNW8CsM";
  $.ajax({
    method: "PATCH",
    headers: { token: token },
    contentType:"application/json",
    url: `http://localhost:8000/posts/${idPost}`,
    data: JSON.stringify(objectPost),
    success: (response) => {
        if (response.status){
            modal("modify")
            $(".modal").modal("show")
        }
        else
        console.log("ocurrio un error")
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
}

//no funciona
function quitarTD(valor) {
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
}

//**************metodos para crear
function preCargarPost() {
  let objectPost = {},
    valHash = {};
  let image,
    val = 0,
    cont = 0;

  //**********************************************verifica imagen
  image = $("#image-url").val();
  if (image) {
    objectPost = { ...objectPost, image: image };
  } else {
    val++;
  }

  //**********************************************carga los hashtags seleccionados
  let hash = $(".hashValue");
  let txt=""
  if (Object.keys(hash).length > 2) {
      let cont=0
    for (const ts of hash) {
        txt += ts.textContent
        if (cont<hash.length-1){
        txt += ",";
        cont ++
      }
    }
    objectPost = { ...objectPost, tags: txt };
  } else val++;

  //**********************************************carga titulo y post
  cont = 0;
  let textArea = $("textarea");
  for (const txt of textArea) {
    if (txt.value) {
      switch (cont) {
        case 0:
          objectPost = { ...objectPost, title: txt.value };
          break;
        case 1:
          objectPost = { ...objectPost, textContainer: txt.value };
          break;
      }
    } else val++;
    cont++;
  }

    id="6185ef069bedf5c4c1d98e39"
  objectPost = { ...objectPost,idAuthor:id, coments: 0, likes: 0 };
  // console.log("objeto a mostrar",objectPost)
  // console.log("valor contador",val)
  console.log(objectPost)
  val > 0 ? alert("Todos los campos son requeridos") : createPost(objectPost);
}

function createPost(postObject) {
  let resp;
    let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg1ZjYyMDE3ZjIzYTU2NGQ1ZmI2OWIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzYzOTY4NDN9.yHUag1Ju4KyuEUXombLrE4dc9hGPTd0rGVSWHNDqDXU"
  $.ajax({
    method: "POST",
    headers: { token: token },
    contentType:"application/json",
    url: "http://localhost:8000/posts/",
    data: JSON.stringify(postObject),
    success: (response) => {
        if (response.status){
            modal("create")
            $(".modal").modal("show")
        }
        else
        console.log("ocurrio un error")
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return resp;
}

function createNode(typeElement, text) {
  let node = document.createElement(typeElement);
  node.textContent = text;
  return node;
}

function cargaHashtags() {
  let hashObject;
  let arrayHash = [];
  $.ajax({
    method: "GET",
    url: "http://localhost:8000/tags/",
    success: (response) => {
      hashObject = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });

  for (const value of hashObject.payload) {
      let object=Object.values(value),cont=0

      object.forEach((val)=>{
          if (cont<object.length-1){
            arrayHash=[...arrayHash,val]
            cont++
          }
      })
  }
  
  let tDatalist = document.getElementById("tagsInput");

  while (tDatalist.lastElementChild) {
    tDatalist.removeChild(tDatalist.lastElementChild);
  }

  arrayHash.forEach((index) => {
    let opt = document.createElement("option");
    opt.value = index;
    tDatalist.appendChild(opt);
  });
}

function modal (){
    const openEls = document.querySelectorAll("[data-open]");
    const closeEls = document.querySelectorAll("[data-close]");
    const isVisible = "is-visible";
    let strongText
    if (value) {
        strongText=createNode("strong","El Elemento fue modificado exitosamente")
        $("#textModal").append(strongText)
    }else {
        strongText=createNode("strong","El Elemento fue creado exitosamente")
        $("#textModal").append(strongText)
    }

    for (const el of openEls) {
      el.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
      });
    }
    
    for (const el of closeEls) {
      el.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
      });
    }
    
    document.addEventListener("click", e => {
      if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
      }
    });
    
    document.addEventListener("keyup", e => {
      // if we press the ESC
      if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
      }
    });
}

$("#publish-button").click(() => {
  if (value) {
    preUpdatePost(value);
  } else {
    localStorage.clear(); //clean the localstorage
    preCargarPost();
  }
});

$("#tag-input").focus(() => cargaHashtags());

$("#tag-input").change(function () {
  let tTable = $("#hashtagsSelected");
  let valor = $("#tag-input").val();

  let tdCell = createNode("td", valor);
  tdCell.classList.add("hashValue", "mr-3");
  $(tTable).append(tdCell);
  $("#tag-input").val("");
});
