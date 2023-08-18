(() => {
  // src/game.js
  var game = {
    get() {
      const dom = document.createElement("div");
      dom.innerHTML = "hello";
      return dom;
    }
  };
  var game_default = game;

  // src/main.js
  console.log(game_default);
  document.body.append(game_default.get());
})();
//# sourceMappingURL=dist.js.map
