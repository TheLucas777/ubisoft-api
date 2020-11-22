A handy package to extract Data from Ubisoft services by reverse-engineering their public web APIs.

## 📋 Table of contents
- [Introduction](#-introduction)
- [Features](#-features)
- [Supported Games](#-supported-games)
- [Installation](#️-installation)
- [Configuration](#-configuration)
- [Examples](#-examples)
    - [Search Ubisoft profiles](#search-ubisoft-profiles)
    - [Rainbow Six: Siege stats](#)
- [Useful resources](#-useful-resources)
- [Contacts](#-contacts)

### 📝 Introduction
Before using this package, you should know that Ubisoft **does not** provide any official API for developers!

So, where exactly do I get the data from?

The answer is simple; I fetch data by reverse engineering Ubisoft APIs (Which does not have any documentation), format, and restructure their response and eventually return the new data to the user.

To access this data, you must provide some Ubisoft accounts (email and password) to authenticate and work with Ubisoft APIs.

> Do not use your primary Ubisoft account. We take no responsibility for anything that might happen to given accounts in the future.

The Ubisoft APIs we use in this package are not stable. Your application might suddenly break, if Ubisoft changes something in the future, so you must always keep your application up-to-date.

There are multiple **third-party** non-open source websites/services out there that provide APIs related to Ubisoft services. For several reasons, we advise you not to use them:
- It is wrong to build an application that relies heavily on many third-party services.
- To get data, they all use the same method I described above.
- They are not trustworthy, and it's hard to trust them.
- You will never know what they do with the data.
- They always have the power to manipulate the data before delivering it to you.


### 🚀 Features
- Includes TypeScript definitions
- Supports multiple Ubisoft accounts (multiple sessions)
- Supports proxy
- Search Ubisoft profiles (username, profileId, userId, etc...)
- Check Ubisoft username availability
- Get users profile picture in different sizes


### 💪🏻 Supported Games
- [ ] Tom Clancy's Rainbow Six: Siege **(Work in progress...)**


### ⬇️ Installation
Using npm:
```bash
$ npm install ...
```

Using yarn:
```bash
$ yarn add ...
```

### 🔧 Configuration
We highly recommend you to use TypeScript instead of CommonJS.
```JavaScript
// CommonJS
// const ubisoft = require('...');
 
// ES6
import Ubisoft from '...';

const ubisoft = new Ubisoft({
    accounts: [
        {
            email: '...',
            password: '...'
        },
        // Optional: Add more Ubisoft accounts...
    ],
    sessionPath: __dirname + '/sessions.json'
});
```

### 📖 Examples

#### Search Ubisoft profiles
```JavaScript
/**
 * ===========================
 * Search profiles by username
 * ===========================
 */

ubisoft.searchByUsername('uplay', 'Sub.Script')
    // .searchByUsername('uplay', ['Sub.Script', 'Beaulo.TSM'])
    .then((profiles) => {
        console.log(profiles.toArray());
    })


/**
 * ============================
 * Search profiles by profileId
 * ============================
 */
ubisoft.searchByProfileId('4503086f-112e-41b6-bdbf-1c682596bab3')
    /*
    .searchByProfileId('uplay', [
        '4503086f-112e-41b6-bdbf-1c682596bab3' // Sub.Script
        '3cc51897-49c4-45f6-af9d-66507b8ef0e1' // Beaulo.TSM
        '36e684d7-5a57-42df-9b00-1c60e7c91f28' // Achieved.TSM
    ])
    */
    .then((profiles) => {
        console.log(profiles.toArray());
    })
```
> ⚠️ **Note:** 
> 
> Just because you got some results after searching profiles, it does not mean that you will always receive "game stats" for all the available games. 
> 
> In fact, if the found profiles don't own the game or have never played the game before, most likely Ubisoft will return an empty response then you will get an error.
> 
> For example, if you request to get Siege information for profile A, most likely you'll receive an error or an empty response if that profile does not own the game or has never played it before.
> 
> So, I highly recommend you to validate the responses after each call.


#### Rainbow Six: Siege stats


```JavaScript
// Get progression
ubisoft.searchByUsername('uplay', ['Sub.Script', 'Beaulo.TSM'])
    .then((profiles) => {

        profiles.siege.progress().then(data => {
			console.log(data.toArray());
        })
        
    })
```


### 🔗 Useful resources
- [Rainbow Six: Siege operator icons](https://r6operators.marcopixel.eu/) - [Github](https://github.com/marcopixel/r6operators)
- [Ubisoft account](https://account.ubisoft.com/) for creating new Ubisoft account(s).


### 📞 Contacts
If you have any questions regarding this package, feel free to be in touch with me!

Discord: `Script#0001`

Twitter: [@Skr1p7](https://twitter.com/intent/user?screen_name=Skr1p7)