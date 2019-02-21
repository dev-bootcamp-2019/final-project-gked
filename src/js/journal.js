/* eslint-disable */
import contract from 'truffle-contract'
import JournalContract from '@contracts/Journal.json'
import getWeb3 from '../util/getWeb3'


const Journal = {
    contract: null,

    instance: null,

    init: function () {
        let self = this

        return new Promise(function (resolve, reject) {
            self.contract = contract(JournalContract);
            self.contract.setProvider(getWeb3.currentProvider);
            self.contract.deployed().then(instance => {
                self.instance = instance;
                resolve();
            }).catch(err => {
                reject(err);
            })
        });
    },
    createJournalEntry: function (journalEntry, author) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.instance.createJournalEntry(
                journalEntry.title,
                journalEntry.body,
                journalEntry.encrypt,
                journalEntry.tags,
                author || window.web3.eth.defaultAccount,
            {from: window.web3.eth.accounts[0]}
            ).then( tx => {
                resolve(tx);
            }).catch(err => {
                reject(err);
            });
        });
    }// ,
    // getJournalEntryTitle: function (address) {
    //     let self = this
    //     return new Promise((resolve, reject) => {
    //         self.instance.getJournalEntryTitle.call(
    //             address || window.web3.eth.defaultAccount, {
    //                 from: window.web3.eth.accounts[0]
    //             }
    //         ).then(titles => {
    //             resolve(titles);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // },
    // getJournalEntryBody: function (address) {
    //     let self = this
    //     return new Promise((resolve, reject) => {
    //         self.instance.getJournalEntryBody.call(
    //             address || window.web3.eth.defaultAccount, {
    //                 from: window.web3.eth.accounts[0]
    //             }
    //         ).then(body => {
    //             resolve(body);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // },
    // getJournalEntryTags: function (address) {
    //     let self = this

    //     return new Promise((resolve, reject) => {
    //         self.instance.getJournalEntryTags.call(
    //             address || window.web3.eth.defaultAccount, {
    //                 from: window.web3.eth.accounts[0]
    //             }
    //         ).then(tags => {
    //             resolve(tags);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }
}

export default Journal
