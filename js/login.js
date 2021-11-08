let x = 0;
$(".login").click(() => {
  let username = $(".username").val().trim();
  let password = $(".password").val().trim();
  let notificacion = $("#notification");
  let node = document.createElement("p");

  if (username != "" && password != "") {
    let objectUser = { username: username, password: password };

    $.ajax({
      method: "POST",
      contentType: "application/json",
      url: `http://localhost:8000/auth`,
      data: JSON.stringify(objectUser),
      success: (response) => {
        node.textContent = "Acceso concedido";
        node.classList.add("accesTrue");
        console.log(response)
        setTimeout( function() { window.location.href = "./index.html"; }, 3000 );
      },
      error: (error) => {
        
        node.textContent = "Acceso denegado";
        username.textContent = "";
        password.textContent = "";
        node.classList.add("accesFalse");
        console.log(error);
      },
      async: false,
    });
    
    notificacion.append(node);
    
  }
});
