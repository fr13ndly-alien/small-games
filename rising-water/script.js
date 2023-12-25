document.addEventListener('DOMContentLoaded', () => {
    const progressElement = document.getElementById('progress');
    const bodyElement = document.getElementsByTagName('body');

    const LOWER_SPEED = 1;
    const DEFAULT_TIME_INTERVAL = 100; // 0.5s
    const INIT_WAVE_HEIGHT = 10;
    const UNIT = 0.2;
    
    let isHoldingSpace = false;
    let isOver = false;
    let currentPercentage = 0;
    let interval;

    function startGame() {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);
    }

    function handleKeyPress(event) {
        if (event.key === ' ' && !isHoldingSpace) {
                
            if (!isOver) {
                isHoldingSpace = true;
                clearInterval(interval);
                interval = setInterval(increaseWave, DEFAULT_TIME_INTERVAL);
            } else {
                clearInterval(interval)
                interval = setInterval(doWin, 200);
            }
        }
    }

    function handleKeyRelease(event) {
        isHoldingSpace = false;
        if (event.key === ' ' && !isOver) {
            clearInterval(interval);
            interval = setInterval(decreaseWave, DEFAULT_TIME_INTERVAL);
        }
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

            const waveHeight = currentPercentage + INIT_WAVE_HEIGHT;
            const bottomHeight = waveHeight - 15;
            root.style.setProperty('--wave-height', waveHeight + 'vh');
            root.style.setProperty('--wave-bottom-height', bottomHeight + 'vh');
        }
    }

    startGame();
});
