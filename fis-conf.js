const vfis = require('vfis');

vfis({
    ignore: ['*.js'],
    input: 'src/(*.html)',
    output: {
        default:{
            basePath: 'assets',
            pagePath: '',
            url: '',
            domain: '',
        }
    },
    modules: {
        packages: [{
            name: 'user',
            location: 'src/user',
            main: 'info.js'
        }]
    },
    pack: {
        vendor: {
            'vender.js': ['node_modules/requirejs/**']
        },
        ignore: ['src/resourcemap.js']
    }
});

fis.match('/src/player/**', {
    isMod: false
});