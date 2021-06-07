let vector = [];
document.getElementById('consultar').onclick = function() {
    if (!$('#frase').val()) { alert("Ingresa una frase"); return; }
    let modal = new bootstrap.Modal(document.getElementById('myModal'), {
        keyboard: false,
        backdrop: 'static'
    });
    modal.show();
    $.ajax({
        url: `/cj?frase=${$('#frase').val()}`,
        type: 'GET',
        success: function(r) {
            let filas = $('#tabla tbody tr').length;
            let tablatr = '<tr>';
            tablatr += `<td>${filas+1}</td>`;
            tablatr += `<td>${$('#frase').val()}</td>`;
            tablatr += `<td>${r.jaccard}</td>`;
            tablatr += `<td>${r.coseno}</td>`;
            tablatr += '</tr>';
            $('#tabla tbody').prepend(tablatr);
            vector.push(r);
            calcular(['jaccard', 'coseno']);
            setTimeout(() => { modal.hide(); }, 500);
        },
        error: function(err) {
            setTimeout(() => { modal.hide(); }, 500);
            console.log(err);
            alert(err);
        }
    });

};

function calcular(metrica) {
    $('#porcentaje').html('');
    metrica.forEach(e => {
        let positivo = 0;
        let neutro = 0;
        let negativo = 0;
        for (let index = 0; index < vector.length; index++) {
            if (vector[index][e] == "Positivo")
                positivo += 1;
            else if (vector[index][e] == "Neutro")
                neutro += 1;
            else if (vector[index][e] == "Negativo")
                negativo += 1;
        }
        $('#porcentaje').append(`<li class="list-group-item "> <strong class="text-capitalize">${e} </strong> <strong>Positivo: </strong><small>${(positivo / vector.length).toFixed(2)} %</small>  <strong>Neutro: </strong><small>${(neutro / vector.length).toFixed(2)} %</small> <strong>Negativo: </strong><small>${(negativo / vector.length).toFixed(2)} %</small></li>`);
    });
}