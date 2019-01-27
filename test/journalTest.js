var Journal = artifacts.require('./Journal.sol');

contract ('Journal', accounts => {

    it('check to see of the Author already exists', () => {
        Journal.deployed()
        .then(instance => instance.authorExists.call(accounts[0]))
        .then(exists => {
            assert.equal(
                exists,
                false,
                'This is a new Author and shouldn\'t exist'
                );
        });
    });

    it('try to create a Journal entry by the Author', () => {
        Journal.deployed()
            .then(instance => instance.createJournalEntry.call(
                'Test Title',
                'some more text and as a todo: I need to figure out how much more space can i fit in a single string. I mean what is the character limit',
                false,
                'TAG1',
                accounts[0]))
            .then(successful => {
                assert.equal(
                    successful,
                    false,
                    'Failed to create new Journal entry by the Author'
                );
            });
    });
});
