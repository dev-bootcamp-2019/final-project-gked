/* eslint-disable */
import contract from 'truffle-contract'
import JournalContract from '@contracts/Journal.json'


const Journal = {
    contract: null,

    instance: null,

    init: function () {
        let self = this

        return new Promise(function (resolve, reject) {
            self.contract = contract(JournalContract);
            self.contract.setProvider(window.web3.currentProvider);

            self.contract.deployed().then(instance => {
                self.instance = instance;
                resolve();
            }).catch(err => {
                reject(err);
            })
        });
    },

    createJournalEntry: function (journalEntry, address) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.instance.create(
            [
                journalEntry,
                address
            ],
            {from: window.web3.eth.accounts[0]}
            ).then( tx => {
                resolve(tx);
            }).catch(err => {
                reject(err);
            });
        });
    },

    authorExists: function (address) {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.authorExists.call(
                address || window.web3.eth.defaultAccount, {
                    from: window.web3.eth.accounts[0]
                }
            ).then(authorExists => {
                resolve(authorExists);
            }).catch(err => {
                reject(err);
            })
        })
    },
}

export default Journal
