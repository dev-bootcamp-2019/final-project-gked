pragma solidity >= 0.4.24;
pragma experimental ABIEncoderV2;

contract Journal {

    /* owner of Journal contract */
    address owner;

    /* Author contains information
      about the author if he/she 
      chooses to provide any
      public
    */
    struct Author {
        string name;
        address authorAddress;
    }

    /* Information of the contributors */
    // struct Contributor {
    //     address contributor;
    //     string name;
    // }

    /* Journal Entry at this point,
     keeping things simple and contain
     only plain-text
    */
    struct JournalEntry {
        string [] title;
        string [] body;
        bool [] encrypt;
        string [] tags;
    }

    /* Map of entries for a given Author */
    mapping (address => Author) public authors;
    mapping (address => JournalEntry) internal entries;
    
    /* Modifiers */
    modifier verifyCaller(address _address)
    {
        require (msg.sender == _address);
        _;
    }
    
    /* Events */
    event AuthorInfoUpdated(address _address);
    event NewJournalEntryCreated(address _address);

    /* Initialize the contract with the owner*/
    constructor() public 
    {
        owner = msg.sender;
    }

    /** Add author's name 
        todo: hook up front-end to this function
    */
    function addAuthorName(address _address, string memory _name)
        public
        verifyCaller(_address) 
    {
        authors[_address].name = _name;
        emit AuthorInfoUpdated(_address);
    }

    /* Get author's name */
    function getAuthorName(address _address)
        public
        view
        verifyCaller(_address)
        returns(string memory)
    {
        string memory name = authors[_address].name;
        return name;
    }

    /* Create Journal entry for an author */
    function createJournalEntry(
        string memory _title,
        string memory _body,
        bool _encrypt,
        string memory _tags,
        address _address) 
        public
        verifyCaller(_address)
    {
        entries[_address].title.push(_title);
        entries[_address].body.push(_body);
        entries[_address].encrypt.push(_encrypt);
        entries[_address].tags.push(_tags);
        emit NewJournalEntryCreated(_address);
    }

    /* Get the list of posts titles for a given user */
    function getJournalEntryTitle(address _address) public view returns (string[] memory title)
    {
        return entries[_address].title;
    }

    /* Get the list of maon body contexts for a given user */
    function getJournalEntryBody(address _address) public view returns (string[] memory body)
    {
        return entries[_address].body;
    }

    /* Get the list of tags for a given user */
    function getJournalEntryTags(address _address) public view returns (string [] memory tags)
    {
        return entries[_address].tags;
    }

    function getJournaEntry(address _address) public view returns (string title, string body, string tags) {
        title = entries[_address].title;
        body = entries[_address].body;
        tags = entries[_address].tags;
        return (title, body, tags);
  }
}
