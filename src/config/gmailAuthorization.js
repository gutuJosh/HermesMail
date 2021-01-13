 // Client ID and API key from the Developer Console
 // Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
export const GmailAuthorization = {
    clientId : '367639261468-73c6d8kqfds1sf8dc94c5ib46viqqf9i.apps.googleusercontent.com',
    apiKey : 'AIzaSyD8uQqjzM-FvJ0UKMt1K6hpR694RseUs10',
    scopes : 'https://mail.google.com/'
};

//Initializes the API client library 
export function handleClientLoad(fn) {
  
    window.gapi.client.setApiKey(GmailAuthorization.apiKey);
    window.setTimeout(async () =>{
        var response = await checkAuth();
        fn(response);
    },1);
}

function checkAuth(){
 return new Promise((resolve) => {
    window.gapi.auth.authorize({
    client_id: GmailAuthorization.clientId,
    scope: GmailAuthorization.scopes,
    immediate: true
    }, (authResult) => resolve(authResult));
 });
}

 /**
 *  Sign in the user.
 */
export function handleUserAuth() {
 return new Promise((resolve) => {
    window.gapi.auth.authorize({
      client_id: GmailAuthorization.clientId,
      scope: GmailAuthorization.scopes,
      immediate: false
    }, (authResult) => resolve(authResult));
  });
  //window.gapi.auth2.getAuthInstance().signIn();
}

 /**
 *  Inject google script into dom and assign a callback after script done loading
 */
export function gmailLoadApi(handleApiLoad) {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/client.js?onload="+handleApiLoad;
    script1.async = true;
    script1.defer = true;
    let counter = 0;
    document.querySelectorAll('script').forEach( (item) => {
        if(item.src === 'https://apis.google.com/js/client.js?onload='+handleApiLoad){
            counter++;
        }
    });
    if(counter === 0){
       document.body.appendChild(script);
       document.body.appendChild(script1);
    }
}

 /**
 *  Sign out the user.
 */
export function handleSignout(event) {
    window.gapi.auth2.getAuthInstance().signOut();
}


/**
 * Get all Labels in the authorized user's inbox. If no labels
 * are found return false.
 */
export function listLabels() {

  return new Promise((resolve, reject) => {
    window.gapi.client.load('gmail', 'v1', () => {
        window.gapi.client.gmail.users.labels.list({
            'userId': 'me'
        }).then((response) => {
            const labels = response.result.labels;
            if (labels && labels.length > 0) {
                const labelNames = labels.map( (item) => item.name);
                resolve(labelNames);
            } else {
                reject(false);
            }
        });
    });
  });

}

/**
 * List messages in the authorized user's label. Return 10 messages at a time + nextpageToken.
 * Assing nextpageToken to false if there are no messages to list
 */


 export function listMessages(label, pageToken = false){

  return new Promise((resolve, reject) => {

    window.gapi.client.load('gmail', 'v1', () => {
        const messageList = [];
        let usrCredentials = {
            'userId': 'me',
            'labelIds': label,
            'maxResults': 10,
        }
        if(pageToken !== false){
            usrCredentials['pageToken'] = pageToken;
        }
        const request =  window.gapi.client.gmail.users.messages.list(usrCredentials);
        request.execute( (response) => {
            if(typeof response === 'undefined'){
                reject('response is undefined!');
            }
            else if(response.code === 400){
                reject(response.message);
            }
            else if(response.resultSizeEstimate === 0){
                resolve(messageList);
            }
            else{
             
                response.messages.forEach( async (item) => {
                    let messageRequest = window.gapi.client.gmail.users.messages.get({
                        'userId': 'me',
                        'id': item.id
                    });
                    await messageRequest.execute( (message) => {
                        messageList.push(message);
                    });
                });
                messageList.push({
                    'pageToken' : typeof response.nextPageToken !== 'undefined' ? response.nextPageToken : false
                });
                resolve(messageList);
            }//end else

        });//request

    });//client load

  });//new promise
 }


