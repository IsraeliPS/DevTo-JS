let data = localStorage.getItem("post");
localStorage.clear(); //clean the localstorage
let value = JSON.parse(data);

function createNode(typeElement, text) {
  let node = document.createElement(typeElement);
  node.textContent = text;
  return node;
}

function saveData(objectPost, goLocation) {
  localStorage.clear();
  localStorage.setItem("post", JSON.stringify(objectPost));
  location.href = goLocation;
}

function deletePost(idPost) {
  $.ajax({
    method: "DELETE",
    url: `https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts/${idPost}.json`,
    data: idPost,
    success: (response) => {
      console.log(response);
      location.href = "/";
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
}

function printPost() {
  let data = value,
    cont = 0;

  let tBody = document.getElementById("list-posts");

  while (tBody.lastElementChild) {
    tBody.removeChild(tBody.lastElementChild);
  }

  let { post_text, id, cover_image, data_created, title, usuario, hashtags } =
    data;

  let divRow = document.createElement("div");
  divRow.classList.add("row");

  let divCard = document.createElement("div");
  divCard.classList.add("card");

  let imgCard = document.createElement("img");
  imgCard.classList.add("card-img-top", "col-12", "p-2");
  imgCard.src = cover_image;
  imgCard.alt = "principal_Image";
  divCard.appendChild(imgCard);

  //*************inicia */

  let divUser = document.createElement("div");
  divUser.classList.add("container", "p-2", "my-2");

  let divRowUser = document.createElement("div");
  divRowUser.classList.add("row");

  let imgAvatar = document.createElement("img");
  imgAvatar.classList.add("col-2", "rounded-pill");
  imgAvatar.src = usuario.img;
  imgAvatar.alt = "avatar";

  let divUserName = document.createElement("div");
  divUserName.classList.add("col-8");

  let h5User = createNode("h5", usuario.name);
  h5User.classList.add("card-title");

  let h6Data = createNode("h6", data_created);
  h6Data.classList.add("card-subtitle", "mb-2", "text-muted");

  divUserName.appendChild(h5User);
  divUserName.appendChild(h6Data);

  divRowUser.appendChild(imgAvatar);
  divRowUser.appendChild(divUserName);
  divUser.appendChild(divRowUser);

  let divTitle = document.createElement("div");
  divTitle.classList.add("container");

  let divRowTitle = document.createElement("div");
  divRowTitle.classList.add("row");

  let h3Title = document.createElement("h3");
  h3Title.classList.add("col-12");

  let aTitle = createNode("a", title);
  divRowTitle.appendChild(h3Title);

  h3Title.appendChild(aTitle);
  hashtags.forEach((item) => {
    let name = createNode("p", `#${item}`);
    name.classList.add("col-3", "hashtagsPosts", "text-center");
    divRowTitle.appendChild(name);
  });

  let divRowButtons = document.createElement("div");
  divRowButtons.classList.add("row");

  let divButton = document.createElement("div");
  divButton.classList.add(
    "col-12",
    "d-flex",
    "flex-row",
    "justify-content-end"
  );

  let aUpdate = document.createElement("a");
  let buttonUpdate = createNode("button", "Modificar");
  buttonUpdate.classList.add("btn", "btn-warning", "mx-2");

  buttonUpdate.onclick = () => {
    saveData(data, "newPost.html");
  };

  aUpdate.appendChild(buttonUpdate);
  divButton.appendChild(aUpdate);

  let aDelete = document.createElement("a");
  let buttonDelete = createNode("button", "Eliminar");
  buttonDelete.classList.add("btn", "btn-danger", "mx-2");
  buttonDelete.onclick = () => deletePost(id);

  // aDelete.href="/"
  aDelete.appendChild(buttonDelete);
  divButton.appendChild(aDelete);
  divRowButtons.appendChild(divButton);
  divTitle.appendChild(divRowTitle);
  divTitle.appendChild(divRowButtons);

  divCard.appendChild(divUser);
  divCard.appendChild(divTitle);

  let divTextPost = document.createElement("div");
  divTextPost.classList.add("card", "my-1");
  let divText = createNode("div", post_text);
  divText.classList.add("container");

  divTextPost.appendChild(divText);

  divRow.appendChild(divCard);
  divRow.appendChild(divTextPost);
  tBody.appendChild(divRow);
  cont++;
}

printPost();

// Agregar likes al post - PATCH
const addToReactionCount = (reactionPost, newCount) => {
  console.log(reactionPost, newCount);
  $.ajax({
    method: "PATCH",
    url: `https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts/${reactionPost}.json`,
    data: JSON.stringify(newCount),
    success: (response) => {},
    error: (error) => {},
  });
};

//Boton de reacciones

//Increase Likes

let counter = document.getElementById("like_count");
let likeButton = document.getElementById("reactions-btn");

let likeCount = 0;

likeButton.addEventListener("click", () => {
  let { likes, id } = value;
  likeCount += parseInt(likes);
  console.log("contador", likeCount);
  console.log("click");
  likeCount++;
  counter.textContent = likeCount;
  value.likes = parseInt(likeCount);
  addToReactionCount(id, value);
  likeCount = 0;
});

// Increase Star

let starCounter = document.getElementById("star_count");
let starButton = document.getElementById("star-btn");

let starCount = 0;

starButton.addEventListener("click", () => {
  console.log("click");
  starCount++;
  starCounter.textContent = starCount;
});

// Increase comments

let comCounter = document.getElementById("com_count");
let comButton = document.getElementById("com-btn");

let comCount = 0;

comButton.addEventListener("click", () => {
  console.log("click");
  comCount++;
  comCounter.textContent = comCount;
});
