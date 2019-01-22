<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <!-- <div v-if="userExists">
      Welcome {{ pseudo }}. Destroy your account by clicking <a href="#" @click="destroyAccount">here</a>.
    </div> -->
    <input  type="text" placeholder="TITLE"/>
    <div id="tags" style="border:solid; border-color:blue" width="245">Tags</div>
    <textarea id="tA" width="245" placeholder="YOUR THOUGHTS HERE"></textarea>
    <br/>
    <input @click="saveEntry" type="button" value="Sign + Save" style="block"/>
    <input type="checkbox" /><span> Encrypt the message</span>
  </div>
</template>

<script>
import Users from '@/js/users'
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
    userExists: function () {
      return (typeof this.pseudo !== 'undefined')
    }
  },
  beforeCreate: function () {
    Users.init().then(() => {
      Users.exists(window.web3.eth.accounts[0]).then((exists) => {
        if (exists) {
          // Users.authenticate().then(pseudo => {
          //   this.pseudo = pseudo
          // })
          debugger
          console.log(exists)
        }
      })
    }).catch(err => {
      console.log(err)
    })
    Journal.init().then(() => {
      Journal.authorExists(window.web3.eth.accounts[0]).then((authorExists) => {
        if (authorExists) {
          console.log(authorExists)
        } else {
          console.log(authorExists)
        }
      })
    })
  },
  methods: {
    saveEntry: function () {
      // let self = this;
      let tags = ['tag1', 'tag2', 'tag3']
      let journalEntry = {
        title: 'Test Title',
        body: 'some more text and as a todo: I need to figure out how much more space can i fit in a single string. I mean what is the character limit',
        encrypt: false,
        tags: tags,
        id: 0
      }
      Journal.createJournalEntry(journalEntry, window.web3.eth.accounts[0]).then(tx => {
        console.log(tx)
      }).catch(err => {
        console.log(err)
      })
    },
    destroyAccount: function (e) {
      e.preventDefault()
      Users.destroy().then(() => {
        this.pseudo = undefined
      }).catch(err => {
        console.log(err)
      })
    }
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
</style>
