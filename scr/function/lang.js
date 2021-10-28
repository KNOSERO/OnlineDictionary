const fs = require('fs');

module.exports = function() {

    const dict = new Map();

    /** FUNKCJA ZWRACA JAKIE MAMY PLIKI W KATALOGU */
    const _readFromDir = (path) => fs.readdirSync(path).filter(file => file.endsWith('.json'));
    /** FUNKCJA ZWRACA ZAWARTOŚĆ PLIKU */
    const _readFromFile = (path) => fs.readFileSync(path).toString();

    /** FUNKCJA POBIERA Z KATALOGU WSZYSTKIE SŁOWNIKI */
    function readDictionaries(path) {
        for(const file of _readFromDir(path)) {
            const name = (`${file}`).replace(".json", "");
            dict.set(name, JSON.parse(_readFromFile(path + file)));
        }
        console.log('READ DICTIONARY...');
    }

    /** SPRAWDZA CZY SŁOWO ISTNIEJE
     * 
     * @param {*} word SŁOWO
     * @param {*} lang WYBÓR JEZYKA
     * @returns ZWRACA TYLKO TRUE GDY SŁOWO ISTNIEJE W DANYM SŁOWNIKU
     */
    const findWord = (word, lang) => 
        dict.has(lang) 
            ? dict.get(lang).includes(word)
            : false;

    /** SPRAWDZA CZY SŁOWO ISTNIEJE KTÓRE JEST NA POCZĄTKU ZDANIA
     * 
     * @param {*} word SŁOWO
     * @param {*} lang WYBÓR JEZYKA
     * @returns ZWRACA TYLKO TRUE GDY SŁOWO ISTNIEJE W DANYM SŁOWNIKU
     */
    const findWordWithLarge = (word, lang) => {
        const word2 = word.charAt(0).toLowerCase() + word.slice(1);
        return dict.has(lang) 
            ? (dict.get(lang).includes(word) || dict.get(lang).includes(word2))
            : false;
    }
            
    return {
        readDictionaries,
        findWord,
        findWordWithLarge,
    }

}