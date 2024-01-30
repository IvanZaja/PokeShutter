window.addEventListener("load", () => {
  const game = new Game("main-canvas");
  this.audioIntro = new Audio('/assets/sounds/route.wav');
  this.audioIntro.play();
  this.audioIntro.volume = 0.05;

  this.audioYes = new Audio("/assets/sounds/Choose.WAV");
  document.addEventListener("keydown", (event) => game.onKeyEvent(event));
  document.addEventListener("keyup", (event) => game.onKeyEvent(event));

  
  const startGameBtn = document.getElementById('myBtn');
  startGameBtn.addEventListener('click', () => {
    const startPanel = document.getElementById('panel');
    startPanel.classList.add('hidden');

    const canvasPanel = document.getElementById('main-canvas');
    canvasPanel.classList.remove('hidden');

    this.audioYes.play();
    this.audioYes.volume = 0.5;
    this.audioIntro.pause();

    game.start();
  })

  let controlsScreen = false;
  const controlsBtn = document.getElementById('myBtn2');
  controlsBtn.addEventListener('click', () => {
    const startPanel = document.getElementById('panel');
    startPanel.classList.add('hidden');

    const controlsPanel = document.getElementById('main-controls');
    controlsPanel.classList.remove('hidden');

    this.audioYes.play();
    this.audioYes.volume = 0.5;
    controlsScreen = true;
  })

    
  document.addEventListener('keydown', function(event) {        
    if (controlsScreen && event.code === 'Space') {
      location.reload(); 
    }      
  })      
    
  

  const mainMenuGameBtn = document.getElementById('myBtnGameOver2');
  mainMenuGameBtn.addEventListener('click', () => {
    location.reload();
  })

  const myBtnFinish = document.getElementById('myBtnFinish');
  myBtnFinish.addEventListener('click', () => {
    location.reload();
  })

});
