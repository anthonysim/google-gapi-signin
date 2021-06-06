# Google Sign In Authentication

## Table of Contents

1. [Description](#Description)
2. [Usage](#Usage)
3. [Technologies](#Technologies)
4. [Directions](#Directions)

## Description

Practice Google sign-in authentication. The whole purpose of this was to get a better understanding of how to do everything stated in https://developers.google.com/identity/sign-in/web/reference, basically having Google handle the authentication and sign in. Redux was used for state management, redux was unecessary nevertheless I wanted practice.

## Usage
```
Install Dependencies:
- npm install

Start App:
- npm start
```

## Technologies, Packages, etc.

- React
- Redux
- Google Sign-In for Websites (https://developers.google.com/identity/sign-in/web/reference)

## Directions

1. Add the following script to index.html
```
<script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
```

2. Load and initiate with a "Component Did Mount" to load and initate the Google API platform library. Make sure to create a Google client id (https://console.cloud.google.com/apis/credentials).

```
useEffect(() => {
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      clientId: 'put in your google client id',
      scope: 'email'
    })
  });
  // eslint-disable-next-line
}, [])
```

3. Create a button and clickHander to sign in and out.

```
  // clickHandler
  async function googleHandler() {
  try {
    const auth = window.gapi.auth2.getAuthInstance();

    if (auth.isSignedIn.get() === false) {
      await auth.signIn();
    } else {
      await auth.signOut();
    }
  } catch (err) {
    console.error(err);
  }
}

// button
<button onClick={googleHandler}>Sign in with Google</button>
```

4. Useful gapi methods:

```
const auth = window.gapi.auth2.getAuthInstance();

// checks if you're signed in/out true/false
auth.isSignedIn.get()

// signs you in
auth.signIn();

// signs you out
auth.signOut();
```

