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

const getPosts = () => {
    let response;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response  = JSON.parse( xhttp.responseText );
            //console.log( response )
        }
    };
    xhttp.open("GET", "https://proyecto-devto-default-rtdb.firebaseio.com//Posts/posts.json", false);
    xhttp.send();
    return response 
}
let allpost = getPosts()

console.log( allpost )
