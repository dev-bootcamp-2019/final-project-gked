pragma solidity >= 0.4.24;
pragma experimental ABIEncoderV2;

contract Journal {

    /* owner of the journal entry */
    address owner;

    /* struct Author contains 
      information about 
      the author if he/she 
      chooses for it to be
      public
    */
    struct Author {
        string name;
        address authorAddress;
    }

    /* Information of the contributors */
    struct Contributor {
        address contributor;
        string name;
    }

    /* Journal Entry
     at this point,
     keeping things
     simple and contain
     only simple text
    */
    struct JournalEntry {
        string title;
        string body;
        bool encrypt;
        string[] tags;
        uint id;
    }

    /* Map of entries for a given Author */
    //mapping (address => uint) public entries;
    mapping (address => bytes32) public authors;
    mapping (address => JournalEntry) public entries;
    
    /* Modifiers */
    modifier verifyCaller(address _address)
    {
        require (msg.sender == _address);
        _;
    }

    /* Initialize the contract with the owner*/
    constructor() public {
        owner = msg.sender;
    }

    /* Getthe list of entries for a given user */
    function getJournalEntryTitle(address _address) public view returns (string memory title) {
        return entries[_address].title;
    }

    function getJournalEntryBody(address _address) public view returns (string memory body) {
        return entries[_address].body;
    }

    function getJournalEntryTags(address _address) public view returns (string [] memory tags) {
        return entries[_address].tags;
    }

    function authorExists(address _address) public returns(bool _exists) {
        return (authors[_address] != bytes32(0));
    }

    function createJournalEntry(JournalEntry memory entry, address author) public returns (bool) {
        entries[author].title = entry.title;
        entries[author].body = entry.body;
        entries[author].encrypt = entry.encrypt;
        entries[author].tags = entry.tags;
        return true;        
    }
}
