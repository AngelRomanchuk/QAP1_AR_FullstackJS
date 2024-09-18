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

}
