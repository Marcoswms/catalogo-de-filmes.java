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

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

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
            const botoesEditar = document.querySelectorAll(".btn-editar");
            const botoesExcluir = document.querySelectorAll(".btn-excluir");

            botoesEditar.forEach(function(botao){
                botao.addEventListener("click", function() {
                    const id = botao.dataset.id;
                    const filme = listaFilmes.find(function(filme) {
                        return filme.id == id;
                    });
                    idFilmeEmEdicao = filme.id;

                    campoTitulo.value = filme.titulo;
                    campoGenero.value = filme.genero;
                    campoAnoLancamento.value = filme.anoLancamento;
                    campoNota.value = filme.nota;
                    campoAssistido.checked = filme.assistido;
                });
            });

            botoesExcluir.forEach(function(botao) {
                botao.addEventListener("click", function() {
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
                console.log("Filme salvo com sucesso!");
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
                console.log("Filme atualizado com sucesso!");
                formulario.reset();

                carregarFilmes();
            }
            else {
                console.log(response.status, "Precisamos tratar esse erro!");
            }
        });
    }
});