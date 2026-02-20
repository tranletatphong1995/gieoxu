/**
 * animation.js - Coin Flip & Line Drawing Animations
 */

const Animation = {
    /**
     * Animate throwing 3 coins
     * @param {number[]} coinResults - Array of 3 results (0=yin, 1=yang)
     * @param {Function} onComplete - Callback when animation finishes
     */
    throwCoins(coinResults, onComplete) {
        const coins = document.querySelectorAll('.coin');
        const coinArea = document.querySelector('.coin-area');

        // Reset coins
        coins.forEach(coin => {
            coin.className = 'coin';
            coin.querySelector('.coin-front').textContent = '';
        });

        // Add shaking animation to container
        coinArea.classList.add('shaking');

        setTimeout(() => {
            coinArea.classList.remove('shaking');

            // Flip each coin with stagger
            coins.forEach((coin, i) => {
                setTimeout(() => {
                    const isYang = coinResults[i] === 1;
                    coin.classList.add('flipping');

                    setTimeout(() => {
                        coin.classList.remove('flipping');
                        coin.classList.add(isYang ? 'yang-result' : 'yin-result');
                        const front = coin.querySelector('.coin-front');
                        front.textContent = isYang ? '陽' : '陰';
                    }, 400);
                }, i * 250);
            });

            // Callback after all coins settled
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 3 * 250 + 600);
        }, 600);
    },

    /**
     * Add a line to the hexagram display with animation
     * @param {number} index - Line index (0-5, bottom to top)
     * @param {object} throwResult - Result from Divination.throwThreeCoins()
     */
    addLine(index, throwResult) {
        const container = document.getElementById('lines-display');
        const lineEl = document.createElement('div');
        lineEl.className = 'hex-line';
        lineEl.setAttribute('data-index', index);

        const lineNumber = document.createElement('span');
        lineNumber.className = 'line-number';
        lineNumber.textContent = `${index + 1}`;

        const lineBar = document.createElement('div');
        lineBar.className = 'line-bar';

        if (throwResult.isYang) {
            lineBar.classList.add('yang');
            lineBar.innerHTML = '<div class="bar-solid"></div>';
        } else {
            lineBar.classList.add('yin');
            lineBar.innerHTML = '<div class="bar-half"></div><div class="bar-gap"></div><div class="bar-half"></div>';
        }

        // Moving line indicator
        if (throwResult.isMoving) {
            lineBar.classList.add('moving');
        }

        lineEl.appendChild(lineNumber);
        lineEl.appendChild(lineBar);

        // Show simple O/X marker for moving lines
        if (throwResult.isMoving) {
            const lineLabel = document.createElement('span');
            lineLabel.className = 'line-label moving-label';
            lineLabel.textContent = throwResult.value === 9 ? 'O' : 'X';
            lineEl.appendChild(lineLabel);
        }

        // Insert at the top (lines build bottom-to-top visually)
        container.insertBefore(lineEl, container.firstChild);

        // Trigger animation
        requestAnimationFrame(() => {
            lineEl.classList.add('visible');
        });
    },

    /**
     * Show the final result with animation
     */
    showResult(result) {
        const resultEl = document.getElementById('result');
        resultEl.style.display = '';

        // Build main hexagram display
        this.buildHexagramDisplay('main-hex', result.mainLines, result.mainHex, result.throws);

        if (result.hasMoving) {
            document.getElementById('changed-section').style.display = '';
            document.getElementById('changed-hex').style.display = '';
            this.buildHexagramDisplay('changed-hex', result.changedLines, result.changedHex, null);
        } else {
            document.getElementById('changed-section').style.display = 'none';
            document.getElementById('changed-hex').style.display = 'none';
        }

        // Animate in
        setTimeout(() => {
            resultEl.classList.add('visible');
        }, 100);
    },

    /**
     * Build hexagram visual display
     */
    buildHexagramDisplay(containerId, lines, hexInfo, throws) {
        const container = document.getElementById(containerId);
        const linesContainer = container.querySelector('.hex-lines');
        const nameEl = container.querySelector('.hex-name');
        const chineseEl = container.querySelector('.hex-chinese');
        const upperEl = container.querySelector('.hex-upper');
        const lowerEl = container.querySelector('.hex-lower');

        linesContainer.innerHTML = '';

        // Draw lines from top (index 5) to bottom (index 0) for visual
        for (let i = 5; i >= 0; i--) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'result-line';

            const isYang = lines[i] === 1;
            const isMoving = throws && throws[i] && throws[i].isMoving;

            if (isYang) {
                lineDiv.classList.add('yang');
                lineDiv.innerHTML = '<div class="r-bar-solid"></div>';
            } else {
                lineDiv.classList.add('yin');
                lineDiv.innerHTML = '<div class="r-bar-half"></div><div class="r-bar-gap"></div><div class="r-bar-half"></div>';
            }

            if (isMoving) {
                lineDiv.classList.add('moving');
            }

            // Separator between upper and lower trigram
            if (i === 3) {
                const sep = document.createElement('div');
                sep.className = 'trigram-sep';
                linesContainer.appendChild(sep);
            }

            linesContainer.appendChild(lineDiv);
        }

        nameEl.textContent = hexInfo.name;
        chineseEl.textContent = hexInfo.chinese;
        upperEl.textContent = `${hexInfo.upper.symbol} ${hexInfo.upper.name} (${hexInfo.upper.element})`;
        lowerEl.textContent = `${hexInfo.lower.symbol} ${hexInfo.lower.name} (${hexInfo.lower.element})`;
    },

    /**
     * Reset all animations and displays
     */
    reset() {
        const coins = document.querySelectorAll('.coin');
        coins.forEach(coin => {
            coin.className = 'coin';
            coin.querySelector('.coin-front').textContent = '';
        });

        document.getElementById('lines-display').innerHTML = '';
        document.getElementById('result').style.display = 'none';
        document.getElementById('result').classList.remove('visible');
    }
};
