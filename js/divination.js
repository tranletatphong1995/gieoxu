/**
 * divination.js - Core Divination Engine
 * Uses crypto.getRandomValues() for cryptographically secure randomness
 */

const Divination = {
    /**
     * Throw a single coin using CSPRNG
     * @returns {number} 0 = Yin (Sấp/Tails), 1 = Yang (Ngửa/Heads)
     */
    throwCoin() {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % 2;
    },

    /**
     * Throw 3 coins independently
     * @returns {object} { coins: [0|1, 0|1, 0|1], value: 6|7|8|9, isYang, isMoving }
     *
     * Results:
     *   3 Yang (1,1,1) → sum=3 → value 9 → Old Yang (Dương Động) → changes to Yin
     *   2 Yang 1 Yin   → sum=2 → value 7 → Young Yang (Thiếu Dương) → static
     *   1 Yang 2 Yin   → sum=1 → value 8 → Young Yin (Thiếu Âm) → static
     *   3 Yin (0,0,0)  → sum=0 → value 6 → Old Yin (Âm Động) → changes to Yang
     */
    throwThreeCoins() {
        const coins = [this.throwCoin(), this.throwCoin(), this.throwCoin()];
        const sum = coins[0] + coins[1] + coins[2];

        // Map sum to traditional line values
        const valueMap = { 3: 9, 2: 7, 1: 8, 0: 6 };
        const value = valueMap[sum];

        return {
            coins,
            value,
            isYang: value === 7 || value === 9,
            isMoving: value === 6 || value === 9,
            label: this.getLabel(value)
        };
    },

    /**
     * Get Vietnamese label for line type
     */
    getLabel(value) {
        const labels = {
            9: 'Lão Dương (Dương Động)',
            7: 'Thiếu Dương',
            8: 'Thiếu Âm',
            6: 'Lão Âm (Âm Động)'
        };
        return labels[value];
    },

    /**
     * Cast a full hexagram (6 throws)
     * @returns {object} Full hexagram result with main and changed hexagrams
     */
    castFullHexagram() {
        const throws = [];
        for (let i = 0; i < 6; i++) {
            throws.push(this.throwThreeCoins());
        }
        return this.analyzeThrows(throws);
    },

    /**
     * Analyze array of 6 throws into hexagram result
     */
    analyzeThrows(throws) {
        // Main hexagram lines (1 = yang, 0 = yin)
        const mainLines = throws.map(t => t.isYang ? 1 : 0);
        const mainHex = Hexagram.lookup(mainLines);

        // Check for moving lines
        const movingLines = throws.map((t, i) => t.isMoving ? i : -1).filter(i => i >= 0);
        const hasMoving = movingLines.length > 0;

        let changedHex = null;
        let changedLines = null;

        if (hasMoving) {
            // Changed hexagram: flip moving lines
            changedLines = throws.map(t => {
                if (t.value === 9) return 0;  // Old Yang → Yin
                if (t.value === 6) return 1;  // Old Yin → Yang
                return t.isYang ? 1 : 0;      // Static lines stay
            });
            changedHex = Hexagram.lookup(changedLines);
        }

        return {
            throws,
            mainLines,
            mainHex,
            changedLines,
            changedHex,
            movingLines,
            hasMoving
        };
    }
};
