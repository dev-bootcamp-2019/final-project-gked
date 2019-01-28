pragma solidity >= 0.4.24;
pragma experimental ABIEncoderV2;

/** @title Personal Journal. */
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

    // Journal Entry at this point, keeping things simple and contain  only plain-text
    struct JournalEntry {
        string [] title;
        string [] body;
        bool [] encrypt;
        string [] tags;
    }

    // Map of entries for a given Author
    mapping (address => Author) public authors;
    mapping (address => JournalEntry) internal entries;
    
    // Modifiers
    modifier verifyCaller(address _address)
    {
        require (msg.sender == _address);
        _;
    }
    
    // Events
    event AuthorInfoUpdated(address _address);
    event NewJournalEntryCreated(address _address);

    // Initialize the contract with the owner
    constructor() public 
    {
        owner = msg.sender;
    }

    /** @dev Add author's name 
      * @param _address address of the callee of the contract
      * @param _name name of the author provided
      */
    //todo: hook up front-end to this function
    function addAuthorName(address _address, string memory _name)
        public
        verifyCaller(_address) 
    {
        authors[_address].name = _name;
        emit AuthorInfoUpdated(_address);
    }

    /** @dev Get author's name 
      * @param _address author's address
      * @return name Author's name
      */
    function getAuthorName(address _address)
        public
        view
        verifyCaller(_address)
        returns(string memory name)
    {
        name = authors[_address].name;
        return name;
    }

    /** @dev Create Journal entry for an author
      * @param _title Journal Entry Title
      * @param _body Journal Entry main text
      * @param _encrypt Journal Entry boolean indicating whether to  encrypt the post or not
      * @param _tags Journal Entry tags
      * @param _address Journal Entry author
       */
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

    /** @dev Get the list of posts titles for a given user 
      * @param _address Journal Entry author
      * @return title Journal Entry array Title
      */
    function getJournalEntryTitle(address _address) public view returns (string[] memory)
    {
        return entries[_address].title;
    }

    /** @dev Get the list of maon body contexts for a given user 
      * @param _address Journal Entry author
      * @return body Journal Entry array of main text
      */
    function getJournalEntryBody(address _address) public view returns (string[] memory)
    {
        return entries[_address].body;
    }

    /** @dev Get the list of tags for a given user
      * @param _address Journal Entry author
      * @return tags Journal Entry array of tags
      */
    function getJournalEntryTags(address _address) public view returns (string [] memory)
    {
        return entries[_address].tags;
    }

    /** @dev Get the list of encrypt booleans for a given user
      * @param _address Journal Entry author
      * @return tags Journal Entry array of encrypt flags
      */
    function getJournalEntryEncryptFlags(address _address) public view returns (bool [] memory)
    {
        return entries[_address].encrypt;
    }

    /** @dev Get the list journal entries for a given user in one pass
      * @param _address Journal Entry author
      * @return title Journal Entry array Title
      * @return body Journal Entry array of main text
      * @return tags Journal Entry array of tags
      * @return tags Journal Entry array of encrypt flags
      */
    function getJournalEntry(address _address) public view returns (string [] memory, string [] memory, string [] memory, bool [] memory) {
        return (entries[_address].title, entries[_address].body, entries[_address].tags, entries[_address].encrypt);
  }
}
