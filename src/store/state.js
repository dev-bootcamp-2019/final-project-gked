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
    journal: {
        title: null,
        body: null,
        encrypt: false,
        tags: null
    },
    journals: [],
    contractInstance: null
}
export default state
