const BlockChain = require('../src/blockchain');
const Block = require('../src/block');


describe('BlockChain', () => {
    let blockChain, newChain, originalChain;

    beforeEach(() => {
        blockChain = new BlockChain();
        newChain = new BlockChain();
        originalChain = blockChain.chain;
    });

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

    describe('isValidChain()', () => {
        beforeEach(() => {
            blockChain = new BlockChain();
            blockChain.AddBlock({data:'Bears'});
            blockChain.AddBlock({data:'Beers'});
            blockChain.AddBlock({data:'Beatles'});
        });
        describe('when the chain does not start with genesis block', () => {
            it('returns false', () => {
                blockChain.chain[0] = {data: 'fake-genesis-data'};
                expect(BlockChain.ValidateChain(blockChain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            describe('and a lastHash reference has changed', () => {
               it('returns false', () => {
                    blockChain.chain[2].lastHash = 'corrupted-hash';
                    expect(BlockChain.ValidateChain(blockChain.chain)).toBe(false);
               });
            });

            describe('and the chain contains a block with an invalid field', () => {
               it('returns false', () => {
                   blockChain.chain[2].data = 'some-bad-evil-data';
                   expect(BlockChain.ValidateChain(blockChain.chain)).toBe(false);
               });
            });

            describe('and the chain does not contains a block with an invalid field', () => {
               it('returns true', () => {
                   expect(BlockChain.ValidateChain(blockChain.chain)).toBe(true);
               });
            });
        });
    });

    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('does not replace the chain', () => {
                newChain.chain[0] = {new:'chain'};
                blockChain.ReplaceChain(newChain.chain);
                expect(blockChain.chain).toEqual(originalChain);
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain= new BlockChain();
                newChain.AddBlock({data:'Bears'});
                newChain.AddBlock({data:'Beers'});
                newChain.AddBlock({data:'Beatles'});
            });

            describe('and the incoming chain is invalid', () => {
                it('does not replace the chain', () => {
                    newChain.chain[2].hash = 'fake-hash';
                    blockChain.ReplaceChain(newChain.chain);
                    expect(blockChain.chain).toEqual(originalChain);
                });
            });

            describe('and the incoming chain is valid', () => {
                it('replaces the chain', () => {
                    blockChain.ReplaceChain(newChain.chain);
                    expect(blockChain.chain).toEqual(newChain.chain);
                });
            });
        });
    })
});