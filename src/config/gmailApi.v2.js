 // Client ID and API key from the Developer Console
 // Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
export const GmailAuthorization = {
    clientId : '367639261468-73c6d8kqfds1sf8dc94c5ib46viqqf9i.apps.googleusercontent.com',
    apiKey : 'AIzaSyD8uQqjzM-FvJ0UKMt1K6hpR694RseUs10',
    scopes : 'https://mail.google.com/'
};

//Authorize the app to use gmail api 
export function authenticate() {
  
    return window.gapi.auth2.getAuthInstance()
    .signIn({scope: GmailAuthorization.scopes})
    .then( loadClient(),
          (err) => { 
              console.error("Error signing in", err);
              handleSignout();
              window.location.reload();
             }
        );
}

export function loadClient() {
    console.log("Sign-in successful");
    return new Promise((resolve, reject) => {
        window.gapi.client.setApiKey(GmailAuthorization.apiKey);
        return window.gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
                .then( () => { 
                    console.log("GAPI client loaded for API"); 
                    resolve(true);
                },
                (err) => { 
                    console.error("Error loading GAPI client for API", err); 
                    reject(false);
                }
        );
    });
}

 /**
 *  Make sure the client is loaded and sign-in is complete before calling this method.
 */
export function getUserProfile() {
    return window.gapi.client.gmail.users.getProfile({'userId' : 'me'})
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
          },
          function(err) { 
              console.error("Execute error", err);
         });
}

 /**
 *  Inject google script into dom and initializes the API client library  after script done loading
 */
export function gmailLoadApi() {
 return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/api.js";
    script1.async = true;
    script1.defer = true;
    script1.addEventListener('load', () => {
        window.gapi.load("client:auth2", function() {
            window.gapi.auth2.init({client_id: GmailAuthorization.clientId}).then( () => {
                console.log('Script loaded!');
                resolve(true);
            });
        });
    }, false);
    let counter = 0;
    document.querySelectorAll('script').forEach( (item) => {
        if(item.src === 'https://apis.google.com/js/api.js'){
            counter++;
        }
    });
    if(counter === 0){
       document.body.appendChild(script);
       document.body.appendChild(script1);
    }
  });
}

 /**
 *  Sign out the user.
 */
export function handleSignout() {
   window.gapi.auth2.getAuthInstance().signOut();
}


/**
 * Get all Labels in the authorized user's email account. If no labels
 * are found return false.
 */
export function listLabels() {

  return new Promise((resolve, reject) => {
   
        return window.gapi.client.gmail.users.labels.list({
            'userId': 'me'
        }).then( (response) => {
                const labels = response.result.labels;
                if (labels && labels.length > 0) {
                    const labelNames = labels.map((item) => item.name);
                    resolve(labelNames);
                } else {
                    reject(false);
                }
            });
    });
}

/**
 * List messages in the authorized user's label. Return 10 messages at a time + nextpageToken.
 * Assing nextpageToken to false if there are no messages to list
 */


 export function listMessages(label, pageToken = false){

  return new Promise( async (resolve, reject) => {
   
        const messageList = [];
        let usrCredentials = {
            'userId': 'me',
            "includeSpamTrash": false,
            'labelIds': [label],
            'maxResults': 10,
        }

        if(pageToken !== false){
            usrCredentials['pageToken'] = pageToken;
        }
        //if the web page was reloaded we need to reload the client
        if(typeof window.gapi.client.gmail === 'undefined'){

            await authenticate();
        }
      
        return window.gapi.client.gmail.users.messages.list(usrCredentials).then( (response) => {
            if(typeof response === 'undefined'){
                reject('response is undefined!');
            }
            else if(response.status === 400){
                reject(response.message);
            }
            else if(response.result.resultSizeEstimate === 0){
                resolve(messageList);
            }
            else if(response.status === 200){
                console.log(response)
                response.result.messages.forEach( async (item) => {
                    let messageRequest = window.gapi.client.gmail.users.messages.get({
                        'userId': 'me',
                        'id': item.id
                    });
                    await messageRequest.execute( (message) => {
                        messageList.push(message);
                    });
                });
                messageList.push({
                    'pageToken' : typeof response.result.nextPageToken !== 'undefined' ? response.result.nextPageToken : false
                });
                resolve(messageList);
            }
            else{
                reject(response);
            }//end else

        },
        (err) => console.error("Execute error", err)
        );//request

     });
 }


