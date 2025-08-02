const person = [];
const btn = document.getElementById('btn');
const tarj = document.querySelector('.tar');
let search = (event) => {
    event.preventDefault();
    const encontrar = document.getElementById('busq').value;
    const link = encontrar === '' ? 'https://rickandmortyapi.com/api/character' : 'https://rickandmortyapi.com/api/character?name=' + encontrar;
    fetch(link).then(response => response.json()).then(anime => {
        if (!anime.results || anime.results.length === 0) {
            console.log("No hay resultados");
            return;
        }
        person.length = 0;
        anime.results.forEach(p => {
            person.push({
                id: p.id,
                nombre: p.name,
                creado: p.created,
                genero: p.gender,
                especie: p.species,
                estado: p.status,
                origen: p.origin.name,
                lugar: p.location.name,
                tipo: p.type,
                img: p.image
            });
        });
        tarj.innerHTML = "";
        person.forEach(p => {
            const div = document.createElement('div');
            div.className = "icon";
            div.innerHTML = `
		          <img src="${p.img}">
		          <div class="info">
		            <h3>${p.nombre}</h3>
		          </div>
		        `;
            div.querySelector('.info').addEventListener('click', () => info(p.id));
            tarj.appendChild(div);
        });
    }).catch(error => {
        console.error('Error al buscar personaje:', error.message);
    });
};
fetch('https://rickandmortyapi.com/api/character').then(response => response.json()).then(data => {
    data.results.slice(0, 5).forEach(p => {
        const div = document.createElement('div');
        div.className = "icon";
        div.innerHTML = `
		        <img src="${p.image}">
		        <div class="info">
		          <h3>${p.name}</h3>
		        </div>
		      `;
        div.querySelector('.info').addEventListener('click', () => info(p.id));
        tarj.appendChild(div);
    });
}).catch(error => {
    console.error('Error al obtener los datos: ', error.message);
});
btn.addEventListener('click', search);

function info(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`).then(response => response.json()).then(element => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "row bg-car";
        tarjeta.style.display = "flex";
        tarjeta.innerHTML = `
		        <div class="col-6 car">
		          <div class="col-11 close mt-3">
		            <a>${element.id}</a>
		            <i class="bi bi-x-diamond close-btn" style="cursor:pointer;"></i>
		          </div>
		          <div class="con-car">
		            <img src="${element.image}">
		            <h2>${element.name}</h2>
		            <div class="caracter">
		              <p>species: ${element.species}</p>
		              <p>Gender: ${element.gender}</p>
		              <p>origin: ${element.origin.name}</p>
		              <p>status: ${element.status}</p>
		            </div>
		            <p>created: ${element.created}</p>
		          </div>
		        </div>
		      `;
        tarjeta.querySelector('.close-btn').addEventListener('click', () => {
            tarjeta.remove();
        });
        tarj.appendChild(tarjeta);
    }).catch(error => {
        console.error('Error al obtener personaje:', error.message);
    });
}