let score = document.getElementById('score');
let highScore = document.getElementById('highScore');
let s = 0;
let h = localStorage.getItem('highScore') || 0;
highScore.innerHTML = `High Score: ${h}`;

// Move basket with mouse
document.querySelector('.container2').addEventListener('mousemove', (e) => {
    const basket = document.getElementById('basket');
    const container = document.querySelector('.container2');
    const containerRect = container.getBoundingClientRect();

    let x = e.clientX - containerRect.left - basket.offsetWidth / 2;
    let y = e.clientY - containerRect.top - basket.offsetHeight / 2;

    // Prevent basket from going outside container
    x = Math.max(0, Math.min(x, container.offsetWidth - basket.offsetWidth));
    y = Math.max(0, Math.min(y, container.offsetHeight - basket.offsetHeight));

    basket.style.left = `${x}px`;
    basket.style.top = `${y}px`;
});
``


// Collision detection
function checkCollision() {
  const basket = document.getElementById('basket');
  const basketRect = basket.getBoundingClientRect();

  document.querySelectorAll('.fruits').forEach(fruit => {
    const fruitRect = fruit.getBoundingClientRect();

    if (
      fruit.style.opacity !== "0" &&
      fruitRect.bottom >= basketRect.top &&
      fruitRect.top <= basketRect.bottom &&
      fruitRect.left <= basketRect.right &&
      fruitRect.right >= basketRect.left
    ) {
      fruit.style.opacity = 0; // Hide the fruit
      score.innerHTML = `Score: ${++s}`;
      if (s > h) {
        h = s;
        highScore.innerHTML = `High Score: ${h}`;
        localStorage.setItem('highScore', h);
      }

      // Reset fruit after 3 seconds so it can fall again
      setTimeout(() => {
        fruit.style.opacity = 1;
      }, 3000);
    }
  });
}

// Check for collisions every 100ms
setInterval(checkCollision, 100);