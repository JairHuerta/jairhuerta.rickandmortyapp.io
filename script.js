/** URL BASE DE API */
const apiUrl = 'https://rickandmortyapi.com/api/location';
const redirectUrl = ''
var searchlist = [];
var cardsPorFila = 4;

/** ARROJADOR INICIAL DE LOCACIONES */
function getLocations(){
    axios.get(apiUrl)
        .then(response => {/** RESPUESTA EXITOSA DE API */
            // console.log('Datos de la API:', response);
            if(!response.status == 200){
                return alert('Ha ocurrido un error con la API, intentalo más tarde.')
            } else {
                var locations = [];
                locations = response.data.results /** IMPRIME LOCATIONS, TOCA GENERAR LAS CARDS */
                console.log(locations)
                if(locations.length > 0){
                    searchlist = locations;
                    var contenedorCards = document.getElementById('itemcards');
                    for (var i = 0; i < locations.length; i += cardsPorFila) {
                        var residentes = locations[i].residents
                        var fila = document.createElement('div');
                        fila.className = 'row mb-4';
                        for (var j = i; j < i + cardsPorFila && j < locations.length; j++) {
                            var card = document.createElement('div');
                            card.className = 'col-md-3';

                            card.innerHTML = `
                            <div class="card" style="cursor: pointer;">
                                <div class="card-body">
                                    <h5 class="card-title">${locations[j].name}</h5>
                                    <p class="card-text">${locations[j].dimension}</p>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#miModal" onclick="abrirModal('${locations[j].name}', '${locations[j].dimension}', '${residentes}')">Ver Detalles</button>
                                </div>
                            </div>
                            `;
                            fila.appendChild(card);
                        }
                        contenedorCards.appendChild(fila);
                    }
                } else {
                    var message = '<li>No se ha podido recuperar la lista de locaciones.</li>';
    
                    document.getElementById("itemcards").innerHTML = message;
                }
            }
        })
        .catch(error => { /** RESPUESTA ERRONEA DE API */
            console.error('Error al consumir la API:', error);
        });
}

/** BUSCADOR DE LOCACIONES ACORDE A INFORMACIÓN INGRESADA DESDE INPUT TEXT */
function searchLocations(){
    var valorInput = document.getElementById('buscador').value;
    if(valorInput.trim()){
        const apiUrl = `https://rickandmortyapi.com/api/location/?name=${valorInput}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                var locations = [];
                locations = data.results /** IMPRIME LOCATIONS, TOCA GENERAR LAS CARDS */
                console.log(locations)
                if(locations.length > 0){
                    searchlist = locations;
                    var contenedorCards = document.getElementById('itemcards');
                    contenedorCards.innerHTML = '';
                    for (var i = 0; i < locations.length; i += cardsPorFila) {
                    var residentes = locations[i].residents
                    var fila = document.createElement('div');
                    fila.className = 'row mb-4';
                    for (var j = i; j < i + cardsPorFila && j < locations.length; j++) {
                        var card = document.createElement('div');
                        card.className = 'col-md-3';

                        card.innerHTML = `
                        <div class="card" style="cursor: pointer;">
                            <div class="card-body">
                                <h5 class="card-title">${locations[j].name}</h5>
                                <p class="card-text">${locations[j].dimension}</p>
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#miModal" onclick="abrirModal('${locations[j].name}', '${locations[j].dimension}', '${residentes}')">Ver Detalles</button>
                            </div>
                        </div>
                        `;
                        fila.appendChild(card);
                    }
                    contenedorCards.appendChild(fila);
                    }
                }
            })
        .catch(error => console.error('Error al realizar la solicitud:', error));
    } else {
        var contenedorCards = document.getElementById('itemcards');
        contenedorCards.innerHTML = '';
        getLocations()
    }
}

/** MODAL DE DETALLE DE LOCACIÓN SELECCIONADA */
function abrirModal(titulo, contenido, residents = []) {
    var residentesLocalidad = []
    residentesLocalidad = residents.split(',')
    // console.log(residentesLocalidad)
    var contenedorCards = document.getElementById('characters');
    contenedorCards.innerHTML = '';
    for (var i = 0; i < 5; i += cardsPorFila) {
        var fila = document.createElement('div');
        fila.className = 'row mb-4';
        if(residentesLocalidad.length > 0){
            for (var j = i; j < i + cardsPorFila && j < 5; j++) {
                axios.get(residentesLocalidad[j])
                    .then(response => {
                        if(!response.status == 200){
                            return alert('Ha ocurrido un error con la API, intentalo más tarde.')
                        } else {
                            var characterData = response.data;
                            var card = document.createElement('div');
                            card.className = 'col-md-4';
                
                            card.innerHTML = `
                            <div class="card">
                                <img src="${characterData.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${characterData.name}</h5>
                                    <p>${characterData.species}</p>
                                    <p>${characterData.status}</p>
                                    <p>${characterData.gender}</p>
                                </div>
                            </div>
                            `;
                            fila.appendChild(card);
                        }
                    })
    
            }
            contenedorCards.appendChild(fila);
        } else {
            var message = '<li>No se ha podido recuperar la lista de locaciones.</li>';
    
            document.getElementById("characters").innerHTML = message;
        }
    }
}

getLocations()