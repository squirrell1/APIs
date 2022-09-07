var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

$(document).ready(function () {
    console.log("Carregou o arquivo de home.");

    loginToken = localStorage.getItem('login-token');
    if (!loginToken) {
        location.href = "login.html";
    }

    getDadosUsuario().then(function (data) {
        document.getElementById("usuario_id").innerHTML = data.id_usuario;
        document.getElementById("usuario_email").innerHTML = data.email;
    })
    $(".token").val(loginToken)
});

function getDadosUsuario(){
    return new Promise(function(resolve, reject){
        $.ajax({
            type: "GET",
            url: URL_BASE + "/usuario/dados",
            headers:{
                "Authorization": "Bearer " + loginToken
            },
            success: function(data){
                resolve(data.user);
            },
            error: function(data){
                reject(data.message);
            },
            contentType: "application/json",
            dataType: "json"
        })
    })
}