

module.exports = function() {

    let textList = [];

    const set = (text) => {
        const textString = text.split('\n').join(' ');
        textList = textString.split('!')
            .join('! ')
            .split('! ')
            .join('?')
            .split('?')
            .join('? ')
            .split('? ')
            .join('.')
            .split('.')
            .join('. ')
            .split('. ');
        
        const lines = []
        for(const line of textList) {
            const arrayline = line.split(',')
                .join(', ')
                .split(', ')
                .join(' ')
                .split(' ')
                .filter(word => word != '');
            
            arrayline.length ? lines.push(arrayline) : null;
        }
        textList = lines;
    }

    const iterateToLine = (callback) => {
        const lines = [];
        for(const line of textList) {
            lines.push(callback(line));
        }
        textList = lines;
    }

    const get = () => {
        return textList;
    }

    return {
        set,
        get,
        iterateToLine
    }
}