var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

let loginToken = "";

$(document).ready(function () {
    console.log("Carregou o arquivo de cursos.");

    loginToken = localStorage.getItem('login-token');
    if (!loginToken) {
        location.href = "login.html";
    }

    carregarCursosAdicionados();
    $(".addCurso").click(function () {
        adicionarCurso();
    });

});

function carregarCursosAdicionados() {
    $.ajax({
        type: "GET",
        url: URL_BASE + "/curso",
        headers: {
            "Authorization": "Bearer " + loginToken
        },
        success: function (data) {
            // console.log("Sucesso" + data);
            preencherDadosTabela(data);
        },
        error: function (data) {
            console.log("Erro" + data);
        },
        contentType: "application/json",
        dataType: "json"
    });
}

function preencherDadosTabela(dados) {

    let tableData = "";

    for (const linha of dados) {
        let urlSearch = "id_curso="+linha.id_curso   
                        +"&curso="+linha.nome
                        +"&duracao="+linha.duracao
                        +"&instituicao="+linha.instituicao;

        tableData += ''
            + '<tr>'
            + '<td>' +linha.id_curso+ '</td>'
            +'<td><a href="./editar-curso.html?'+urlSearch+'">'+linha.nome+'</td>'     
            + '<td>' +linha.duracao+ '</td>'
            + '<td>' +linha.instituicao+ '</td>'
            + '<td><button onclick="excluirCurso('+linha.id_curso+')">Excluir</button></td>'
            + '</tr>';

    }

    document.getElementById('tableData').innerHTML = tableData;
}

function excluirCurso(id_curso){
    $.ajax({
        type: "DELETE",
        url: URL_BASE + "/curso/" +id_curso,
        headers: {
            "Authorization": "Bearer " + loginToken
        },
        success: function (data) {
            location.reload();
        },
        error: function (data) {
            console.log("Erro" + data);
        },
        contentType: "application/json",
        dataType: "json"
    });
}

function adicionarCurso() {
    let nome = document.getElementById("inputGroup-nome").value;
    let duracao = document.getElementById("inputGroup-duracao").value;
    let instituicao = document.getElementById("inputGroup-instituicao").value;
    console.log(nome);
    console.log(duracao);
    console.log(instituicao);

    let data = {
        "nome": nome,
        "duracao": duracao,
        "instituicao": instituicao,
    }
    enviarCurso(data);
}

function enviarCurso(data) {
    console.log(data);
    dataFormatada = JSON.stringify(data);
    console.log(dataFormatada)

    $.ajax({
        type: "POST",
        url: URL_BASE + "/curso",
        data: dataFormatada,
        headers: {
            "Authorization": "Bearer " + loginToken
        },
        success: function (data) {
            // console.log("Sucesso" + data);
            limparCampos();
        },
        error: function (data) {
            // console.log("Erro" + data);
        },
        contentType: "application/json",
        dataType: "json"
    });
}

function limparCampos() {
    document.getElementById("inputGroup-nome").value = "";
    document.getElementById("inputGroup-duracao").value = "";
    document.getElementById("inputGroup-instituicao").value = "";
}
