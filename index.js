#!/usr/bin/env node

import process from 'node:process';

// Function to generate the password
const generatePassword = (length, useNumbers, useUppercase, useSymbols) => {
    // Usable static characters
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!#$%&?';

    // Set of used characters in generating password
    const characterSet = lowercase;

    if(useNumbers){ characterSet += numbers };
    if(useUppercase){ characterSet += uppercase };
    if(useSymbols){ characterSet += symbols };

    // Generate password
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    return password;
};

const args = process.argv.slice(2);
// Default argumants
const options = {
    length: 8,
    useNumbers: false,
    useUppercase: false,
    useSymbols: false
}; 

// Handle argumants
args.forEach(arg => {

    if (arg.startsWith('--length=')) {
        const lengthValue = parseInt(arg.split('=')[1]); // Get number for a length

        // Handle length
        if (!isNaN(lengthValue) && lengthValue > 0) {
            options.length = lengthValue;
        } else {
            console.error('Error: Invalid length provided. It must be a positive number.');
            process.exit(1);
        }
    }

    // Handle numbers
    else if (arg === '--numbers') {
        options.useNumbers = true;
    }
    // Handle uppercase
    else if (arg === '--uppercase') {
        options.useUppercase = true;
    }
    // Handle symbols
    else if (arg === '--symbols') {
        options.useSymbols = true;
    }


    // Handle Options
    else if (arg === '--help' || arg === '-h') {
        console.log(`Usage: password-generator [options]

Options:
    Can use more than one option at ones. Write them one after another with a space between them.

    --length=<length>    Specify the length of the password (default: 8);
    --numbers            Include numbers in the password;
    --uppercase          Include uppercase letters in the password;
    --symbols            Include symbols in the password;
    --help, -h           Display this help message`);
    
        process.exit(0);
    }

    // Handle Error
    else {
        console.error(`Error: Unrecognized option '${arg}'. Use --help for available options.`);
        process.exit(1);
    }
});


// Generate and print password
const password = generatePassword(options.length, options.useNumbers, options.useUppercase, options.useSymbols);
console.log(`Generated Password: ${password}`);
