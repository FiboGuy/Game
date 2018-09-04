var button=document.getElementById("button");
button.addEventListener("click",function(){
    $("#button").remove();
    $("body").css("background-image","none");
    $("body").append("<canvas id='canvas'></canvas>")
    var game=new Game("canvas");
    game.start();

})