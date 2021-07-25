const Block = require('./block');
const CryptoHash = require("./crypto-hash");

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

    ReplaceChain(chain) {
        if(chain.length < this.chain.length)
            return;


        if(!BlockChain.ValidateChain(chain))
            return;

        this.chain = chain;

    }

    static ValidateChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.Genesis()))
            return false;

        for (let i = 1; i < chain.length; i++){
            const { timestamp, lastHash, hash, data} = chain[i];
            const actualLastHash = chain[i-1].hash;

            if (lastHash !== actualLastHash)
                return false;

            const validatedHash = CryptoHash(timestamp, lastHash, data);

            if(hash !== validatedHash)
                return false;
        }
        return true;
    }

}

module.exports = BlockChain;