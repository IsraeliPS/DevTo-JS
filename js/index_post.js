{
  /*

*/
}

/****************************************************************CODIGO OSCAR ********************************************************************** */

// Agregar likes al post - PATCH
function addToReactionCount(postObject) {
  $.ajax({
    method: "PATCH",
    url: "https://proyecto-devto-default-rtdb.firebaseio.com/Posts/posts/likes.json",
    data: JSON.stringify(postObject),
    success: (response) => {
      response = response;
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return response;
}

//Boton de reacciones

//Increase Likes

let counter = document.getElementById("like_count");
let likeButton = document.getElementById("reactions-btn");

let likeCount = 0;

likeButton.addEventListener("click", () => {
  console.log("click");
  likeCount++;
  counter.textContent = likeCount;
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
