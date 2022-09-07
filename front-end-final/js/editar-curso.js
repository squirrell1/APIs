var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

let id_curso = 0;
let loginToken = "";

$(document).ready(function () {
    console.log("Carregou o arquivo de editar cursos.");

    $('.cursoEditar').click(function () {
        editarCurso();
    });

    loginToken = localStorage.getItem('login-token');
    if (!loginToken) {
        location.href = "login.html";
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    id_curso = urlParams.get('id_curso');
    let curso_nome = urlParams.get('curso');
    let curso_duracao = urlParams.get('duracao');
    let curso_instituicao = urlParams.get('instituicao');

    $('.editar_curso_nome').val(curso_nome);
    $('.editar_curso_duracao').val(curso_duracao);
    $('.editar_curso_instituicao').val(curso_instituicao);

});

function editarCurso() {
    let curso_nome_atualizado = $('.editar_curso_nome').val();
    let curso_duracao_atualizado = $('.editar_curso_duracao').val();
    let curso_instituicao_atualizado = $('.editar_curso_instituicao').val();

    let dadosEditados = {
        "nome": curso_nome_atualizado,
        "duracao": curso_duracao_atualizado,
        "instituicao": curso_instituicao_atualizado
    }

    atualizarDadosCurso(dadosEditados).then(function (data) {
        location.href = 'curso.html'; 
    });
}

function atualizarDadosCurso(dadosEditados) {
    editedData = JSON.stringify(dadosEditados);

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "PUT",
            url: URL_BASE + "/curso/" + id_curso,
            data: editedData,
            headers: {
                "Authorization": "Bearer " + loginToken
            },
            success: function (data) {
                resolve(data);
            },
            error: function (data) {
               reject(data);
            },
            contentType: "application/json",
            dataType: "json"
        });
    });
}


