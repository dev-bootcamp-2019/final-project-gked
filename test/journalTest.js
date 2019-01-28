var Journal = artifacts.require('./Journal.sol');

contract ('Journal', accounts => {

    it('test that we can add Author name given address and retrieve it ', async () => {
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

    it('try to create a Journal Title entry by the Author and retrieve it', async () => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let title = 'First Title'
        let body = 'I am writing this poem... It will stay forever in the depths of the blockchain'
        let tags = 'poetic|personal'
        let encrypt = true

        const tx = await journal.createJournalEntry(title, body, encrypt, tags, accounts[0], {
            from: accounts[0]
        })
        if (tx.logs[0].event === 'NewJournalEntryCreated') {
            eventEmitted = true
        }

        const result = await journal.getJournalEntryTitle.call(accounts[0])

        assert.equal(eventEmitted, true, 'adding new Journal entry should emit NewJournalEntryCreated event')
        assert.equal(result[0], title, 'the title of the last added Journal entry does not match the expected value')
    });

    it('try to create a Journal Body entry by the Author and retrieve it', async () => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let title = 'First Title'
        let body = 'I am writing this poem... It will stay forever in the depths of the blockchain'
        let tags = 'poetic|personal'
        let encrypt = true

        const tx = await journal.createJournalEntry(title, body, encrypt, tags, accounts[0], {
            from: accounts[0]
        })
        if (tx.logs[0].event === 'NewJournalEntryCreated') {
            eventEmitted = true
        }

        const result = await journal.getJournalEntryBody.call(accounts[0])

        assert.equal(eventEmitted, true, 'adding new Journal entry should emit NewJournalEntryCreated event')
        assert.equal(result[1], body, 'the body of the last added Journal entry does not match the expected value')
    });

    it('try to create a Journal Tags entry by the Author and retrieve them', async () => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let title = 'First Title'
        let body = 'I am writing this poem... It will stay forever in the depths of the blockchain'
        let tags = 'poetic|personal'
        let encrypt = true

        const tx = await journal.createJournalEntry(title, body, encrypt, tags, accounts[0], {
            from: accounts[0]
        })
        if (tx.logs[0].event === 'NewJournalEntryCreated') {
            eventEmitted = true
        }

        const result = await journal.getJournalEntryTags.call(accounts[0])

        assert.equal(eventEmitted, true, 'adding new Journal entry should emit NewJournalEntryCreated event')
        assert.equal(result[2], tags, 'the tags of the last added Journal entry does not match the expected value')
    });

    it('try to create a Journal Encrypted boolean value by the Author and retrieve it', async () => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let title = 'First Title'
        let body = 'I am writing this poem... It will stay forever in the depths of the blockchain'
        let tags = 'poetic|personal'
        let encrypt = true

        const tx = await journal.createJournalEntry(title, body, encrypt, tags, accounts[0], {
            from: accounts[0]
        })
        if (tx.logs[0].event === 'NewJournalEntryCreated') {
            eventEmitted = true
        }

        const result = await journal.getJournalEntryEncryptFlags.call(accounts[0])

        assert.equal(eventEmitted, true, 'adding new Journal entry should emit NewJournalEntryCreated event')
        assert.equal(result[3], encrypt, 'Encrypt boolean flag of the last added Journal entry does not match the expected value')
    });

    it('try to create a Journal entry by the Author and retrieve all of it in one pass', async () => {
        const journal = await Journal.deployed()
        let eventEmitted = false
        let title = 'First Title'
        let body = 'I am writing this poem... It will stay forever in the depths of the blockchain'
        let tags = 'poetic|personal'
        let encrypt = true

        const tx = await journal.createJournalEntry(title, body, encrypt, tags, accounts[0], {
            from: accounts[0]
        })
        if (tx.logs[0].event === 'NewJournalEntryCreated') {
            eventEmitted = true
        }

        const result = await journal.getJournalEntry.call(accounts[0])

        assert.equal(eventEmitted, true, 'adding new Journal entry should emit NewJournalEntryCreated event')
        assert.equal(result[0][0], title, 'the title of the last added Journal entry does not match the expected value')
        assert.equal(result[1][0], body, 'the body of the last added Journal entry does not match the expected value')
        assert.equal(result[2][0], tags, 'the tags of the last added Journal entry does not match the expected value')
        assert.equal(result[3][0], encrypt, 'Encrypt boolean flag of the last added Journal entry does not match the expected value')
    });
});
