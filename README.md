# rest-api by William Suryawan

## My App Name

#### Heroku Login: https://apricot-crumble-85914.herokuapp.com/

#### List of users routes (without any authentication)

| Routes    | HTTP   |  Description |
| :--------:|:-----:|:----:|
| /api/signup| POST | Signup with new user info |
| /api/signin| POST | Signin and get an access token based on credentials |

#### List of users routes (with authentication: user needs to login and his role is admin)
##### (for authenticated user: only user with his account can access his own account)

| Routes    | HTTP   |  Description |
| :--------:|:-----:|:----:|
| /api/users| GET | Get all the users info (admin only) |
| /api/users/:id| GET | Get a single user info (admin and authenticated user) |
| /api/users| POST | Create a user (admin only)|
| /api/users/:id| DELETE | Delete a user (admin only) |
| /api/users/:id| PUT | Update a user with new info (admin and authenticated user)|

