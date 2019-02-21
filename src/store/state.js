/* eslint-disable */
let state = {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    journals: [{
        journal: {
            title: null,
            body: null,
            encrypt: false,
            tags: null
        },
    }],
    contractInstance: null
}

export default state
