window.addEventListener("load", () => {
  const game = new Game("main-canvas");
  //window.game = game

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

  const controlsBtn = document.getElementById('myBtn2');
  controlsBtn.addEventListener('click', () => {
    const startPanel = document.getElementById('panel');
    startPanel.classList.add('hidden');

    const controlsPanel = document.getElementById('main-controls');
    controlsPanel.classList.remove('hidden');

    const acceptBtn = document.getElementById('myBtnAccept');
    acceptBtn.addEventListener("keydown", (event) => {
      const startPanel = document.getElementById('panel');
      startPanel.classList.remove('hidden');
  
      const controlsPanel = document.getElementById('main-controls');
      controlsPanel.classList.add('hidden');
    })
  })

  const mainMenuGameBtn = document.getElementById('myBtnGameOver2');
  mainMenuGameBtn.addEventListener('click', () => {
    location.reload();
  })
});
