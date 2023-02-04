# ADINOTE-BACKEND

> NOTE: There is also a frontend part for this project in repository [Adinotes-NodeJS_Frontend](https://github.com/AdithyanA2005/AdiNotes-ReactJS_Frontend)


## Steps to start the backend

> Clone the github repository
> ```bash
> git clone https://github.com/AdithyanA2005/AdiNotes-NodeJS_Backend.git
> ```

> Install the dependencies
> ```bash
> yarn install
> ```

> Create the `.env` file inside the project folder
> ```bash
> PORT = <PORT_TO_OPEN_THE_SERVER_IN>
> JWT_SECRET = <YOUR_JWT_SECRET>
> DATABASE_URL = <YOUR_MONGODB_DB_URL>
> PASSWORD_MINIMUM_LENGTH = <MIN_LENGTH_OF_USERS_PASSWORD>
> PASSWORD_MAXIMUM_LENGTH = <MAX_LENGTH_OF_USERS_PASSWORD>
> USERNAME_MINIMUM_LENGTH = <MIN_LENGTH_OF_USERS_USERNAME>
> USERNAME_MAXIMUM_LENGTH = <MAX_LENGTH_OF_USERS_USERNAME>
> NAME_MAXIMUM_LENGTH = <MAX_LENGTH_OF_USERS_NAME>
> NOTE_TITLE_MINIMUM_LENGTH = <MAX_LENGTH_OF_NOTES_TITLE>
> NOTE_TITLE_MAXIMUM_LENGTH = <MIN_LENGTH_OF_NOTES_TITLE>
> NOTE_DESCRIPTION_MINIMUM_LENGTH = <MIN_LENGTH_OF_NOTES_DESCRIPTION>
> NOTE_DESCRIPTION_MAXIMUM_LENGTH = <MAX_LENGTH_OF_NOTES_DESCRIPTION>
> ```

> Start the devlopement server
> ```bash
> nodemon index.js
> ```


## The backend API for Adinote
- Read the [documentation](./docs/documentation.md) of the api
