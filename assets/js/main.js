window.addEventListener("load", () => {
  const game = new Game("main-canvas");

  document.addEventListener("keydown", (event) => game.onKeyEvent(event));
  document.addEventListener("keyup", (event) => game.onKeyEvent(event));

  const startGameBtn = document.getElementById('myBtn');
  startGameBtn.addEventListener('click', () => {
    const startPanel = document.getElementById('panel');
    startPanel.classList.add('hidden');

    const canvasPanel = document.getElementById('main-canvas');
    canvasPanel.classList.remove('hidden');

    game.start();
  })

  const mainMenuGameBtn = document.getElementById('myBtnGameOver2');
  mainMenuGameBtn.addEventListener('click', () => {
    location.reload();
  })
});
