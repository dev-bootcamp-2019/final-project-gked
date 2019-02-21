<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <!-- <div v-if="userExists">
      Welcome {{ pseudo }}. Destroy your account by clicking <a href="#" @click="destroyAccount">here</a>.
    </div> -->
    <div class='metamask-info'>
      <p> Metamask: {{ web3.isInjected }}</p>
      <p> Network: {{ web3.networkId }}</p>
      <p> Account: {{ web3.coinbase }}</p>
      <p> Balance: {{ web3.balance }}</p>
    </div>

    <form>
      <label for="titleInp" class="topElem">Name:</label>
      <input id="titleInp" type="text" />

      <label for="tags">Tags("|" separated)</label>
      <input id="tags" type="text" />

      <label for="tA">Journal Entry:</label>
      <textarea id="tA"  placeholder="YOUR THOUGHTS HERE"></textarea>

      <!-- <label for="checkBInput">Encrypt the message</label>
      <input id="checkBInput" type="checkbox" /> -->
      <button @click="saveEntry" type="button">Save Journal Entry</button>
    </form>
    <div v-if="journals" >
    <table>
      <tbody>
        <tr v-for="(journalEntry, index) in journals" :key="index">
          <td>
            {{journal.title}}
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!-- <input @click="getJournalHistory" type="button" value="Get History" style="block"/> -->
    <!-- <p> {{ journalEntries }} </p> -->
    <!-- <ul>
      <li v-for="item in getJournalHistory">
        <div id="journalContainer">
        <sui-container text-align="left">
          Left Aligned
        </sui-container>
        <sui-container text-align="center">
          Center Aligned
        </sui-container>
        <sui-container text-align="right">
          Right Aligned
        </sui-container>
        <b>Justified</b>
        <sui-divider />
        <sui-container text-align="justified">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        </p>
        <p>
          Lorem ipsum dolor sit ame
        </p>
        </sui-container>
        </div>
        </li>
      </ul> -->
  </div>
</template>

<script>
import Journal from '@/js/journal'

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to  the OpenJournal dApp. A new way to keep your thoughts, daily.',
      pseudo: undefined
    }
  },
  computed: {
    web3 () {
      console.log('View is accessing $store.state.web3')
      return this.$store.state.web3
    },
    journals () {
      return this.$store.state.journals
    }
  },
  beforeCreate: function () {
    // Journal.init().then((instance) => {
    //   // this.getJournalHistory()
    // })
    console.log('registerWeb3 Action dispatched from Dashboard.vue')
    this.$store.dispatch('registerWeb3')
    // console.log('getJournals Action dispatched from Dashboard.vue')
    // this.$store.dispatch('getJournals')

    console.log('initializeContract Action dispatched from Dashboard.vue')
    this.$store.dispatch('initializeContract')
  },
  created: function () {
    // this.$store.dispatch('getJournals')
  },
  methods: {
    saveEntry: function () {
      let d = document
      let journalEntry = {
        title: d.getElementById('titleInp').value,
        body: d.getElementById('tA').value,
        encrypt: false,
        tags: d.getElementById('tags').value
      }
      Journal.createJournalEntry(Journal, journalEntry).then(tx => {
        let alertMessage = 'Journal Entry Successful' + '\n' + 'Title: ' + journalEntry.title + '\n' + 'Body: ' + journalEntry.body + '\n' + 'Tags: ' + journalEntry.tags
        alert(alertMessage)
        location.reload()
      }).catch(err => {
        alert('Error creating Journal Entry')
        console.log(err)
      })
      // let d = document
      // let journalEntry = {
      //   title: d.getElementById('titleInp').value,
      //   body: d.getElementById('tA').value,
      //   encrypt: false,
      //   tags: d.getElementById('tags').value,
      //   account: window.web3.eth.accounts[0]
      // }
      // this.$store.commit('addJournalEntry', journalEntry)
      // Journal.createJournalEntry(journalEntry).then(tx => {
      //   let alertMessage = 'Journal Entry Successful' + '\n' + 'Title: ' + journalEntry.title + '\n' + 'Body: ' + journalEntry.body + '\n' + 'Tags: ' + journalEntry.tags
      //   alert(alertMessage)
      //   location.reload()
      // }).catch(err => {
      //   alert('Error creating Journal Entry')
      //   console.log(err)
      // })
    }// ,
    // getJournalHistory: function () {
    //   let journalEntries = []
    //   let journalEntry = {}
    //   Promise.all([
    //     Journal.getJournalEntryTitle(window.web3.eth.accounts[0]),
    //     Journal.getJournalEntryBody(window.web3.eth.accounts[0]),
    //     Journal.getJournalEntryTags(window.web3.eth.accounts[0])])
    //     .then(results => {
    //       let maxArrayLength = 0
    //       if (results[0].length >= results[1].length) {
    //         maxArrayLength = results[0].length
    //       } else {
    //         maxArrayLength = results[1].length
    //       }
    //       if (results[2].length >= maxArrayLength) {
    //         maxArrayLength = results[2].length
    //       }

    //       for (let t = 1; t < maxArrayLength; t++) {
    //         journalEntry.title = results[0][t]
    //         journalEntry.body = results[1][t]
    //         journalEntry.tag = results[2][t]
    //         journalEntries.push(journalEntry)
    //         console.log('Journal Entry #', t)
    //         console.log('Title: ', journalEntry.title)
    //         console.log('Body: ', journalEntry.body)
    //         console.log('Tags: ', journalEntry.tag)
    //       }
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   return journalEntries
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

form {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  width: 408px;
  background: lightblue;
  margin: 0 auto;
}

label {
  display: block;
  width: 150px;
}

input, textarea {
  width: 250px;
  margin-bottom: 7px;
}

textarea {
  height: 150px;
}

input[type=submit] {
  width: auto;
}

label.topElem {
  padding-top: 5px;
}
</style>
