# Real time Markdown Editor

**TL;DR**
**Markeer**, a collaborative markdown web-editor built with Express (potentionally react), to develop this project further:

```BASH
# Navigate to your projects folder
git clone https://github.com/dewarian/real-time-web-2021.git
npm i
npm run dev
```

Or view the code with [Github1s](https://github1s.com/dewarian/real-time-web-2021/tree/asgmt/).

For school documentation please navigate to the [docs branch](https://github.com/dewarian/real-time-web-2021/tree/docs)

## Table of Content

- [description](#description)
- [Problem](#problem)
- [Solution](#solution)
  - [Sketches](#sketches)
- [Future](#future)
- [Technicalities](#technicalities)
  - [Installation](#installation)
  - [Dataflow](#dataflow)
  - [Dependencies](#dependencies)
  - [Coding conventions](#coding-conventions)
  - [Git conventions](#git-conventions)
  - [Build Scripts](#build-scripts)
  - [Frameworks && Libraries](#frameworks--libaries)
  - [API](#api)
- [Honourable Mentions](#honourable-mentions)

## Description

The idea came from writing documentation for the [readme.md](./readme.md). There are many text editors in which you can collaborate but there haven't been many for markdown specifically. The one that came the closest is [Typora](https://typora.io/) and [Notion (export function)](https://www.notion.so/Export-a-page-as-Markdown-69b6031dd9454022abed8e23a86b0e1e).

The base functionality of **Markeer** is to write markdown with multiple users while seeing a live variant of it. The collaborative functionality will be created with [socket.io](https://www.socket.io).

## Problem

What is the problem?
The current problem is that I have zero experience with [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), this is problematic and thus want to create something with sockets. After some contemplating I decided to create a text editor, specifically an editor to write markdown.

## Solution

The solution would be a markdown editor created in NodeJS and some client-side. The best solution would be a Google Docs killer <sub><sup>or competitor however you want to see it</sup></sub>.

It will be done from a Read Me Driven Development manner where the readme is constantly updated to reflect the state of the application.

### Sketches

The interface I am imagining for this markdown editor is to focus on the functionality first. The most important activity would be able to write markdown and see what the user have written. Ideal case is to interpret the markdown and transforming it into the rendered variant without a separate window.

<kbd>
  <img src="https://user-images.githubusercontent.com/13199349/114627540-b3884d00-9cb5-11eb-9ab0-219f0a7c315e.png" alt="Concept drawing, Markeer's flow is drawn and actions are written down">
</kbd>

<kbd>
  <img src="https://user-images.githubusercontent.com/13199349/114408302-923a3a80-9ba9-11eb-9ce2-ec3bbd39f1bc.png" alt="two concepts for real time application, a google docs clone and a stocks dashboard to share portfolio's">
</kbd>

<!-- The UI that I am visualising for this WhatsApp clone is a mixture between Dribbble, Telegram and WhatsApp.

The interface isn't fixed yet as I am dabbling between a minimal variant or a bubbly variant.
<sub>Potentionally using this as an option in settings.</sub> -->

## Future

As mentioned earlier the ideal state of this application is to have a complete markdown editor where you can create multiple files, save those files, or even export those to use it in your next project.

Another cool idea would integration with Github, where you can add the markdown to a wiki or readme without having to manually paste the markdown.

**functionalities**
Actions that should be possible in a markdown editor, ordered in a manner according to the MoSCoW method. The following rows in the tables are activities that an user should be able to complete or enhance it's experience.

|                      |        Must        | Should |       Could        |       Would        |Implemented|
| :------------------- | :----------------: | :----: | :----------------: | :----------------: |--|
| Write Markdown       | :white_check_mark: |        |                    |                    |:heavy_check_mark:|
| Multi User support   | :white_check_mark: |        |                    |                    |:heavy_check_mark:|
| Export Markdown      |                    |        | :white_check_mark: |                    ||
| Delete Markdownn     |                    |        | :white_check_mark: |                    ||
| Github Intergration  |                    |        |                    | :white_check_mark: ||
| Storage for markdown | :white_check_mark: |        |                    |                    |:heavy_check_mark:|
| Shortcuts            |                    |        |                    | :white_check_mark: ||
| Prefix auto-complete |                    |        |                    | :white_check_mark: ||
| `//To Be continued`  |                    |        |                    |                    ||

**Style decisions**
Style decisions are decisions that are made for the user interface of the application, UI experiences that will be added as the project is being developed.
| |Must|Should|Could|Would|Implemented|
|:-------------------|:-:|:-:|:-:|:-:|--|
|Syntax Highlighting | | | :white_check_mark: | ||
|Dark Mode | | :white_check_mark: | | |:heavy_check_mark:|
|`//To Be continued` | | | | |


## Technicalities

For this project to be able to developed on your machine there are some requirements:

- [Have node installed.](https://nodejs.org/en/)

### Installation

For development run the following commands:

```BASH
git clone https://github.com/dewarian/real-time-web-2021.git
npm install
npm run dev #or npm start
# or
yarn
yarn run dev #or yarn run start

Navigate to [localhost:8080](localhost:8080)
```

### Dataflow

The data flows bi-directional.

```AsciiDoc
┌────────────┐   HTTP
│            ├───────────────┐
│            │               │
│  CLIENT 1  │◄────────────┐ │
│  (mobile)  │   Bi-dir    │ │
│            │             │ │        ┌─────────────┐
│            │             │ │        │             │
└────────────┘             │ └──────► │  SERVER     │
                           │          │  (EXPRESS)  │
┌────────────┐             └────────► │             │
│            │                        │             │
│            │   HTTP                 │             │
│   CLIENT   ├──────────────────────► │  SOCKET.IO  │
│  (tablet)  │▼─────────────────────► │  -message   │
│            │   Bi-dir               │  -discon.   │
│            │                        │             │
└────────────┘               ┌──────► │             │
                             │        │             │
┌────────────┐               │ ┌────► │             │
│            │               │ │      │             │
│            │               │ │      │             │
│   CLIENT   │   HTTP        │ │      └─────────────┘
│  (desktop) │◄──────────────┘ │
│            │                 │
│            ├─────────────────┘
└────────────┘   Bi-dir
```

<sub>In courtesy of [asciiflow](https://asciiflow.com/).</sub>

### Data Model

The data model is structured like a real-time database as I am using firestore to keep track of what is happening within a markdown document.

Firestore is built in collections that can have documents but could be diverged deeper with subcollections. To store multiple documents with each their own content I would have to use subcollections as a list of documents that contain information about the document.


```asciiDoc
┌───────────────────┐          ┌─────────────────────────┐
│  Collections      │          │  Documents (subcol)     │
├───────────────────┤          ├─────────────────────────┤
│                   │          │                         │
│  ID: varchar(20)  │1   TO   N│  Timestamp: datetime    │
│                   ├──────────┤  Editors  : arr         │
│                   │          │  Name     : string      │
│                   │          │                         │
└───────────────────┘          └────────────┬────────────┘
                                            │1
                                            │
                                            │TO
                                            │
                                            │N
                               ┌────────────┴────────────┐
                               │  Document               │
                               ├─────────────────────────┤
                               │                         │
                               │  Name        : string   │
                               │  Last_Editor : string   │
                               │  Last_Edit   : datetime │
                               │  Edited_Block: map      │
                               └─────────────────────────┘
```

### Data cycle

![Datacycle](https://user-images.githubusercontent.com/13199349/114987987-1a645c80-9e96-11eb-9ffd-e3a7dc51ef7d.png)


### Dependencies
**Dependencies**
|Name|Functionality|
|:--|--|
|[Express](https://www.npmjs.com/package/express)|Minimalistic unopinionated web framework.|
|[Socket.io](https://www.npmjs.com/package/socket.io)|Node Package that uses WebSockets API and extends upon it.<br> Allows for real-time Bi-directional communication.|
|[compression](https://www.npmjs.com/package/compression)|Compression middleware, compresses response bodies.|
|[ejs](https://www.npmjs.com/package/ejs)|Templating engine for express.|
|[firebase](https://www.npmjs.com/package/firebase)|Google's real time database solution and more.|
|[lowdb](https://www.npmjs.com/package/lowdb)|Small JSON database for Node, Electron and, the browser.|

**Dev Dependencies**
|Name|Functionality|
|:--|--|
|[eslint](https://www.npmjs.com/package/eslint)|Linter that find and fixes problems in JavaScript.|
|[eslint-config-google](https://www.npmjs.com/package/eslint-config-google)|ESLint configuration for ESLint. enforces rules from [Google Styleguide](https://google.github.io/styleguide/jsguide.html).|

### Coding conventions

To keep the codebase clean and readable for whoever dares to read the source, it will adhere to a set of rules, conventions commonly found in similar projects.

### Git conventions

Lately I have been following the gitmoji strategy. This means that every commit is prefixed with an emoji tthat depicts what the nature of the commit.

For branching I am following the slash strategy. This is a convention based on agilty and hierachy. The branch shouldn't exist for long... But later I've read that it can cause some problems. <br> <sub>this has to be researched further before making a concrete decision.</sub>

### Linting

This application will be using [ESLint](https://www.npmjs.com/package/eslint) with the extension [Google-Style-Guide ESlint](https://github.com/google/eslint-config-google).

To know what other settings I enabled in ESLint, check the [configuration file](./eslintrc.json).
**Most notable: For Windows VS Code users, change the linebreak style from `CRLF` to `LF`**

### Build scripts

| Keyword | Action                                                   |
| :------ | ---------------------------------------------------------|
| `start` | Start script, usually a build step or `node index.js`    |
| `dev`   | development script, runs `nodemon server.js` continously |

### Frameworks && Libaries

#### Frameworks

\*Frameworks here\*

#### Libraries

Firebase || Supabase, a real-time database, one is based on collections (noSql) while the latter is built ontop of PostgreSQL.

### API

The first API I was thinking of is the [Giphy API](https://developers.giphy.com/docs/sdk#design-guidelines).

# Feedback

<details>
<summary>9/4/21</summary>
<li>real-time data manipuleren op de server.</li>
<li>lijst data kunnen aanpassen veranderen.</li>
<li>chat history niet genoeg, data management beheren.</li>
<li>even kijken naar deze rubric.</li>
<li>data bijhouden, generen, aanpassen.</li>
<li>concept omgooien, van de chat af te gaan./li>
<li>eventueel google docs?</li>
<li>lijst van fav gebruikers = data management?</li>
<li>lijst van fav gebruikers = data management?</li>
</details>

# Bibliography

- [Firestore Datamodel](https://firebase.google.com/docs/firestore/data-model)
- [Firestore datatypes](https://firebase.google.com/docs/firestore/manage-data/data-types)
- [Expressing cardinality in ascii](https://dba.stackexchange.com/questions/230840/most-common-way-to-express-cardinality-in-ascii)

# Honourable Mentions
I would like to thank [Shabier](www.github.com/sjagoori) for helping me out with implementing socket.io, recommending [markdown-it](https://github.com/markdown-it/markdown-it) and local database wizardry. <sub>He a true wizard</sub>

# License

Copyright 2021 Nathan Bommezijn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
