var button = document.getElementById("button");
button.addEventListener("click", function () {
    $("#button").remove();
    $("body").removeClass("start")
    $("#title").remove();
    $("body").append("<canvas id='canvas'></canvas>")
    var game = new Game("canvas");
    game.start();
});







