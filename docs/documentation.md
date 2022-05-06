## TOPICS

- [Create A New User](#create-new-user)
- [Login A User](#login-a-user)
- [Get Logged In User Data](#get-logged-in-user-data)
- [Create New Note For A User](#create-new-note-for-a-user)
- [Fetch All Notes Of A User](#fetch-all-notes-of-a-user)
- [Update Note Of A User](#update-a-note-of-a-user)

## Create New User

> Endpoint: `/api/v1/auth/signup`

> Request-type: `POST`

> Authentication: `not-required`

> Fields:
>
> ```json
> {
>   "username": "<username>",
>   "name": "<name>",
>   "email": "<email>",
>   "password": "<password>"
> }
> ```

> Response:
>
> ```json
> {
>   "authToken": "...."
> }
> ```

## Login A User

> Endpoint: `/api/v1/auth/login`

> Request-type: `POST`

> Authentication: `not-required`

> Fields:
>
> ```json
> {
>   "account": "<username/email>",
>   "password": "<password>"
> }
> ```

> Response:
>
> ```json
> {
>   "authToken": "...."
> }
> ```

## Get Logged In User Data

> Endpoint: `/api/v1/auth/getuser`

> Request-type: `POST`

> Authentication: `required`

> Web-Header: `auth-token: <authToken>`

> Response:
>
> ```json
> {
>   "_id": "<id>",
>   "username": "<username>",
>   "name": "<name>",
>   "email": "<email>",
>   "date": "<date>"
> }
> ```

## Create New Note For A User

> Endpoint: `/api/v1/notes/addnote`

> Request-type: `POST`

> Authentication: `required`

> Web-Header: `auth-token: <authToken>`

> Fields:
>
> ```json
> {
>   "title": "<title>",
>   "description": "<description>",
>   "tag": "<tag>"
> }
> ```

> Response:
>
> ```json
> {
>   "user": "<user>",
>   "title": "<title>",
>   "description": "<description>",
>   "tag": "<tag>",
>   "_id": "<id>",
>   "date": "<date>"
> }
> ```

## Fetch All Notes Of A User

> Endpoint: `/api/v1/notes/getnotes`

> Request-type: `GET`

> Authentication: `required`

> Web-Header: `auth-token: <authToken>`

> Response:
>
> ```json
> {
>   "user": "<user>",
>   "title": "<title>",
>   "description": "<description>",
>   "tag": "<tag>",
>   "_id": "<id>",
>   "date": "<date>"
> }
> ```

## Update A Note Of A User

> Endpoint: `/api/v1/notes/updatenote/:id`

> Request-type: `PUT`

> Authentication: `required`

> Web-Header: `auth-token: <authToken>`

> Fields:
>
> ```json
> {
>   "title": "<title>",
>   "description": "<description>",
>   "tag": "<tag>"
> }
> ```

> Response:
>
> ```json
> {
>   "user": "<user>",
>   "title": "<newtitle>",
>   "description": "<newdescription>",
>   "tag": "<newtag>",
>   "_id": "<id>",
>   "date": "<date>"
> }
> ```

## Update A Note Of A User

> Endpoint: `/api/v1/notes/deletenote/:id`

> Request-type: `DELETE`

> Authentication: `required`

> Web-Header: `auth-token: <authToken>`

> Response:
>
> ```json
> {
>   "success": "Note has been deleted",
>   "note": {
>     "user": "<user>",
>     "title": "<newtitle>",
>     "description": "<newdescription>",
>     "tag": "<newtag>",
>     "_id": "<id>",
>     "date": "<date>"
>   }
> }
> ```
