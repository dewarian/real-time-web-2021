# Basic Chat app

## Table of Content

- [description](#description)
- [Problem](#problem)
- [Solution](#solution)
- [Future](#future)
- [Technicalities](#technicalities)
- [dependencies](#future)
- [Future](#future)
  - [Coding conventions](#coding-convention)
  - [Build Scripts](#build-scripts)
  - [Frameworks && Libraries](#frameworks-&&-libraries)

## Description

> Feedback 9/4/21:
>
> - real-time data manipuleren op de server.
>   - lijst data kunnen aanpassen veranderen.
> - chat history niet genoeg, data management beheren.
>   - even kijken naar deze rubric.
>   - data bijhouden, generen, aanpassen
> - concept omgooien, van de chat af te gaan.
>   - eventueel google docs?
> - lijst van fav gebruikers = data management?
>   in a game: all time best player; top list that is being constantly updated

> **Disclaimer:** If you want to read the course documentation, the [branch `docs`](https://github.com/dewarian/real-time-web-2021/tree/docs) contain the latest information of this course.

A chat app called **Basic Chat** build in web technologies to expand the knowledge about webSockets via [socket.io](https://www.socket.io).

The application is a simplified version of a chatting platform like WhatsApp or Telegram. Simplified in the way of there isn't a special user verification system where the system recognizes the different users or prevent spamming the creation of users.

## Problem

The current problem is that I have zero experience with [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), This is problematic as I would need to create something that enables real-time, bidirectional and event-based communication, e.g. a chat service.

## Solution

The best solution would be a full blown WhatsApp killer with features that I like form other platforms such as Telegram. But considering the complexity of this idea I have to break it open and keep it to the core. _A simple chatting application_.

### Sketches

<kbd>
  <img src="https://user-images.githubusercontent.com/13199349/114191420-afbe9880-994c-11eb-9e5b-4a30408cefe0.jpg" alt="Idea concept of chatapp">
</kbd>

The UI that I am visualising for this WhatsApp clone is a mixture between Dribbble, Telegram and WhatsApp.

The interface isn't fixed yet as I am dabbling between a minimal variant or a bubbly variant.
<sub>Potentionally using this as an option in settings.</sub>

<kbd>
  <img src="https://user-images.githubusercontent.com/13199349/114191437-b3521f80-994c-11eb-89f1-aae1bb58a7f4.jpg" alt="UI concept of chatapp">
</kbd>

## Future

As mentioned, I will simplify this idea but ideally I would have the following features implemented:

- **Giphy / Tenor GIF support**
- **Proper markdown text support**
  - Altering text with Bold, Italics and, Monospace text formatting. Be it with markdown or with selection and shortcuts.
- **Replying to messages**, specifying to which message you are replying to.
- **Deleting content**, Deleting conversations or messages that you don't want to have or share anymore.
- **Personalification**, settings that you specifically want
  - This could be colours, darkmode, how text is displayed.
  - Profile, information about the user (you) and able to alter it.
  - Login system, OAuth, Google login, Github login, anything to identify and gather user data.
- **Media sharing**, Sharing media with friends, photos, videos or messages.
- **Custom actions**, imagine customizable actions, E.g. where you can chat with a store and buy something with a command `/buy item1`.

## Technicalities

### Installation

For development run the following commands:

```ZSH
npm install
npm start
# or
yarn run
```

### Dataflow

The data flows bi-directional.

### Dependencies

devDependencies || dependencies

### Coding conventions

To keep the codebase clean and readable for whoever dares to read the source, it will adhere to a set of rules, conventions commonly found in similar projects.

### Git conventions

Lately I have been following the gitmoji strategy. This means that every commit is prefixed with an emoji tthat depicts what the nature of the commit.

For branching I am following the slash strategy. This is a convention based on agilty and hierachy. The branch shouldn't exist for long... But later I've read that it can cause some problems. <br> <sub>this has to be researched further before making a concrete decision.</sub>

#### Linting

This application will be using [ESLint](https://www.npmjs.com/package/eslint) with the extension [Google-Style-Guide ESlint](https://github.com/google/eslint-config-google).

### Build scripts

| Keyword | Action                                                |
| :------ | ----------------------------------------------------- |
| `start` | Start script, usually a build step or `node index.js` |

### Frameworks && Libaries

#### Frameworks

\*Frameworks here\*

#### Libraries

Firebase || Supabase, a real-time database, one is based on collections (noSql) while the latter is built ontop of PostgreSQL.

### API

The first API I was thinking of is the [Giphy API](https://developers.giphy.com/docs/sdk#design-guidelines).

# License

Copyright 2021 Nathan Bommezijn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
