var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

$(document).ready(function () {
    console.log("Carregou o arquivo de login.");
});

function login() {
    let email = document.getElementById("inputGroup-email").value;
    let senha = document.getElementById("inputGroup-senha").value;
    console.log(email);
    console.log(senha);

    let data = {
        "email": email,
        "senha": senha,
    }
    efetuarLogin(data);
}

function efetuarLogin(data) {
    console.log(data);
    dataFormatada = JSON.stringify(data);
    console.log(dataFormatada)

    $.ajax({
        type: "POST",
        url: URL_BASE + "/usuario/login",
        data: dataFormatada,
        success: function (data) {
            //console.log("Sucesso" + data);
            console.log(data.token);
            localStorage.setItem('login-token', data.token);
            location.href = "home-sistema.html";
        },
        error: function (data) {
            console.log("Erro" + data);
        },
        contentType: "application/json",
        dataType: "json"
    });
}
