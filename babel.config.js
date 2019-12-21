module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: [
                        '> 2%',
                        'ie 11',
                        'safari > 9'
                    ]
                }
            }
        ]
    ]
};
