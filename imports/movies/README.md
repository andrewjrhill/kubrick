# Movies Module
This module is responsible for all movie functionality.

### Routing

This module handles the following routes:

* Movie list view route @ /movies (`./routes.js`).
* Movie single view route @ /movies/:_id (`./routes.js`).
* Movie edit view route @ /movies/:_id/edit (`./routes.js`).

### Features

This module handles the following functionality:

* Creation of MongoDB Movies Collection (`./api/collection.js`).
* Creation of MongoDB Movies Schema (`./api/schema.js`).
* MongoDB Movies Schema publication (`./api/publications.js`).
* Managing TheMovieDB functionality (`./api/TheMovieDB.js`).)

* Movies create helper functions (`./ui/helpers/movies-create.js`).
* Movies create templates (`./ui/templates/movies-create.html`).

* Movies edit helper functions (`./ui/helpers/movies-edit.js`).
* Movies edit templates (`./ui/templates/movies-edit.html`).

* Movies list helper functions (`./ui/helpers/movies-list.js`).
* Movies list templates (`./ui/templates/movies-list.html`).

* Movies single helper functions (`./ui/helpers/movies-single.js`).
* Movies single templates (`./ui/templates/movies-single.html`).
