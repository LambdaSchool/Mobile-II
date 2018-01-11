# Mobile II

## Topics - OKAY √

* `FlatList`
* `StackNavigator`
* `react-navigation`
* `axios`
* `TextInput`
* `static navigationOptions`
* `this.props.navigation`
* `this.props.navigation.navigate('Route')`
* `AsyncStorage` (It's like `localStorage` in the browser but async)

## Assignment - OKAY √

For your assignment you will be creating a mobile application with four views that connects to an api:
https://mobile-server-ii.herokuapp.com/ - OKAY √

#### Install & setup notes - OKAY √
```console
$  npm install axios react-navigation
    npm notice created a lockfile as package-lock.json. You should commit this file.
    npm WARN react-navigation@1.0.0-beta.11 requires a peer of react@* but none was installed.
    npm WARN react-navigation@1.0.0-beta.11 requires a peer of react-native@* but none was installed.
    npm WARN react-native-drawer-layout-polyfill@1.3.2 requires a peer of react-native@* but none was installed.
    npm WARN react-native-tab-view@0.0.65 requires a peer of react@* but none was installed.
    npm WARN react-native-tab-view@0.0.65 requires a peer of react-native@* but none was installed.
    npm WARN react-native-drawer-layout@1.3.2 requires a peer of react@* but none was installed.
    npm WARN react-native-drawer-layout@1.3.2 requires a peer of react-native@* but none was installed.

    + react-navigation@1.0.0-beta.11
    + axios@0.16.2
    added 10 packages, removed 607 packages and updated 20 packages in 38.192s
               ?????   ^^^^^^^^^^^   ?????
```

- there was some weirdness with setup... Possibly worth trying the CLI tools next go around?
- adding `require 'axios';` to App.js _may_ have had something to do with making the install work???

### Home: - OKAY √
This view will have two buttons. - OKAY √ (see `example` code)
Button one will say `Sign In` and will navigate the user to the `SignIn` component. - OKAY √
Button two will say `Sign Up` and will navigate the user to the `SignUp` component. - OKAY √

### SignUp: - OKAY √
This view will have two input fields and a button that says `Sign Up`.
The first input field will be for the `email`.
The second input field will be for the `password`.
When the user clicks the `Sign Up` button you will use `axios` to make a `POST` request to `/users`.
If the user successfully signs up then you will navigate the user to the `Content` component.
Be sure to save the JWT token to `AsyncStorage`.

### SignIn: - OKAY √
This view will have two input fields and a button that says `Sign In`.
The first input field will be for the `email`.
The second input field will be for the `password`.
When the user clicks the `Sign In` button you will use `axios` to make a `POST` request to `/signin`.
If you receive a valid JWT token then save it to `AsyncStorage` and then navigate the user to `Content`. (Example below)

### Content: - OKAY √
This component will take the JWT token saved to `AsyncStorage` and will put it on the header of a
`POST` request to `/users`.  The header key is `authorization`. (Example below)
Make this HTTP request from inside of `componentDidMount` and run it whenever this component is rendered.
Once you receive back the list of users from the database then display them using a `FlatList` component.

### Note about JWTs: - OKAY √
The API in this project uses JWTs to authenticate its clients.  Upon successful authentication you will receive a token from the server.  This token needs to be included on all subsequent requests to protected routes.  The JWT will look like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

Make sure that you save the JWT token to `AsyncStorage`.  You will then be able to access this token in the future even if you've closed the app.  The token will also be available from any view in your application.

```
AsyncStorage.setItem('token', response.data.token).then(() => {
  this.props.navigate('Content');
});
```
Later when you want to make an authenticated request to the API you will need to attach the previously saved JWT like this:
```
AsyncStorage.getItem('token').then((token) => { // retrieve the token from "localStorage"
  axios.get('https://mobile-server-ii.herokuapp.com/users', {
    headers: {
      authorization: token, // attach the token as a header
    }
  }).then((response) => {
    // Update state in here
  });
});
```
Once you complete the basic requirements then work on covering edge cases.  A good starting point would be to add
another password input to the `SignUp` component.  Notify the user if their second password doesn't match the first. - DONE √
Replace the characters in the password input fields with dots. - DONE √
Show the user an error message if the email they provide is already in the database.
If the user provides an incorrect email/password combo display an error message in the `SignIn` component.
Note: Never tell a user that they entered an incorrect password, always say incorrect email or password.
This makes it so people can't figure out what emails you have in your database.

NOTE: per John Wells on Slack, this might be worth trying if the above AsynStorage code snippets are inadequate:
https://www.youtube.com/watch?v=y9B5BOGdqDE


### API Routes - OKAY √

* [GET] `/users` Gets all users. Requires a header `authorization` and a valid JWT.
* [POST] `/users` Creates a user. Requires an object with two properties: `email` and `password`. Returns a JWT.
* [POST] `/signin` Requires an object with two properties: `email` and `password`. Returns a JWT.



# Extra Credit - OKAY √

For this assignment you will be creating a todo list that will take advantage
of the API you used for the first portion of this project.  Once the user has authenticated then you can make requests to the protected routes that control the `todo` collection in the database.


Address: https://mobile-server-ii.herokuapp.com/

## Extra Credit Routes - OKAY √

[POST] `/users` - Requires an `email` and `password` property on the body.
Returns a JWT and the user's info. Creates a new user in the database.

[POST] `/signin` - Requires an `email` and `password` property on the body.
Returns a JWT and the user's info.

[GET] `/users` - Requires a JWT header called `authorization`.
Returns an array of all users in the database.  Useful for debugging.

[GET] `/user` - Requires a JWT header called `authorization`.
Returns the user that the JWT is associated with.

[POST] `/todos` - Requires a JWT header called `authorization`.
The body should have a `text` property that is a String.
A new todo item will be added to the user's todos array that's associated with the JWT.

[PUT] `/todos/:todoId` - Requires a JWT header called `authorization`.
Toggles the specified todo object's `completed` property to either true or false.

[DELETE] `/todos/:todoId` - Requires a JWT header called `authorization`.
Removes the specified todo object from the JWT's user's todo's array.

## Super Extra Credit - OKAY √

Refactor your application to use Redux.
