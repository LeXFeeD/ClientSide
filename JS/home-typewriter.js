$(document).ready(function () {
    var e = new Typewriter($("#heading")[0], {
        loop: !0,
        blinkSpeed: 50
    });
    e.typeString("в один клик!").pauseFor(850).deleteAll().pauseFor(650).typeString("в одно касание!").pauseFor(3500).deleteAll().pauseFor(250).typeString("в одно нажатие!").pauseFor(1500).deleteAll().pauseFor(700).typeString('в один щелчок!').start()
});