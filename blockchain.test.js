const BlockChain = require('./blockchain');
const Block = require('./block');


describe('BlockChain', () => {
    const blockChain = new BlockChain();

    it('contains a `chain` Array instance', () => {
        expect(blockChain.chain instanceof Array).toBe(true);
    });

    it('starts with a genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.Genesis());
    });

    it('can add new block to the chain', () => {
        const newData = 'foo bar';
        blockChain.AddBlock({data: newData});
        expect(blockChain.chain[blockChain.chain.length -1].data).toEqual(newData);
    });

});