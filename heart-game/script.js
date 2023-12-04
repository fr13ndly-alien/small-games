document.addEventListener('DOMContentLoaded', () => {
    const heartBar = document.getElementById('heart-bar');
    const statusElement = document.getElementById('status');
    const lowerSpeed = 2;

    let isHoldingSpace = false;
    let isOver = false;
    let raiseSpeed = 5;
    let currentPercentage = 0;
    let interval;

    function setRaiseSpeed() {
        if (currentPercentage > 10) {
            raiseSpeed = 3;
        }
        if (currentPercentage > 40) {
            raiseSpeed = 2;
        }
        if (currentPercentage > 70) {
            raiseSpeed = 1;
        }
        if (currentPercentage < 80) {
            raiseSpeed = 0.7;
        }
        if (currentPercentage > 85) {
            raiseSpeed = 0.6;
        }
        if (currentPercentage > 90) {
            raiseSpeed = 0.5;
        }
        
    }

    function startGame() {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);
        displayGameStart();
    }

    function handleKeyPress(event) {
        if (event.key === ' ' && !isOver && !isHoldingSpace) {
            isHoldingSpace = true;
            clearInterval(interval);
            interval = setInterval(raiseHeart, 100);
        }
    }

    function handleKeyRelease(event) {
        isHoldingSpace = false;
        if (event.key === ' ' && !isOver) {
            clearInterval(interval);
            interval = setInterval(lowerHeart, 500);
        }
    }


    function raiseHeart() {
        setRaiseSpeed();
        if (currentPercentage < 100) {
            currentPercentage = Math.round(currentPercentage + raiseSpeed);
            displayRaising();
            updateHeart();
        } else {
            isOver = true;
            clearInterval(interval);
            displayWin();
        }
    }

    function lowerHeart() {
        console.log('>> lower heart');
        if (currentPercentage > 0) {
            currentPercentage -= lowerSpeed;
            displayLosing();
            updateHeart();
        } else {
            clearInterval(interval);
            isOver = true;
            displayLoss();
        }
    }

    function updateHeart() {
        heartBar.style.width = Math.round(currentPercentage) + '%';
    }

    function displayWin() {
        statusElement.textContent = 'Congratulations! You win!';
    }

    function displayLoss() {
        statusElement.textContent = 'Game over. You lost.';
    }

    function displayGameStart() {
        statusElement.textContent = "Hit space to start.";
    }

    function displayRaising() {
        statusElement.textContent = `Raising: ${currentPercentage}%`;
    }
    
    function displayLosing() {
        statusElement.textContent = `Losing: ${currentPercentage}%`;
    }

    startGame();
});
