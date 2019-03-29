/* eslint-disable */
import Web3 from 'web3'
import contract from 'truffle-contract'
import JournalContract from '@contracts/Journal.json'

/*
 * 1. Check for injected web3 (mist/metamask)
 * 2. If metamask/mist create a new web3 instance and pass on result
 * 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
 * 4. Get user account from metamask
 * 5. Get user balance
 * 6. Get list of Journals for given user
 */

 let getWeb3 = new Promise (function (resolve, reject) {
     // check for injected web3 (mist/metamask)
     var web3js = window.web3
     if(typeof web3js !== 'undefined') {
         var web3 = new Web3(web3js.currentProvider)
         resolve({
             injectedWeb3: web3.isConnected(),
             web3 () {
                 return web3
             }
         })
     } else {
         web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) // ganache fallback
         reject(new Error('Unable to connect to Metamask'))
     }
 })
 .then(result => {
     return new Promise(function(resolve, reject) {
        // retrieve network ID
        result.web3().version.getNetwork((err, networkId) => {
            if (err) {
                // If we can't find a networkId keep result  the same and reject the promise
                reject(new Error('Unable to retrieve network ID'))
            } else {
                // Assign the networkId property to our result and resolve promise
                result = Object.assign({}, result, { networkId })
                resolve(result)
            }
        })
     })
})
.then(result => {
    return new Promise(function (resolve, reject) {
        // Retrieve coinbase
        result.web3().eth.getCoinbase((err, coinbase) => {
            if (err) {
                reject(new Error('Unable to retrieve coinbase'))
            } else {
                result = Object.assign({}, result, { coinbase })
                resolve(result)
            }
        })
    })
})
.then(result => {
   return new Promise(function (resolve, reject) {
        // Retrieve balance for coinbase
        result.web3().eth.getBalance(result.coinbase, (err, balance) => {
            if (err) {
                reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
            } else {
                result = Object.assign({}, result, { balance })
                resolve(result)
            }
        })
    })
})
.then(result => {
    return new Promise(function (resolve, reject) {
        // retrieve list of journals
        result.web3().
    })
    Promise.all([
            web3.instance.getJournalEntryTitle.call(
                address || window.web3.eth.defaultAccount, {
                    from: window.web3.eth.accounts[0]
                }),
            web3.instance.getJournalEntryBody.call(
                address || window.web3.eth.defaultAccount, {
                    from: window.web3.eth.accounts[0]
                }),
            web3.instance.getJournalEntryTags.call(
                address || window.web3.eth.defaultAccount, {
                    from: window.web3.eth.accounts[0]
                })
        ])
        .then(results => commit('updateJournals', (results) => {
            let maxArrayLength = 0
            if (results[0].length >= results[1].length) {
                maxArrayLength = results[0].length
            } else {
                maxArrayLength = results[1].length
            }
            if (results[2].length >= maxArrayLength) {
                maxArrayLength = results[2].length
            }

            for (let t = 1; t < maxArrayLength; t++) {
                journalEntry.title = results[0][t]
                journalEntry.body = results[1][t]
                journalEntry.tag = results[2][t]
                journalEntries.push(journalEntry)
                console.log('Journal Entry #', t)
                console.log('Title: ', journalEntry.title)
                console.log('Body: ', journalEntry.body)
                console.log('Tags: ', journalEntry.tag)
            }
            results = results
        })).catch(error => {
            console.log(error)
        })
})

export default getWeb3
