# Kubrick
#### This is the primary codebase for Kubrick

Kubrick is a reactive application that allows you to keep track of all the movies in your collection.


## Technology

Kubrick was built on the default MeteorJS stack which includes the following technologies:

* [Meteor.js](https://meteor.com/) - An open source JavaScript platform for web, mobile, and desktop.
* [Blaze](https://www.meteor.com/blaze/) - Meteors frontend rendering system, to build usable and maintainable user interfaces.
* [Node.js](https://nodejs.org/) - Event-driven I/O server-side JavaScript environment based on V8.
* [MongoDB](https://www.mongodb.com/) - A free and open-source cross-platform document-oriented database.
* [SCSS](http://sass-lang.com/) - Professional grade CSS extension language.
* [ES6](http://tc39wiki.calculist.org/es6/) - The latest update to JavaScript that includes dozens of new features.
* [Yarn](https://yarnpkg.com/en/) - Fast, reliable, and secure dependency management.


## Getting Started (OSX)

Ensure you have the above dependencies installed on your machine.

**1. Clone the repository:**

```
$ git clone https://github.com/Sntax/kubrick
```

**2. Switch to your working directory and install all dependencies:**

```
$ cd kubrick && yarn install
```

**3. Clone and rename the applications `settings` directory to the project root to access API tokens and secrets:**

Note: While I am technically hosting these secrets on a public Gist, my intent here is to demonstrate an understanding of securing a projects secrets by not commiting them to version control. A public Gist is most certainly not an appropriate place to store a true projects secrets.

```
$ git clone https://gist.github.com/80552adfdf14256393c2c64e6022610f.git && sudo mv ./80552adfdf14256393c2c64e6022610f/ ./settings/
```

**4. Start your application:**

```
$ npm start
```
