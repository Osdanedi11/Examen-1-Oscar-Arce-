
let totalRecycled = 0;
let users = {};

// Función para habilitar/deshabilitar el input correspondiente según el checkbox
function toggleInput(material) {
    const cantidadInput = document.getElementById(`cantidad-${material}`);
    cantidadInput.disabled = !cantidadInput.disabled;
    if (cantidadInput.disabled) {
        cantidadInput.value = ''; // Limpiar el valor si se desmarca
    }
}

function registerRecycling() {
    const userName = document.getElementById('user-name').value;
    if (userName === "") {
        alert("Por favor, ingrese el nombre del usuario.");
        return;
    }

    const materials = [];
    let totalUserRecycling = 0;

    // Revisar los materiales seleccionados y agregar al registro
    const materialIds = ['papel', 'carton', 'vidrio', 'plastico', 'metal'];
    materialIds.forEach((material) => {
        const checkbox = document.getElementById(`material-${material}`);
        if (checkbox.checked) {
            const cantidad = parseFloat(document.getElementById(`cantidad-${material}`).value);
            if (!isNaN(cantidad) && cantidad > 0) {
                const materialName = checkbox.value;
                materials.push({ material: materialName, cantidad });
                totalUserRecycling += cantidad;
            }
        }
    });

    if (materials.length === 0) {
        alert("Por favor, seleccione al menos un material con su cantidad correspondiente.");
        return;
    }

    // Agregar los datos a la tabla por cada material registrado
    const table = document.getElementById('recycling-table').getElementsByTagName('tbody')[0];
    materials.forEach(({ material, cantidad }) => {
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.textContent = userName;
        cell2.textContent = material;
        cell3.textContent = cantidad + " kg";
    });

    // Actualizar las estadísticas
    totalRecycled += totalUserRecycling;
    document.getElementById('total-recycled').textContent = totalRecycled;

    if (!users[userName]) {
        users[userName] = 0;
    }
    users[userName] += totalUserRecycling;

    // Actualizar usuario con mayor reciclaje
    const topUser = Object.keys(users).reduce((a, b) => users[a] > users[b] ? a : b, null);
    document.getElementById('top-user').textContent = topUser;

    // Asignar puntos y recompensas
    updatePremios(userName, users[userName]);

    // Limpiar el formulario
    document.getElementById('recycling-form').reset();
    materialIds.forEach((material) => {
        document.getElementById(`cantidad-${material}`).disabled = true;
    });
}
//Premios
function updatePremios(user, totalKg) {
    const puntos = Math.floor(totalKg * 10); // 10 puntos por cada kg reciclado
    document.getElementById('premio-user').textContent = user;
    document.getElementById('puntos').textContent = puntos;


    if (puntos >= 2000) {
        premio = "Carro Ecológico";
    }
    else if (puntos >= 500) {
        premio = "Moto Ecológica";
    }
    else if (puntos >= 300) {
        premio = "Bicicleta Ecológica";
    }
    else if (puntos >= 150) {
        premio = "Camiseta Ecológica";
    }
    else if (puntos >= 100) {
        premio = "Gorra Ecológica";
    }
    else if (puntos >= 50) {
        premio = "Bolsa Ecológica";
    }
    else if (puntos >= 20) {
        premio = "Medias Ecológicas";
    }
    else if (puntos >= 10) {
        premio = "Posa Vasos Ecológico";
    }
    else {
        premio = "N/A";
    }

    document.getElementById('premio').textContent = premio;
}
