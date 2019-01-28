var Journal = artifacts.require('./Journal.sol');

contract ('Journal', accounts => {

    it('test that we can add Author name given address ', async() => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let authorName = 'Talented Author'

        const tx = await journal.addAuthorName(accounts[0], authorName, {from: accounts[0]})
        if (tx.logs[0].event === 'AuthorInfoUpdated')
        {
            eventEmitted = true
        }

        const result = await journal.getAuthorName.call(accounts[0])

        assert.equal(eventEmitted, true, 'adding author name  should emit AuthorInfoUpdated event')
        assert.equal(result, authorName, 'the name of the author expected, does not match actual author name')
    });

    it('try to create a Journal entry by the Author', async() => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let title = 'First Title'
        let body = 'I am writing this poem... It will stay forever in the depths of the blockchain'
        let tags = 'poetic|personal'

        const tx = await journal.createJournalEntry(title, body, false, tags, accounts[0], {
            from: accounts[0]
        })
        if (tx.logs[0].event === 'NewJournalEntryCreated') {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding new Journal entry should emit NewJournalEntryCreated event')
        assert.equal(result, title, 'the name of the last added item does not match the expected value')
    });
});
