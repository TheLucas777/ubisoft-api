# ubisoft-api
A handy package to extract Data from Ubisoft services by reverse-engineering their public web APIs.

## 📋 Table of contents
- [📝 Introduction](#-introduction)
- [🚀 Features](#-features)
- [💪🏻 Supported Games](#-supported-games)
- [⬇️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [📖 Examples](#-examples)
    - [🔁 Using proxy](#-using-proxy)
- [🔗 Useful resources](#-useful-resources)
- [📞 Contacts](#-contacts)

### 📝 Introduction
Before using this package, you should know that Ubisoft **does not** provide any official API for developers!

So, where exactly do I get the data from?

The answer is simple; I fetch data by reverse engineering Ubisoft APIs (Which does not have any documentation), format, and restructure their response and eventually return the new data to the user.

To access this data, you must provide some Ubisoft accounts (email and password) to authenticate and work with Ubisoft APIs.

⚠️ **Note:**
Do not use your primary Ubisoft account. We take no responsibility for anything that might happen to given accounts in the future.

The Ubisoft APIs we use in this package are not stable. Your application might suddenly break, if Ubisoft changes something in the future, so you must always keep your application up-to-date.

There are multiple **third-party** non-open source websites/services out there that provide APIs related to Ubisoft services. For several reasons, we advise you not to use them:
- It is wrong to build an application that relies heavily on many third-party services.
- To get data, they all use the same method I described above.
- They are not trustworthy, and it's hard to trust them.
- You will never know what they do with the data.
- They always have the power to manipulate the data before delivering it to you.


### 🚀 Features
- Includes TypeScript definitions
- Supports multiple Ubisoft accounts (sessions)
- Supports proxy
- Search Ubisoft profiles (username, profileId, userId, etc...)
- Check Ubisoft username availability
- Get users profile pictures in different sizes


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
Placeholder text.


### 📖 Examples
Placeholder text.


#### 🔁 Using proxy
Placeholder text.


### 🔗 Useful resources
- [Rainbow Six: Siege operator icons](https://r6operators.marcopixel.eu/) - [Github](https://github.com/marcopixel/r6operators)
- [Ubisoft account](https://account.ubisoft.com/) for creating new Ubisoft account(s).


### 📞 Contacts
If you have any question regarding to this package, feel free to be in touch with me!

Discord: `Script#0001`

Twitter: [@Skr1p7](https://twitter.com/intent/user?screen_name=Skr1p7)