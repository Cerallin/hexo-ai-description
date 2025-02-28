const { convert } = require('html-to-text');

module.exports = function strip(content, ignoreEl) {
    const selectors = ignoreEl.map((tagName) => {
        return {
            selector: tagName,
            format: 'skip'
        };
    })
    const options = {
        wordwrap: false,
        ignoreImage: true,
        selectors
    };
    return convert(content, options);
}
