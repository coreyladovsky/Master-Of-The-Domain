
import View from "./snake-view.js";

$l(() => {
  // $l("#gameover-page").hide();
  // html.getElementById("gameover").style.display = "none";
  let play = $l(".snake-attack");
    new View(play);
});
