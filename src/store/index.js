/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import contract from 'truffle-contract'
import JournalContract from '@contracts/Journal.json'
import getWeb3 from '../util/getWeb3'
import state from './state'
import Journal from '@/js/journal'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations: {
        // addJournalEntry(state, journalEntry) {
        //     state.journals.push(journalEntry)
        // },
        registerWeb3Instance(state, payload) {
            console.log('registerWeb3Instance Mutation being executed', payload)
            let result = payload
            let web3Copy = state.web3
            web3Copy.coinbase = result.coinbase
            web3Copy.networkId = result.networkId
            web3Copy.balance = parseInt(result.balance, 10)
            web3Copy.isInjected = result.injectedWeb3
            web3Copy.web3Instance = result.web3
            state.web3 = web3Copy
        },
        initializeContractInstance(state, payload) {
            console.log('initializeCntractInstance Mutation being executed', payload)
            let result = payload
            let self = this
            state.contractInstance = payload.instance

            return new Promise(function (resolve, reject) {
                // Initialize the contract
                self.contract = contract(JournalContract)
                self.contract.setProvider(window.web3.currentProvider)
                self.contract.deployed().then(instance => {
                    self.instance = instance;
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            })
        },
        updateJournals(state, journals) {
            state.journals = journals;
        }
    },
    actions: {
        registerWeb3({commit}) {
            console.log('registerWeb3 Action being executed')
            getWeb3.then(result => {
                console.log('committing result to registerWeb3Instance mutation')
                commit('registerWeb3Instance', result)
            }).catch(e => {
                console.log('error in action registerWeb3', e)
            })
        },
        initializeContract({commit}) {
            console.log('initializeContract Action being executed')
            getWeb3.then(result => {
                console.log('commiting result to initializeContractInstance mutation')
                commit('initializeContractInstance', result)
            }).catch(e => {
                console.log('error in action initializeContract', e)
            })
        },
        getJournals({commit}, Journal) {
            let journalEntries = []
            let journalEntry = {}
            Promise.all([
                Journal.instance.getJournalEntryTitle.call(
                    address || window.web3.eth.defaultAccount, {
                        from: window.web3.eth.accounts[0]
                    }),
                Journal.instance.getJournalEntryBody.call(
                    address || window.web3.eth.defaultAccount, {
                        from: window.web3.eth.accounts[0]
                    }),
                Journal.instance.getJournalEntryTags.call(
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
            // return journalEntries
        },
        createJournalEntry({commit}, journal) {
            let self = this;

            return new Promise((resolve, reject) => {
                self.instance.createJournalEntry(
                    journalEntry.title,
                    journalEntry.body,
                    journalEntry.encrypt,
                    journalEntry.tags,
                    author || window.web3.eth.defaultAccount, {
                        from: window.web3.eth.accounts[0]
                    }
                ).then(tx => {
                    resolve(tx);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
})
