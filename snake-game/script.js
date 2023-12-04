document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');

    let snakeX = 0;
    let snakeY = 0;
    let snakeDirection = 'right';
    let foodX, foodY;

    function startGame() {
        placeFood();
        setInterval(moveSnake, 200);
        document.addEventListener('keydown', changeDirection);
    }

    function moveSnake() {
        switch (snakeDirection) {
            case 'up':
                snakeY -= 20;
                break;
            case 'down':
                snakeY += 20;
                break;
            case 'left':
                snakeX -= 20;
                break;
            case 'right':
                snakeX += 20;
                break;
        }

        if (checkCollision()) {
            alert('Game Over!');
            snakeX = 0;
            snakeY = 0;
        }

        checkFoodCollision();
        updateSnake();
    }

    function updateSnake() {
        snake.style.left = snakeX + 'px';
        snake.style.top = snakeY + 'px';
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                snakeDirection = 'up';
                break;
            case 'ArrowDown':
                snakeDirection = 'down';
                break;
            case 'ArrowLeft':
                snakeDirection = 'left';
                break;
            case 'ArrowRight':
                snakeDirection = 'right';
                break;
        }
    }

    function checkCollision() {
        if (
            snakeX < 0 ||
            snakeY < 0 ||
            snakeX >= gameContainer.offsetWidth ||
            snakeY >= gameContainer.offsetHeight
        ) {
            return true;
        }

        return false;
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * (gameContainer.offsetWidth / 20)) * 20;
        foodY = Math.floor(Math.random() * (gameContainer.offsetHeight / 20)) * 20;

        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
    }

    function checkFoodCollision() {
        if (snakeX === foodX && snakeY === foodY) {
            placeFood();
        }
    }

    startGame();
});
