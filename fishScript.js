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
    '>? you can also use word variables (strings)' +
    '>& word hello = hello world' +
    '>$ print & hello' +
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

variables = {};
for (let i = 0; i < lines.length; i++) {
    while (lines[i].includes('\n')) {
        lines[i] = lines[i].replace('\n', '');
    }
}
//console.log(lines)

// The print function
function fishPrint(dataIn) {
    if (dataIn[0] === "@") {
        dataIn.shift()
        return "".concat(dataIn.join(" "))
    } else if (dataIn[0] === "&") {

        return variables[dataIn[1]]
    }
}

function variableDef(dataIn) {
    if (dataIn[0] === 'number') {
        dataIn.shift()
        variables[dataIn[0]] = eval(dataIn[2])
    } else if (dataIn[0] === 'word') {
        dataIn.shift()
        dataIn.shift()
        dataIn.shift()
        variables[dataIn[0]] = "".concat(dataIn.join(" "))
    }

}

//data = [];

// ACTUAL RUNNER

for (let line in lines) {
    let data = lines[line].split(" ")
    //console.log(lines[line])
    //variable definition
    if (data[0] === "&") {
        data.shift();
        variableDef(data);
    }

    //for running functions
    else if (data[0] === "$") {
        data.shift()

        //print function
        if (data.shift() === "print") {
            console.log(fishPrint(data))
        }
    }

    //loops
    else if (data[0] === "*") {
        data.shift()

        //for repeat loops(effectively for loops)
        if (data.shift() === "repeat") {
            let repeats = eval(data.shift())


            //repeated printing
            if (data.shift() === "print") {
                let toPrint = fishPrint(data)

                for (let i = 0; i < repeats; i++) {
                    console.log(toPrint)
                }
            }
        }
    }
}