$(document).ready(function(){
    home();
    $('#home').click(function(){
        home();
    });
    $('#sobre').click(function(){
        sobre();
    });
    $('#contato').click(function(){
        contato();
    });

});

function home(){
    $('section').html('<h1>Home</h1>');
}

function sobre(){
    $('section').html('<h1>Sobre</h1>');
}

function contato(){
    $('section').load('views/form.html', onSubmit);
}

class Form{
    constructor(nome, email, telefone, assunto){
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.assunto = assunto;
    }
    mostrar(){
        $('section').html(this.nome + '<br>' + this.email + '<br>' + this.telefone + '<br>' + this.assunto);
    }
}

function onSubmit(){
    $('form').submit(function(){
        
        let nome = $('#nome').val();
        let email = $('#email').val();
        let telefone = $('#telefone').val();
        let assunto = $('#assunto').val();

        var contato = new Form (nome, email, telefone, assunto);

        contato.mostrar();

    })
}

