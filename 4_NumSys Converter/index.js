const form = document.querySelector('.numsys-form');
const selectValue = document.querySelector('#numsys-base-select');
const inputValue = document.querySelector('#numsys-value-input');

const numsys_title1 = document.querySelector('.title-1');
const numsys_input1 = document.querySelector('#input-slot-1');
const numsys_title2 = document.querySelector('.title-2');
const numsys_input2 = document.querySelector('#input-slot-2');
const numsys_title3 = document.querySelector('.title-3');
const numsys_input3 = document.querySelector('#input-slot-3');

const binary_regex = /[2-9]/g;
const octal_regex = /[8-9]/g;
const hexa_regex = /[A-Fa-f]/g;

const numsys_elements = [
    {
        name: "Binary",
        titles: ["Octal", "Decimal", "Hexadecimal"],
        values: []
    },
    {
        name: "Octal",
        titles: ["Binary", "Decimal", "Hexadecimal"],
        values: []
    },
    {
        name: "Decimal",
        titles: ["Binary" ,"Octal", "Hexadecimal"],
        values: []
    },
    {
        name: "Hexadecimal",
        titles: ["Binary", "Octal", "Decimal"],
        values: []
    }
]


selectValue.addEventListener('change', updateElements);

function updateElements() {
    value = inputValue.value;
    base = selectValue.value;

    if(validInputCheck(value, base)) {

        if(base === "2") {
            numsys_elements[0].values[1] = convertToDecimal(value, 2);
            numsys_elements[0].values[0] = convertFromDecimal(numsys_elements[0].values[1], 8);
            numsys_elements[0].values[2] = convertFromDecimal(numsys_elements[0].values[1], 16);
            update(numsys_elements[0]);
        }
        
        else if(base === "8") {
            numsys_elements[1].values[1] = convertToDecimal(value, 8);
            numsys_elements[1].values[0] = convertFromDecimal(numsys_elements[1].values[1], 2);
            numsys_elements[1].values[2] = convertFromDecimal(numsys_elements[1].values[1], 16);
            update(numsys_elements[1]);
        }

        else if(base === "10") {
            numsys_elements[2].values[0] = convertFromDecimal(value, 2);
            numsys_elements[2].values[1] = convertFromDecimal(value, 8);
            numsys_elements[2].values[2] = convertFromDecimal(value, 16);
            update(numsys_elements[2]);
        }

        else {
            numsys_elements[3].values[2] = convertToDecimal(value, 16);
            numsys_elements[3].values[0] = convertFromDecimal(numsys_elements[3].values[2], 2);
            numsys_elements[3].values[1] = convertFromDecimal(numsys_elements[3].values[2], 8);
            update(numsys_elements[3]);
        }
    }   
    else {
        console.log("Regex");
    }
}

function update(obj) {
    numsys_title1.innerText = obj.titles[0];
    numsys_title2.innerText = obj.titles[1];
    numsys_title3.innerText = obj.titles[2];
    numsys_input1.value = obj.values[0];
    numsys_input2.value = obj.values[1];
    numsys_input3.value = obj.values[2];
}

function validInputCheck(value, base) {
    switch(base) {
        case "2":
            if(value.match(binary_regex)) {
                return false;
            }
            else {
                return true;
            }
        case "8":
            if(value.match(octal_regex)) {
                return false;
            }
            else {
                return true;
        }
    }
    return true;
}

function hexadecimalCharacters(value, string) {
    if (string === "toChar") {
        switch(value) {
            case 10:
                return "A";
            case 11:
                return "B";
            case 12:
                return "C";
            case 13:
                return "D";
            case 14:
                return "E";
            case 15:
                return "F";
        }
    }

    else if (string === "toNum") {
        switch(value) {
            case "A" || "a":
                return "10";
            case "B" || "b":
                return "11";
            case "C" || "c":
                return "12";
            case "D" || "d":
                return "13";
            case "E" || "e":
                return "14";
            case "F" || "f":
                return "15";
        }
    }
}

function convertFromDecimal(value, base) {
    value = parseInt(value);

    let tempArr = [];
    let moduloOutput, j = 0;
    while (value >= base) {
        moduloOutput = value%base;
        value = value/base;
        value = Math.floor(value);
        moduloOutput = moduloOutput;

        if (base === 16 && moduloOutput >= 10) {
            let hexChar = hexadecimalCharacters(moduloOutput, "toChar");
            tempArr.push(hexChar);
        }
        
        else {
            tempArr.push(moduloOutput);
        }
    }
    
    if (value < base) {
        if (base === 16 && value >= 10) {
            let hexChar = hexadecimalCharacters(value, "toChar");
            tempArr.push(hexChar);
        }
        
        else {
            tempArr.push(value);
        }
    }

    var converted = "";
    for(let i = tempArr.length - 1;i>=0;i--) {
        converted += tempArr[i];
        j++;
    }

    return converted;
}




function convertToDecimal(value, base) {
    let power_range = value.length;
    let sentinel = power_range;
    let decimal_sum = 0;
    console.log(power_range);
    for (let i = 0 ; i < sentinel ; i++) {
        if(value[i].match(hexa_regex)) {
            let hexaChar = hexadecimalCharacters(value[i], "toNum");
            decimal_sum += parseInt(hexaChar) * (Math.pow(base, power_range - 1));
        }
        else {
            decimal_sum += parseInt(value[i]) * (Math.pow(base, power_range - 1));
        }

        power_range--; 
    }
    return decimal_sum;  
}