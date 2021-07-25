const Block = require('./block');

class BlockChain {
    constructor() {
        this.chain = [Block.Genesis()];
    }

    AddBlock({ data }){
        const newBlock = Block.MineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push(newBlock);
    }
}

module.exports = BlockChain;