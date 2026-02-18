/**
 * app.js - Main Application Controller
 */

const App = {
    state: 'idle', // idle | throwing | animating | complete
    currentLine: 0,
    throws: [],

    init() {
        document.getElementById('start-btn').addEventListener('click', () => this.startDivination());
        document.getElementById('throw-btn').addEventListener('click', () => this.throwCoins());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                if (this.state === 'idle') this.startDivination();
                else if (this.state === 'throwing') this.throwCoins();
                else if (this.state === 'complete') this.reset();
            }
        });
    },

    startDivination() {
        this.state = 'throwing';
        this.currentLine = 0;
        this.throws = [];

        // UI transitions
        document.getElementById('start-section').style.display = 'none';
        document.getElementById('throwing-section').style.display = '';
        document.getElementById('reset-btn').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        document.getElementById('result').classList.remove('visible');
        document.getElementById('lines-display').innerHTML = '';

        this.updateThrowInfo();
        Animation.reset();
    },

    throwCoins() {
        if (this.state !== 'throwing') return;
        this.state = 'animating';

        const throwBtn = document.getElementById('throw-btn');
        throwBtn.disabled = true;
        throwBtn.classList.add('disabled');

        // Perform the throw
        const result = Divination.throwThreeCoins();
        this.throws.push(result);

        // Animate coins
        Animation.throwCoins(result.coins, () => {
            // Add line to display
            Animation.addLine(this.currentLine, result);
            this.currentLine++;

            if (this.currentLine >= 6) {
                // All 6 lines thrown - show result
                this.state = 'complete';
                throwBtn.style.display = 'none';

                setTimeout(() => {
                    this.showResult();
                }, 500);
            } else {
                this.state = 'throwing';
                throwBtn.disabled = false;
                throwBtn.classList.remove('disabled');
                this.updateThrowInfo();
            }
        });
    },

    updateThrowInfo() {
        document.getElementById('current-line').textContent = this.currentLine + 1;

        // Update throw button text
        const throwBtn = document.getElementById('throw-btn');
        if (this.currentLine === 0) {
            throwBtn.textContent = '🪙 GIEO HÀO ĐẦU TIÊN';
        } else if (this.currentLine === 5) {
            throwBtn.textContent = '🪙 GIEO HÀO CUỐI CÙNG';
        } else {
            throwBtn.textContent = '🪙 GIEO TIẾP';
        }
    },

    showResult() {
        const analysisResult = Divination.analyzeThrows(this.throws);
        Animation.showResult(analysisResult);

        // Show reset button
        document.getElementById('reset-btn').style.display = '';
        document.getElementById('throw-info').classList.add('complete');
        document.getElementById('throw-info').querySelector('.info-text').textContent = 'Đã hoàn thành 6 hào';

        // Scroll to result
        setTimeout(() => {
            document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    },

    reset() {
        this.state = 'idle';
        this.currentLine = 0;
        this.throws = [];

        Animation.reset();

        document.getElementById('start-section').style.display = '';
        document.getElementById('throwing-section').style.display = 'none';
        document.getElementById('reset-btn').style.display = 'none';
        document.getElementById('throw-btn').style.display = '';
        document.getElementById('throw-btn').disabled = false;
        document.getElementById('throw-btn').classList.remove('disabled');
        document.getElementById('throw-info').classList.remove('complete');
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
