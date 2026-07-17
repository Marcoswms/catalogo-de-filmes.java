document.addEventListener("DOMContentLoaded", function() {
    const tabela = document.getElementById("listaFilmes");
    tabela.innerHTML = "";

    carregarFilmes();

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

            if (response.ok) {
                console.log("Filme salvo com sucesso!");
                formulario.reset();

                carregarFilmes();
            }
            else {
                console.log(response.status, "Precisamos tratar esse erro!");
            }
        });
    });

    function carregarFilmes() {

        fetch("http://localhost:8080/filmes")
            .then(function(response) {
            return response.json();
        })
            .then(function(filmes) {

            let linhas = "";
            filmes.forEach(function(filme) {
                linhas += `
                <tr>
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.genero}</td>
                    <td>${filme.anoLancamento}</td>
                    <td>${filme.nota}</td>
                    <td>${filme.assistido}</td>
                    <td>
                        <button type="button" class="btn btn-outline-warning btn-sm me-2">Editar</button>
                        <button type="button" data-id="${filme.id}" class="btn-excluir btn btn-outline-danger btn-sm me-2">Excluir</button>
                    </td>
                </tr>`;
            });
            tabela.innerHTML = linhas;
            const botoesExcluir = document.querySelectorAll(".btn-excluir");

            botoesExcluir.forEach(function(botao){
                botao.addEventListener("click", function(){
                    const id = botao.dataset.id;
                    excluirFilme(id);
                });
            });
        });
    }

    function excluirFilme(idFilme) {

        fetch(`http://localhost:8080/filmes/${idFilme}`, {
            method: "DELETE",
        })
            .then(function(response){
            if (response.ok) {
                console.log("Filme excluido com sucesso!");
                carregarFilmes();
            }
            else {
                console.log(`Código ${response.status} - Algo inesperado aconteceu, precisamos tratar!`);
            }
        });
    }
});