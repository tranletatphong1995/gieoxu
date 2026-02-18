/**
 * hexagram.js - I Ching 64 Hexagram Data & Lookup
 * Trigram index: computed bottom-to-top binary
 * Key format: "upperIndex_lowerIndex"
 */

const TRIGRAMS = {
    0: { name: 'Khôn', chinese: '坤', element: 'Địa (Đất)', symbol: '☷' },
    1: { name: 'Chấn', chinese: '震', element: 'Lôi (Sấm)', symbol: '☳' },
    2: { name: 'Khảm', chinese: '坎', element: 'Thủy (Nước)', symbol: '☵' },
    3: { name: 'Đoài', chinese: '兌', element: 'Trạch (Đầm)', symbol: '☱' },
    4: { name: 'Cấn', chinese: '艮', element: 'Sơn (Núi)', symbol: '☶' },
    5: { name: 'Ly', chinese: '離', element: 'Hỏa (Lửa)', symbol: '☲' },
    6: { name: 'Tốn', chinese: '巽', element: 'Phong (Gió)', symbol: '☴' },
    7: { name: 'Càn', chinese: '乾', element: 'Thiên (Trời)', symbol: '☰' }
};

const HEXAGRAMS = {
    '7_7': { num: 1, name: 'Càn Vi Thiên', chinese: '乾為天', unicode: '䷀' },
    '0_0': { num: 2, name: 'Khôn Vi Địa', chinese: '坤為地', unicode: '䷁' },
    '2_1': { num: 3, name: 'Thủy Lôi Truân', chinese: '水雷屯', unicode: '䷂' },
    '4_2': { num: 4, name: 'Sơn Thủy Mông', chinese: '山水蒙', unicode: '䷃' },
    '2_7': { num: 5, name: 'Thủy Thiên Nhu', chinese: '水天需', unicode: '䷄' },
    '7_2': { num: 6, name: 'Thiên Thủy Tụng', chinese: '天水訟', unicode: '䷅' },
    '0_2': { num: 7, name: 'Địa Thủy Sư', chinese: '地水師', unicode: '䷆' },
    '2_0': { num: 8, name: 'Thủy Địa Tỷ', chinese: '水地比', unicode: '䷇' },
    '6_7': { num: 9, name: 'Phong Thiên Tiểu Súc', chinese: '風天小畜', unicode: '䷈' },
    '7_3': { num: 10, name: 'Thiên Trạch Lý', chinese: '天澤履', unicode: '䷉' },
    '0_7': { num: 11, name: 'Địa Thiên Thái', chinese: '地天泰', unicode: '䷊' },
    '7_0': { num: 12, name: 'Thiên Địa Bĩ', chinese: '天地否', unicode: '䷋' },
    '7_5': { num: 13, name: 'Thiên Hỏa Đồng Nhân', chinese: '天火同人', unicode: '䷌' },
    '5_7': { num: 14, name: 'Hỏa Thiên Đại Hữu', chinese: '火天大有', unicode: '䷍' },
    '0_4': { num: 15, name: 'Địa Sơn Khiêm', chinese: '地山謙', unicode: '䷎' },
    '1_0': { num: 16, name: 'Lôi Địa Dự', chinese: '雷地豫', unicode: '䷏' },
    '3_1': { num: 17, name: 'Trạch Lôi Tùy', chinese: '澤雷隨', unicode: '䷐' },
    '4_6': { num: 18, name: 'Sơn Phong Cổ', chinese: '山風蠱', unicode: '䷑' },
    '0_3': { num: 19, name: 'Địa Trạch Lâm', chinese: '地澤臨', unicode: '䷒' },
    '6_0': { num: 20, name: 'Phong Địa Quán', chinese: '風地觀', unicode: '䷓' },
    '5_1': { num: 21, name: 'Hỏa Lôi Phệ Hạp', chinese: '火雷噬嗑', unicode: '䷔' },
    '4_5': { num: 22, name: 'Sơn Hỏa Bí', chinese: '山火賁', unicode: '䷕' },
    '4_0': { num: 23, name: 'Sơn Địa Bác', chinese: '山地剝', unicode: '䷖' },
    '0_1': { num: 24, name: 'Địa Lôi Phục', chinese: '地雷復', unicode: '䷗' },
    '7_1': { num: 25, name: 'Thiên Lôi Vô Vọng', chinese: '天雷無妄', unicode: '䷘' },
    '4_7': { num: 26, name: 'Sơn Thiên Đại Súc', chinese: '山天大畜', unicode: '䷙' },
    '4_1': { num: 27, name: 'Sơn Lôi Di', chinese: '山雷頤', unicode: '䷚' },
    '3_6': { num: 28, name: 'Trạch Phong Đại Quá', chinese: '澤風大過', unicode: '䷛' },
    '2_2': { num: 29, name: 'Khảm Vi Thủy', chinese: '坎為水', unicode: '䷜' },
    '5_5': { num: 30, name: 'Ly Vi Hỏa', chinese: '離為火', unicode: '䷝' },
    '3_4': { num: 31, name: 'Trạch Sơn Hàm', chinese: '澤山咸', unicode: '䷞' },
    '1_6': { num: 32, name: 'Lôi Phong Hằng', chinese: '雷風恆', unicode: '䷟' },
    '7_4': { num: 33, name: 'Thiên Sơn Độn', chinese: '天山遯', unicode: '䷠' },
    '1_7': { num: 34, name: 'Lôi Thiên Đại Tráng', chinese: '雷天大壯', unicode: '䷡' },
    '5_0': { num: 35, name: 'Hỏa Địa Tấn', chinese: '火地晉', unicode: '䷢' },
    '0_5': { num: 36, name: 'Địa Hỏa Minh Di', chinese: '地火明夷', unicode: '䷣' },
    '6_5': { num: 37, name: 'Phong Hỏa Gia Nhân', chinese: '風火家人', unicode: '䷤' },
    '5_3': { num: 38, name: 'Hỏa Trạch Khuê', chinese: '火澤睽', unicode: '䷥' },
    '2_4': { num: 39, name: 'Thủy Sơn Kiển', chinese: '水山蹇', unicode: '䷦' },
    '1_2': { num: 40, name: 'Lôi Thủy Giải', chinese: '雷水解', unicode: '䷧' },
    '4_3': { num: 41, name: 'Sơn Trạch Tổn', chinese: '山澤損', unicode: '䷨' },
    '6_1': { num: 42, name: 'Phong Lôi Ích', chinese: '風雷益', unicode: '䷩' },
    '3_7': { num: 43, name: 'Trạch Thiên Quải', chinese: '澤天夬', unicode: '䷪' },
    '7_6': { num: 44, name: 'Thiên Phong Cấu', chinese: '天風姤', unicode: '䷫' },
    '3_0': { num: 45, name: 'Trạch Địa Tụy', chinese: '澤地萃', unicode: '䷬' },
    '0_6': { num: 46, name: 'Địa Phong Thăng', chinese: '地風升', unicode: '䷭' },
    '3_2': { num: 47, name: 'Trạch Thủy Khốn', chinese: '澤水困', unicode: '䷮' },
    '2_6': { num: 48, name: 'Thủy Phong Tỉnh', chinese: '水風井', unicode: '䷯' },
    '3_5': { num: 49, name: 'Trạch Hỏa Cách', chinese: '澤火革', unicode: '䷰' },
    '5_6': { num: 50, name: 'Hỏa Phong Đỉnh', chinese: '火風鼎', unicode: '䷱' },
    '1_1': { num: 51, name: 'Chấn Vi Lôi', chinese: '震為雷', unicode: '䷲' },
    '4_4': { num: 52, name: 'Cấn Vi Sơn', chinese: '艮為山', unicode: '䷳' },
    '6_4': { num: 53, name: 'Phong Sơn Tiệm', chinese: '風山漸', unicode: '䷴' },
    '1_3': { num: 54, name: 'Lôi Trạch Quy Muội', chinese: '雷澤歸妹', unicode: '䷵' },
    '1_5': { num: 55, name: 'Lôi Hỏa Phong', chinese: '雷火豐', unicode: '䷶' },
    '5_4': { num: 56, name: 'Hỏa Sơn Lữ', chinese: '火山旅', unicode: '䷷' },
    '6_6': { num: 57, name: 'Tốn Vi Phong', chinese: '巽為風', unicode: '䷸' },
    '3_3': { num: 58, name: 'Đoài Vi Trạch', chinese: '兌為澤', unicode: '䷹' },
    '6_2': { num: 59, name: 'Phong Thủy Hoán', chinese: '風水渙', unicode: '䷺' },
    '2_3': { num: 60, name: 'Thủy Trạch Tiết', chinese: '水澤節', unicode: '䷻' },
    '6_3': { num: 61, name: 'Phong Trạch Trung Phu', chinese: '風澤中孚', unicode: '䷼' },
    '1_4': { num: 62, name: 'Lôi Sơn Tiểu Quá', chinese: '雷山小過', unicode: '䷽' },
    '2_5': { num: 63, name: 'Thủy Hỏa Ký Tế', chinese: '水火既濟', unicode: '䷾' },
    '5_2': { num: 64, name: 'Hỏa Thủy Vị Tế', chinese: '火水未濟', unicode: '䷿' }
};

const Hexagram = {
    getTrigramIndex(line1, line2, line3) {
        return line1 + (line2 * 2) + (line3 * 4);
    },

    lookup(lines) {
        const lowerIdx = this.getTrigramIndex(lines[0], lines[1], lines[2]);
        const upperIdx = this.getTrigramIndex(lines[3], lines[4], lines[5]);
        const key = `${upperIdx}_${lowerIdx}`;
        const hex = HEXAGRAMS[key];
        return {
            ...hex,
            key,
            upper: TRIGRAMS[upperIdx],
            lower: TRIGRAMS[lowerIdx]
        };
    }
};
