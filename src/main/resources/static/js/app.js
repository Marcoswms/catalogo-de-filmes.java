document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("formFilme");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const campoTitulo = document.getElementById("titulo");
        const campoGenero = document.getElementById("genero");
        const campoAnoLancamento = document.getElementById("ano");
        const campoNota = document.getElementById("nota");
        const campoAssistido = document.getElementById("assistido");

        const titulo = campoTitulo.value;
        const genero = campoGenero.value;
        const anoLancamento = Number(campoAnoLancamento.value);
        const nota = Number(campoNota.value);
        const assistido = campoAssistido.checked;

        const filme = {
                    titulo: titulo,
                    genero: genero,
                    anoLancamento: anoLancamento,
                    nota: nota,
                    assistido: assistido
        };

        fetch ("http://localhost:8080/filmes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filme)
        })
        .then(function(response) {
            console.log(response);
        });
    });
});