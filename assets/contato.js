$(document).ready(function(){

  $("#form-imovel").submit(function(event){
    event.preventDefault();

    var form = $(this).serializeArray();
    var message = "";

    form.forEach(function(entry) {
      message = message.concat("<b>"+entry.name+":</b> "+entry.value);
      message = message.concat("<br>");
    });

    $.ajax({
      url: "https://simple-form.com/contato@meualu.com.br?json",
      method: "POST",
      data: { name: form[3].value, message: message, subject: "[meuAlu] Cadastro de imovel!" },
    }).done(function() {
      $("#form-imovel")[0].reset();
      $(".not-thank").fadeOut(function(){
        $(".thank").fadeIn();
      });
    });
  });


  $("#form-procura").submit(function(event){
    event.preventDefault();

    var form = $(this).serializeArray();
    var message = "";

    form.forEach(function(entry) {
      message = message.concat("<b>"+entry.name+":</b> "+entry.value);
      message = message.concat("<br>");
    });

    $.ajax({
      url: "https://simple-form.com/contato@meualu.com.br?json",
      method: "POST",
      data: { name: form[3].value, message: message, subject: "[meuAlu] Procura de imovel!" },
    }).done(function() {
      $("#form-procura")[0].reset();
      $(".not-thank").fadeOut(function(){
        $(".thank").fadeIn();
      });
    });
  });
});
