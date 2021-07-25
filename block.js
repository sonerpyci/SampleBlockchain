const CryptoHash = require("./crypto-hash");
const {GENESIS_DATA} = require('./config')

class Block {
    constructor({timestamp, lastHash, hash, data}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static Genesis() {
        return new this(GENESIS_DATA)
    }

    static MineBlock({lastBlock, data}) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;

        return new this({
            timestamp,
            lastHash,
            data,
            hash: CryptoHash(timestamp, lastHash, data),
        });
    }
}

module.exports = Block;