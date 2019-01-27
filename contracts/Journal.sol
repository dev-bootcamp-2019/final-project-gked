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
    mapping (address => JournalEntry) public entries;
    
    /* Modifiers */
    modifier verifyCaller(address _address)
    {
        require (msg.sender == _address);
        _;
    }
    
    /* Events */
    

    /* Initialize the contract with the owner*/
    constructor() public {
        owner = msg.sender;
    }

    /** Add author's name */
    function addAuthorName(address _address, string memory _name)
        public
        verifyCaller(_address)
        returns(bool) {
            authors[_address].name = _name;
            return true;
    }

    /* Get author's name */
    function getAuthorName(address _address)
        public
        view
        verifyCaller(_address)
        returns(string memory) {
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
        returns (bool) {
        // entries[_address].title.push(strConcat(_title));
        // entries[_address].body.push(strConcat(_body));
        // entries[_address].encrypt.push(_encrypt);
        // entries[_address].tags.push(strConcat(_tags));
        entries[_address].title.push(_title);
        entries[_address].body.push(_body);
        entries[_address].encrypt.push(_encrypt);
        entries[_address].tags.push(_tags);
        return true;
    }

    /* Get the list of entries for a given user */
    function getJournalEntryTitle(address _address) public view returns (string[] memory title) {
        //todo: 
        return entries[_address].title;
    }

    function getJournalEntryBody(address _address) public view returns (string[] memory body) {
        return entries[_address].body;
    }

    function getJournalEntryTags(address _address) public view returns (string [] memory tags) {
        return entries[_address].tags;
    }

    /* Helper functions */
    // concatenates string with a delimeter of formm ',|--|'
    function strConcat(string memory _a) internal returns (string memory)
    {
        string memory delimeter = ",|--|";
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(delimeter);
     
        string memory ab = new string(_ba.length + _bb.length );
        bytes memory ba = bytes(ab);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) {
            ba[k++] = _ba[i];
        }
        for (uint i = 0; i < _bb.length; i++) {
            ba[k++] = _bb[i];
        }
        return string(ba);
    }
}
