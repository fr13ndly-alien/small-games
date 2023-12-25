document.addEventListener('DOMContentLoaded', () => {
    const progressElement = document.getElementById('progress');
    const bodyElement = document.getElementsByTagName('body');

    const DEFAULT_TIME_INTERVAL = 16.7; // 0.5s
    const UNIT = 0.1;
    
    let isHoldingSpace = false;
    let isOver = false;
    let currentPercentage = 0;
    let interval;

    function startGame() {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);

        document.addEventListener('touchstart', onSpacePress);
        document.addEventListener('touchsend', onSpaceRelease);
    }

    function handleKeyPress(event) {
        console.log('>> event: ' ,event);
        if (event.key === ' ' && !isHoldingSpace) {
            onSpacePress();
        }
            
    }
 
    function handleKeyRelease(event) {
        isHoldingSpace = false;
        if (event.key === ' ' && !isOver) {
            onSpaceRelease()
        }
    }

    function onSpacePress() {
        if (!isOver) {
            isHoldingSpace = true;
            clearInterval(interval);
            interval = setInterval(increaseWave, DEFAULT_TIME_INTERVAL);
        } else {
            clearInterval(interval)
            interval = setInterval(doWin, 200);
        }
    }

    function onSpaceRelease() {
        clearInterval(interval);
        interval = setInterval(decreaseWave, DEFAULT_TIME_INTERVAL);
    }

    function increaseWave() {
        if (currentPercentage < 100) {
            // currentPercentage = Math.round(currentPercentage + raiseSpeed);
            currentPercentage += UNIT;
            updateWave();
        } else {
            isOver = true;
            clearInterval(interval);
        }
    }

    function doWin() {
        // expand the heart and do exploit
        console.log('>> do win..');
    }

    function decreaseWave() {
        console.log('>> lower heart');
        if (currentPercentage > 0) {
            // currentPercentage -= LOWER_SPEED;
            currentPercentage -= UNIT;
            updateWave();
        } else {
            clearInterval(interval);
            isOver = true;
        }
    }

    function updateWave() {
        if (currentPercentage > 0) {
            console.log('>> increasing wave: ', currentPercentage);
            const root = document.documentElement;

            root.style.setProperty('--loaded-height', currentPercentage + 'vh');
        }
    }

    startGame();
});
