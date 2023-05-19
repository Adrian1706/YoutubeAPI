async function search() {
    const buscar = document.getElementById("search").value;
    const url = `https://youtube138.p.rapidapi.com/search/?q=${buscar}&hl=en&gl=US`;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '83d73f277emshc25c54d98149f6dp16de8bjsn9eada14faf46',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};
try {
    

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const id = result.contents[0].video.videoId;
    comments(id);
    const relaciones=result.refinements[0];
    const relaciones2=result.refinements[1];
    const relaciones3=result.refinements[2];

    const url2=`https://youtube138.p.rapidapi.com/search/?q=${relaciones}&hl=en&gl=US`; 
    const response2 = await fetch(url2, options);
    const result2 = await response2.json();
    const id2 = result2.contents[0].video.videoId;

    const url3=`https://youtube138.p.rapidapi.com/search/?q=${relaciones2}&hl=en&gl=US`;
    const response3 = await fetch(url3, options);
    const result3 = await response3.json();
    const id3 = result3.contents[0].video.videoId;

    const url4=`https://youtube138.p.rapidapi.com/search/?q=${relaciones3}&hl=en&gl=US`;
    const response4 = await fetch(url4, options);
    const result4 = await response4.json();
    const id4 = result4.contents[0].video.videoId;

    document.getElementById("video").innerHTML = `<iframe width="800px" height="500px" src="https://www.youtube.com/embed/${id}"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <h2>${result.contents[0].video.title}</h2>
        <h5>Views: ${result.contents[0].video.stats.views}</h5>
        <p>${result.contents[0].video.descriptionSnippet}</p>
        <div class="container" style="display: flex">
            <div class="card" style="width: 18rem; color:white; background-color:black">
                <iframe src="https://www.youtube.com/embed/${id2}" class="card-img-top" alt="..."></iframe>
                    <div class="card-body">
                        <h5 class="card-text">${result2.contents[0].video.title}</h5>
                    </div>
            </div>
            <div class="card" style="width: 18rem; color:white; background-color:black">
                <iframe src="https://www.youtube.com/embed/${id3}" class="card-img-top" alt="..."></iframe>
                    <div class="card-body">
                        <h5 class="card-text">${result3.contents[0].video.title}</h5>
                    </div>
            </div>
            <div class="card" style="width: 18rem; color:white; background-color:black">
                <iframe src="https://www.youtube.com/embed/${id4}" class="card-img-top" alt="..."></iframe>
                    <div class="card-body">
                        <h5 class="card-text">${result4.contents[0].video.title}</h5>
                    </div>
            </div>
        </div>`;
    document.getElementById("acerca").innerHTML=`
    <div class="container" style="display: flex; width:100%">
            <img src="${result.contents[0].video.author.avatar[0].url}">
            <h3 style="margin-top:30px; margin-left:30px">${nameAvatar=result.contents[0].video.author.title}</h3>
    </div>`
} catch (error) {
    console.error(error);
}

}

async function comments(id) {
    const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=es&gl=US`;
    const options = {
        headers: {
        'X-RapidAPI-Key': '83d73f277emshc25c54d98149f6dp16de8bjsn9eada14faf46',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };
    try {
    const response = await fetch(url, options);
    const result = await response.json();
    //   console.log(result);

    const comentariosContainer = document.getElementById("comments");
        comentariosContainer.innerHTML = "<h5 style='text-align: center;'>COMENTARIOS:</h5>";

        const listaComentarios = document.createElement("ul");
        listaComentarios.style.overflow = "auto";
        listaComentarios.style.height = "400px";

        for (const comentario of result.comments) {
        const content = comentario.content;
        const autor = comentario.author.title;
        const comentarioHTML = `<h6 style="margin-top:50px"><b style="color: red">${autor}:</b> ${content}</h6>`;
        listaComentarios.innerHTML += comentarioHTML;
        }

        comentariosContainer.appendChild(listaComentarios);
    } catch (error) {
        console.error(error);
    }
    }
