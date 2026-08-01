document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("formFilme");
    const tabela = document.getElementById("listaFilmes");

    const campoTitulo = document.getElementById("titulo");
    const campoGenero = document.getElementById("genero");
    const campoAnoLancamento = document.getElementById("ano");
    const campoNota = document.getElementById("nota");
    const campoAssistido = document.getElementById("assistido");

    let idFilmeEmEdicao = null;
    let listaFilmes = [];

    carregarFilmes();

    function obterDadosDoFormulario(){

        const filme = {
            titulo: campoTitulo.value,
            genero: campoGenero.value,
            anoLancamento: Number(campoAnoLancamento.value),
            nota: Number(campoNota.value),
            assistido: campoAssistido.checked
        };

        return filme;
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const filme = obterDadosDoFormulario();

        if (idFilmeEmEdicao === null) {
            salvarFilme(filme);
        }
        else {
            atualizarFilme(filme);
        }
    });

    function carregarFilmes() {

        fetch("http://localhost:8080/filmes")
            .then(function(response) {
            return response.json();
        })
            .then(function(filmes) {

            listaFilmes = filmes;

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
                        <button type="button" data-id="${filme.id}" class="btn-editar btn btn-outline-warning btn-sm me-2">Editar</button>
                        <button type="button" data-id="${filme.id}" class="btn-excluir btn btn-outline-danger btn-sm me-2">Excluir</button>
                    </td>
                </tr>`;
            });

            tabela.innerHTML = linhas;

            tabela.addEventListener("click", function(event){

                if (event.target.classList.contains("btn-excluir")) {

                    const id = Number(event.target.dataset.id);
                    excluirFilme(id);
                }

                if (event.target.classList.contains("btn-editar")) {

                    const id = Number(event.target.dataset.id);
                    const filme = listaFilmes.find(function(filme) {
                        return filme.id === id;
                    });

                    idFilmeEmEdicao = filme.id;

                    campoTitulo.value = filme.titulo;
                    campoGenero.value = filme.genero;
                    campoAnoLancamento.value = filme.anoLancamento;
                    campoNota.value = filme.nota;
                    campoAssistido.checked = filme.assistido;
                }
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

    function atualizarFilme(filme) {

        fetch (`http://localhost:8080/filmes/${idFilmeEmEdicao}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filme)
        })
            .then(function(response) {

            if (response.ok) {
                console.log("Filme atualizado com sucesso!");
                formulario.reset();

                idFilmeEmEdicao = null;

                carregarFilmes();
            }
            else {
                console.log(response.status, "Precisamos tratar esse erro!");
            }
        });
    }

    function salvarFilme(filme) {

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
    }
});