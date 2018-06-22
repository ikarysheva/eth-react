import web3 from '../../web3';
import { checkAddressValidity, isChecksumAddress } from '../../shared/utility';

describe('is address valid', () => {
    const fail_examples = [
        '0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232',
    ];
    const success_examples = [
        '0xc1912fee45d61c87cc5ea59dae31190fffff232d',
        'c1912fee45d61c87cc5ea59dae31190fffff232d',
        '0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D',
        '0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

    ];

    it('should return false for invalid addresses', () => {
        fail_examples.forEach((example) => {
            expect(checkAddressValidity(example)).toEqual(false);
        });
    });

    it('should return true for valid addresses', () => {
        success_examples.forEach((example) => {
            expect(checkAddressValidity(example)).toEqual(true);
        });
    });
});

describe('validate checksum', () => {
    const fail = [
        '0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'
    ];

    const success = [
        '0x52908400098527886E0F7030069857D2E4169EE7',
        '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
        '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
        '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'
    ];

    it('should return false for invalid checksum addresses', () => {
        fail.forEach((example) => {
            expect(isChecksumAddress(example)).toEqual(false);
        });
    });

    it('should return true for valid checksum addresses', () => {
        success.forEach((example) => {
            expect(isChecksumAddress(example)).toEqual(true);
        });
    });
});
