// Creates two dictionaries to map Braille to English
let dictionary = createDictionary();
let numbersDictionary = createNumbersDictionary();

function main() {
    const args = process.argv.slice(2);
    const input = args.join(' ');
    if (isBraille(input)) {
        brailleToEnglish(input);
    }
    else englishToBraille(input);
}

/**
 * Checks if input is Braille
 * @param input - string to check
 * @returns boolean - true if Braille, false if otherwise
 */
function isBraille(input) {
    // Braille symbols are divided into 6 character strings
    if (input.length % 6 != 0) return false;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) !== 'O' && input.charAt(i) !== '.') return false;
    }
    return true;
}

/**
 * Function for translating Braille input to English
 * @param input - the string passed to the application
 */
function englishToBraille(input) {
    let numberPresent = false;
    // For each character in the input
    for (let index = 0; index < input.length; index++) {
        if (!isNumber(input.charAt(index))) numberPresent = false;
        // Checks if a letter is capitalized
        // If so, output the capital follows symbol
        if (input.charAt(index) !== ' ' && isUpperCase(input.charAt(index))) {
            process.stdout.write('.....O');
        }
        if (isNumber(input.charAt(index)) && numberPresent == false) {
            numberPresent = true;
            process.stdout.write('.O.OOO');
        }
        if (numberPresent) {
            let brailleForm = numbersDictionary.get(input.charAt(index));
            // Output in Braille
            process.stdout.write(brailleForm);
        }
        else {
            // Find the current character within the dictionary
            let brailleForm = dictionary.get(input.charAt(index).toUpperCase());
            // Output in Braille
            process.stdout.write(brailleForm);
        }

    }
}

/**
 * Function to translate Braille to English
 * @param input - the string passed to the application 
 */
function brailleToEnglish(input) {
    let numberPresent = false;
    let upperCase = false;
    // phrase contains the Braille symbols as a 6 character string
    let phrase = "";
    let count = 0;
    for (let index = 0; index < input.length; index++) {
        phrase += input.charAt(index);
        count++;
        // The Braille string has been built after count is 6
        if (count == 6) {
            if (phrase === '.....O') {
                upperCase = true;
            }
            if (phrase === '......') {
                numberPresent = false;
            }
            if (phrase === '.O.OOO') {
                numberPresent = true;
            }

            // Find the English equivalent of the Braille
            let key = "";
            if (numberPresent) {
                key = printToEnglish(numbersDictionary, phrase);
                process.stdout.write(key);
            }
            if (!numberPresent) {
                key = printToEnglish(dictionary, phrase);
                if (!upperCase) process.stdout.write(key.toLowerCase());
                else process.stdout.write(key);
                // After uppercase letter has been printed, set upperCase to false
                if (phrase !== '.....O') upperCase = false;
            }

            // Reset phrase and count
            phrase = "";
            count = 0;
        }
    }
}

/**
 * 
 * @param dictionary - holds key-value pairs to translate Braille to English
 * @param brailleForm - the Braille string to convert
 * @returns a string in English
 */
function printToEnglish(map, brailleForm) {
    for (let [key, value] of map) {
        if (value === brailleForm) return key;
    }
    return "";
}

/**
 * Function to create a dictionary used for translating Braille to English and vice-versa
 * @returns dictionary - contains the Braille equivalent for each letter or special character
 */
function createDictionary() {
    const dictionary = new Map();
    dictionary.set('A', 'O.....');
    dictionary.set('B', 'O.O...');
    dictionary.set('C', 'OO....');
    dictionary.set('D', 'OO.O..');
    dictionary.set('E', 'O..O..');
    dictionary.set('F', 'OOO...');
    dictionary.set('G', 'OOOO..');
    dictionary.set('H', 'O.OO..');
    dictionary.set('I', '.OO...');
    dictionary.set('J', '.OOO..');
    dictionary.set('K', 'O...O.');
    dictionary.set('L', 'O.O.O.');
    dictionary.set('M', 'OO..O.');
    dictionary.set('N', 'OO.OO.');
    dictionary.set('O', 'O..OO.');
    dictionary.set('P', 'OOO.O.');
    dictionary.set('Q', 'OOOOO.');
    dictionary.set('R', 'O.OOO.');
    dictionary.set('S', '.OO.O.');
    dictionary.set('T', '.OOOO.');
    dictionary.set('U', 'O...OO');
    dictionary.set('V', 'O.O.OO');
    dictionary.set('W', '.OOO.O');
    dictionary.set('X', 'OO..OO');
    dictionary.set('Y', 'OO.OOO');
    dictionary.set('Z', 'O..OOO');
    dictionary.set('.', '..OO.O');
    dictionary.set(',', '..O...');
    dictionary.set('?', '..O.OO');
    dictionary.set('!', '..OOO.');
    dictionary.set(':', '..OO..');
    dictionary.set(';', '..O.O.');
    dictionary.set('-', '....OO');
    dictionary.set('/', '.O..O.');
    dictionary.set('<', '.OO..O');
    dictionary.set('>', 'O..OO.');
    dictionary.set('(', 'O.O..O');
    dictionary.set(')', '.O.OO.');
    dictionary.set(' ', '......');
    dictionary.set('', '.O.OOO');
    return dictionary;
}

/**
 * Function to create a dictionary used for translating Braille to English and vice-versa
 * @returns numbers - contains the Braille equivalent for each number
 */

function createNumbersDictionary() {
    const numbers = new Map();
    numbers.set('1', 'O.....');
    numbers.set('2', 'O.O...');
    numbers.set('3', 'OO....');
    numbers.set('4', 'OO.O..');
    numbers.set('5', 'O..O..');
    numbers.set('6', 'OOO...');
    numbers.set('7', 'OOOO..');
    numbers.set('8', 'O.OO..');
    numbers.set('9', '.OO...');
    numbers.set('0', '.OOO..');
    dictionary.set('', '.O.OOO');
    return numbers;
}

/**
 * Determines if the character passed is uppercase
 * @param currCharacter - the string passed to the application
 * @returns boolean - true if the character is uppercase, false otherwise
 */
function isUpperCase(currCharacter) {
    if (isNumber(currCharacter)) return false;
    for (let [key, value] of dictionary) {
        if (currCharacter === key) return true;
    }
    return false;
}

/**
 * Determines if the character passed is a letter
 * @param currCharacter - the character to check
 * @returns boolean - true if character is a letter, false otherwise
 */
function isLetter(currCharacter) {
    if (currCharacter === '.' || currCharacter === ',' || currCharacter === '?' || currCharacter === '!' || currCharacter === ':' || currCharacter === ';' || currCharacter === '-' || currCharacter === '/'
        || currCharacter === '<' || currCharacter === '>' || currCharacter === ')' || currCharacter === '(' || currCharacter === ' ' || currCharacter === '1' || currCharacter === '2' || currCharacter === '3' || currCharacter === '4'
        || currCharacter === '5' || currCharacter === '6' || currCharacter === '7' || currCharacter === '8' || currCharacter === '9' || currCharacter === '0') return false;
    return true;
}

/**
 * Determines if the character passed is a number
 * @param currCharacter - the character to check
 * @returns boolean - true if character is a number, false otherwise
 */
function isNumber(currCharacter) {
    if (currCharacter === '1' || currCharacter === '2' || currCharacter === '3' || currCharacter === '4' || currCharacter === '5' || currCharacter === '6'
        || currCharacter === '7' || currCharacter === '8' || currCharacter === '9' || currCharacter === '0') return true;
    return false;
}

main();