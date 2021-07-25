const Block = require('../src/block');
const CryptoHash = require("../src/crypto-hash");
const {GENESIS_DATA} = require('../src/config');

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-last-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({timestamp, lastHash, hash, data});

    it('has a timestamp, lastHash, hash and data properties', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.Genesis();

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns a Genesis Data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        });
    })

    describe('mineBlock()', ()=> {
        const lastBlock = Block.Genesis();
        const data = 'mined_data';
        const minedBlock = Block.MineBlock({lastBlock, data});

        it('returns a new Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timeStamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
           expect(minedBlock.hash)
               .toEqual(CryptoHash(minedBlock.timestamp, lastBlock.hash, data));
        });
    })
});