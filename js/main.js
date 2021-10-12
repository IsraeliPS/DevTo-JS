const getPost = () => {
    let usersCollection;
    $.ajax({
        method: "GET",
        url: "https://proyecto-devto-default-rtdb.firebaseio.com//Posts/posts.json",
        success: (response) => {
            usersCollection = response;
        },
        error: (error) => {
            console.log(error);
        },
        async: false,
    });
    return usersCollection;
}
let allPosts = getPost()
//console.log(allPosts)
let arrayPosts = (Object.values(allPosts));
//console.log(arrayPosts)

function convertArray(postObject) {
    let arrayPost = []
    for (const key in postObject)
      //  console.log(key)
    {
        let postData = postObject[key]
        postData = { ...postData, id: key }
        arrayPost = [...arrayPost,
            postData]
    }
    return arrayPost
}
let losPosts = (convertArray(allPosts))
console.log(losPosts)





//----------------------------------------------------FITERS----------------------------------------------------------
const filterWeek = (arrayPost) => {
    let fecha = new Date() //Genera la fecha del dia de hoy
    let mes = (fecha.getMonth() + 1)
    let hoy = fecha.getDate()
    let finde = (hoy - 7)
    arrayPost = arrayPost.map(post => {
        return { ...post, fechaConvertida: post.fecha.split('-') }
    })
    arrayPost = arrayPost.filter(post => {
        return Number(post.fechaConvertida[1]) === mes
            && Number(post.fechaConvertida[0]) >= finde
            && Number(post.fechaConvertida[0]) <= hoy
    })
    drawPost(arrayPost)
}

const filterMonth = (arrayPost) => {
    arrayPost = arrayPost.map(post => {
        return { ...post, fechaConvertida: post.fecha.split('-') }
    })
    arrayPost = arrayPost.filter(post => Number(post.fechaConvertida[1]) === new Date().getMonth() + 1)
    drawPost(arrayPost)
}

const filterYear = (arrayPost) => {
    arrayPost = arrayPost.map(post => {
        return { ...post, fechaConvertida: post.fecha.split('-') }
    })
    arrayPost = arrayPost.filter(post => Number(post.fechaConvertida[2]) === new Date().getFullYear())
    drawPost(arrayPost)
}

$("#fechas").change(() => {
    let select = $("#fechas option:selected").val()
    console.log(select)
    switch (select) {
        case "week":
            filterWeek(getPost())
            break;
        case "month":
            filterMonth(getPost())
            break;
        case "year":
            filterYear(getPost())
            break;
        case "infinity":
            drawPost(getPost())
            break;
        default:
            break;
    }
})

document.querySelector('#week').addEventListener('click', (e) => {
    e.preventDefault()
    filterWeek(getPost())
})

$('#month').click((e) => {
    e.preventDefault()
    filterMonth(getPost())
})

$('#infinity').click((e) => {
    e.preventDefault()
    drawPost(getPost())
})

document.querySelector('#year').addEventListener('click', (e) => {
    e.preventDefault()
    filterYear(getPost())
})




//------------------------------buscar la palabra vs tittle--------------------------------------------------
inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (e) => {
    let valorInput = inputSearch.value.toUpperCase()
    let resultadoBusqueda = losPosts.filter(post => {
        return post.title.toUpperCase().includes(valorInput)
    })
    //funicon del post ya caragdo (resultadoBusqueda)
})





/*const listByWord = arrayPosts => {
    let busqueda = arrayPosts.reduce((accum, dato) => {
      return dato.title.match("html")   //hacerla dinamica
        ? [...accum, dato]
        : accum
    }, [])
    return busqueda
  }
  let listaFiltradaWord = listByWord(arrayPosts)
  console.log(listaFiltradaWord)*/