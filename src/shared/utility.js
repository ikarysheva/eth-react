import SHA3 from 'crypto-js/sha3';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}

export const checkAddressValidity = (address) => {
    const basic = /^(0x)?[0-9a-f]{40}$/i;
    const smallCaps = /^(0x)?[0-9a-f]{40}$/;
    const allCaps = /^(0[x|X])?[0-9A-F]{40}$/;
    if (!basic.test(address)) {
        return false;
    } else if (smallCaps.test(address) || allCaps.test(address)) {
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
}

const sha3 = (value) => {
    return SHA3(value, {
        outputLength: 256
    }).toString();
}

export const isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x', '');
    let addressHash = sha3(address.toLowerCase());

    for (let i = 0; i < 40; i++) {
        // The nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
