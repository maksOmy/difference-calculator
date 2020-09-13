import stylishFormat from './stylishFormat.js';
import jsonFormat from './jsonFormat.js';
import plainFormat from './plainFormat.js';
import gendiff from '../index.js';

const getFormatDiff = (filePath1, filePath2, format) => {
    const diff = gendiff(filePath1, filePath2);

    switch(format) {
        case 'plain':
            return plainFormat(diff);
        case 'json':
            return jsonFormat(diff);
        default:
            return stylishFormat(diff);
    }
};

export default getFormatDiff;