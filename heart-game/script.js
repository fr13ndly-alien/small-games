document.addEventListener('DOMContentLoaded', () => {
    const progressElement = document.getElementById('progress');
    const bodyElement = document.getElementsByTagName('body');

    const LOWER_SPEED = 1;
    const DEFAULT_TIME_INTERVAL = 500; // 0.5s
    const INIT_HEART_SIZE = 5;
    const INIT_TEXT_SIZE = 2;

    let isCompletetd = false;
    let isHoldingSpace = false;
    let isOver = false;
    let raiseSpeed = 5;
    let currentPercentage = 0;
    let interval;
    let interval2;

    function setRaiseSpeed() {

        if (currentPercentage > 20 && currentPercentage < 60) {
            raiseSpeed = 2
        }

        if (currentPercentage > 80) {
            raiseSpeed = 1;
        }

        // to test the complete action
        raiseSpeed = 25;
    }

    function startGame() {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);
    }

    function handleKeyPress(event) {
        if (event.key === ' ' && !isHoldingSpace) {
            if (!isOver) {
                isHoldingSpace = true;
                clearInterval(interval);
                interval = setInterval(raiseHeart, DEFAULT_TIME_INTERVAL);
            }
        }
    }

    function handleKeyRelease(event) {
        isHoldingSpace = false;
        if (event.key === ' ' && !isOver) {
            clearInterval(interval);
            interval = setInterval(lowerHeart, DEFAULT_TIME_INTERVAL);
        }
    }

    function raiseHeart() {
        setRaiseSpeed();
        if (currentPercentage < 100) {
            currentPercentage = Math.round(currentPercentage + raiseSpeed);
            updateHeart();
        } else {
            isOver = true;
            clearInterval(interval);
            doWin();
        }
    }

    function doWin() {
        // expand the heart and do exploit
        if (!isCompletetd) {
            isCompletetd = true;
        }
    }

    function lowerHeart() {
        console.log('>> lower heart');
        if (currentPercentage > 0) {
            currentPercentage -= LOWER_SPEED;
            updateHeart();
        } else {
            clearInterval(interval);
            isOver = true;
        }
    }

    function updateHeart() {
        const percentage = Math.round(currentPercentage) + 'vh';
        updateProgress();
        if (currentPercentage > INIT_HEART_SIZE) {
            console.log('>> raising heart: ', percentage);
            const root = document.documentElement;
            root.style.setProperty('--heart-size', percentage);

            const roundedPercent = Math.round(currentPercentage);
            root.style.setProperty('--heart-height', roundedPercent + 'vh');
            root.style.setProperty('--heart-width', (roundedPercent * 1.3) + 'vh');
        }
    }

    function updateProgress() {
        const roundedPercent = Math.round(currentPercentage);
        const sizeInVh = roundedPercent/10;
        progressElement.textContent= `${roundedPercent} %`;
        if (sizeInVh > INIT_TEXT_SIZE) {
            progressElement.style.setProperty('font-size', `${sizeInVh}vh`);
        } else {
            progressElement.style.setProperty('font-size', `2vh`);
        }
    }

    startGame();
});
