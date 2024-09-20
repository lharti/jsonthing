// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Component name:',
    },

    {
        type: 'input',
        name: 'path',
        message: 'Save to src/components/',
    },
]
