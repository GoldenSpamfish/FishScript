let code = '>? What a cool language am I right?\n' +
    '>? very practical isn\'t it?\n' +
    '>? well maybe not.\n' +
    '>? But this is the first every code written in fishScript!\n' +
    '>? Behold!\n' +
    '\n' +
    '>$ print @\n' +
    '>$ print @ obligatory "hello world!"\n' +
    '>$ print @\n' +
    '\n' +
    '\n' +
    '>? defines 3 variables (can make any number of these) (also they can use math!)\n' +
    '>& number num = 1+1*2\n' +
    '>& number othernum = 7.0\n' +
    '>& number thirdnum = 4\n' +
    '\n' +
    '>? prints out these 3 variables\n' +
    '>$ print @ displays our variables:\n' +
    '    >$ print & num\n' +
    '    >$ print & othernum\n' +
    '    >$ print & thirdnum\n' +
    '    >$ print @\n' +
    '    >? btw tabs dont do anything I just like how they look\n' +
    '\n' +
    '\n' +
    '>? demonstrates the loop function\n' +
    '>$ print @ prints the value of variable num 3 times:\n' +
    '    >* repeat 3 print & num\n' +
    '    >$ print @\n' +
    '    >$ print @ loops also work with text! See?\n' +
    '    >$ print @\n' +
    '    >* repeat 4 print @ knowledge is power';
lines = code.split('>');
data = [];
variables = {};
for (let i = 0; i < lines.length; i++) {
    while (lines[i].includes('\n')) {
        lines[i] = lines[i].replace('\n', '');
    }
}
console.log(lines)

// The print function
function fishPrint(dataIn) {
    if (dataIn[0] === "@") {
        dataIn.shift()
        return " ".join(dataIn)
    } else if (dataIn[0] === "&") {
        // meat of the print function (change to get element)
        console.log(dataIn)

        return variables[dataIn[1]]
    }
}

function variableDef(dataIn) {
    if (dataIn.pop() === "number") {
        delete dataIn[1]
        variables[dataIn[0]] = eval(dataIn[1])
    }

}

