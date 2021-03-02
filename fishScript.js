let editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "fish"
});

function fishRunner() {
    let out = '';
    let code = editor.getValue()

    //console.log(code + "works")
    let lines = code.split('>');
    let variables = {};
    for (let i = 0; i < lines.length; i++) {
        while (lines[i].includes('\n')) {
            lines[i] = lines[i].replace('\n', '');
        }
    }
    //console.log(lines)

    // The print function
    function fishPrint(dataIn) {
        let printOut = '';
        //console.log(dataIn);
        if ((dataIn[0] === '-')) {
            if (dataIn[1] === '@') {
                dataIn.shift();
                dataIn.shift();
                printOut = printOut + (dataIn.join(' '));

            } else if (dataIn[1] === '&') {
                printOut = printOut + variables[dataIn[2]];
            }
        } else {
            if (dataIn[0] === '@') {
                dataIn.shift()
                printOut = printOut + (dataIn.join(' '));

            } else if (dataIn[0] === '&') {
                printOut = printOut + (variables[dataIn[1]]);
            }
            printOut = printOut + ('<br>');
        }
        //console.log(printOut);
        return printOut;
    }

    function variableDef(dataIn) {
        if (dataIn[0] === 'number') {
            dataIn.shift()
            variables[dataIn[0]] = eval(dataIn[2])
        } else if (dataIn[0] === 'word') {
            dataIn.shift()
            let varName = dataIn[0];
            dataIn.shift()
            dataIn.shift()
            variables[varName] = "".concat(dataIn.join(" "))
        } else if (dataIn[0] === 'if') {
            dataIn.shift()
            console.log(dataIn)
            let stateName = dataIn.shift();
            dataIn.shift();
            console.log(dataIn)
            let logic = "";
            while (dataIn[0] !== "#") {
                logic = logic + dataIn.shift();
                console.log(logic)
            }

            logic = eval(logic);
            variables[stateName] = logic;
            console.log(logic)
        }
    }

    //data = [];

    // ACTUAL RUNNER

    for (let line in lines) {
        let data = lines[line].split(' ')
        //console.log(lines[line])
        //variable definition
        if (data[0] === '&') {
            data.shift();
            variableDef(data);
        }

        //for running functions
        else if (data[0] === '$') {
            data.shift()

            //print function
            if (data.shift() === 'print') {
                out = out.concat(String(fishPrint(data)))
            }
        }

        //loops
        else if (data[0] === '*') {
            data.shift()

            //for repeat loops(effectively for loops)
            if (data[0] === 'repeat') {
                data.shift()
                let repeats = eval(data.shift())

                //repeated printing
                if (data.shift() === 'print') {
                    let toPrint = fishPrint(data)

                    for (let i = 0; i < repeats; i++) {
                        out = out.concat(String(toPrint))
                    }
                }
            }

            //if statements
            if (data[0] === 'if') {
                variableDef(data)
            }
        }
    }
    document.getElementById('output').innerHTML = out;
}
