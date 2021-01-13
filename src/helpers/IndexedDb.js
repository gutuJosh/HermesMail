const IndexedDb = function(dbName, version = false){

    this.dataBase = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.dbName = dbName;
    this.values = null;
    this.action = null;
    this.data = {
      'status' : '',
      'message' : '',
      'values' : null,
      'dbVersion' : version !== false ? version : null
    };

    this.connection = (objectName) => {
     return new Promise((resolve, reject) => {
        
       const self = this;

        if (!('indexedDB' in window)) {
            self.data.status = 'ko';
            self.data.message = 'This browser doesn\'t support IndexedDB!';
            reject(this.data);
        }

     
        const dbConnect = self.data.dbVersion !== null ?  this.dataBase.open(this.dbName, self.data.dbVersion) : this.dataBase.open(this.dbName);
        

        dbConnect.onerror = function(event) {
            self.data.status = 'ko';
            self.data.message = dbConnect.error;
            reject(this.data);
        };

        dbConnect.onsuccess = async(event) => {
            //db = dbConnect.result;
            var db = event.target.result;
            //console.log('Version: '+db.version);
          
            if(self.action === 'INSERT'){
                 db = dbConnect.result;
                 try{
                  let transaction = db.transaction([objectName], "readwrite");
                  // create an object store on the transaction
                  let objectStore = transaction.objectStore(objectName);
                  // Make a request to add our newItem object to the object store
                  let objectStoreRequest = objectStore.add(self.values);
                  objectStoreRequest.onsuccess = function(event) {
                    //report the success of our request
                    self.data.status = 'ok';
                    self.data.message = 'A new item was added to ' + objectName + 'successfully!';
                    resolve(self.data);
                  };
                 // report on the success of the transaction completing, when everything is done
                 transaction.oncomplete = function(event) {
                  //console.log('Transaction completed.');
                  db.close();
                 };

                 transaction.onerror = function(event) {
                  self.data.status = 'ko';
                  self.data.message = `Can't insert data into ${objectName} due to error: ${transaction.error}`;
                  reject(self.data);
                 };
                }
                catch(error){
                  db.close();
                  self.data.status = 'ko';
                  self.data.message = `Can't insert data into ${objectName} due to error: ${error.name}`;
                  reject(self.data);
                }
            }//end if INSERT
            else if(self.action === 'SELECT'){
             
                //if object exist
                if(db.objectStoreNames.length > 0){
                 try{ 
                  var transaction = db.transaction([objectName]);
                  var objectStore = transaction.objectStore(objectName);
                  var query = ('getAll' in objectStore)  ? objectStore.getAll() : objectStore.openCursor();
                  const list = [];
                  query.onsuccess = function(event) {
                    // Do something with the request.result!
                    if(('getAll' in objectStore)){
                      self.data.status = 'ok';
                      self.data.message = 'Quesry was successful';
                      self.data.values = query.result;
                      self.data.version = db.version;
                      resolve(self.data);
                    }
                    else{
                      var cursor = event.target.result;
                      // Fallback to the traditional cursor approach if getAll isn't supported.
                      if(cursor) {
                        // db.value contains the current record being iterated through
                        list.push(cursor.value)
                        try{
                          cursor.continue();
                        }
                        catch(e){
                          console.log(e);
                        }
                      } else {
                        // no more results
                        self.data.status = 'ok';
                        self.data.message = 'Query was successful';
                        self.data.values = list;
                        self.data.version = db.version;
                        resolve(self.data);
                      }
                    }
                    
                  };
                  query.onerror = function( event ) {
                    // Handle errors!
                    db.close();
                    self.data.status = 'ko';
                    self.data.message = `Can't select from ${objectName} due to error: ${event}`;
                    reject(self.data);
                  };
                  transaction.oncomplete = function(event) {
                   //console.log('Select transaction completed.');
                    db.close();
                  };
                }
                catch(error){
                  db.close();
                  self.data.status = 'ko';
                  self.data.message = `Can't select from ${objectName} due to error: ${error.name}`;
                  reject(self.data);
                }
              } // end if db.objectStoreNames
              else {
                  self.data.status = 'ko';
                  self.data.message = objectName +' is empty';
                  reject(self.data);
                }
            }//end if SLELECT
            else if(self.action === 'DELETE'){//delete one entry
              db = dbConnect.result;
              // open a read/write db transaction, ready for deleting the data
              let transaction = db.transaction([objectName], "readwrite");
              // create an object store on the transaction
              let objectStore = transaction.objectStore(objectName);
              // Make a request to delete the specified record out of the object store
              let objectStoreRequest = objectStore.delete(this.values);
              objectStoreRequest.onsuccess = function(event) {
                // report the success of our request
                self.data.status = 'ok';
                self.data.message = `The item ${this.values} was removed successfully!`;
                resolve(self.data);
              };
              transaction.oncomplete = function(event) {
                //console.log('Transaction completed.');
                db.close();
              };
            
              transaction.onerror = function(event) {
                self.data.status = 'ko';
                self.data.message = `Can't delete entry from ${objectName} due to error: ${transaction.error}`;
                reject(self.data);
              };
            }//end if DELETE
            else if(self.action === 'CLEAR'){//CLEAR ALL DATA
              db = dbConnect.result;
              let transaction = db.transaction([objectName], "readwrite");
              let objectStore = transaction.objectStore(objectName);
              let objectStoreRequest = objectStore.clear();
              objectStoreRequest.onsuccess = function(event) {
                // report the success of our request
                self.data.status = 'ok';
                self.data.message = 'All data from ' + objectName + ' was successfully removed!';
                resolve(self.data);
              };
              transaction.oncomplete = function(event) {
                //console.log('Transaction completed.');
                db.close();
              };
            
              transaction.onerror = function(event) {
                self.data.status = 'ko';
                self.data.message =  `Can't remove data from ${objectName} due to error: ${transaction.error}`;
                reject(self.data);
              };
            }//end CLEAR
        };

     });//close promise  
     
     
    }

    this.createObject = (db, objectName, options, values) => {
      return new Promise((resolve) => {     
        var objectStore = db.createObjectStore(objectName, { keyPath : options.keyPath });
        options.index.forEach( item => {
          objectStore.createIndex(item.name, item.name, { unique: item.unique });
        });
        if(values){
          // Use transaction oncomplete to make sure the objectStore creation is 
          // finished before adding data into it.
          objectStore.transaction.oncomplete = function(event) {
            // Store values in the newly created objectStore.
            var listObjectStore = db.transaction(objectName, "readwrite").objectStore(objectName);
            values.forEach(function(item) {
              listObjectStore.add(item);
            });
          };
        }
        resolve('success');
      });
   }

    this.getData = async(objectName) => {
       this.action = 'SELECT';

       const data = {
        'status' : 'ok',
        'categories' : [],
        'nations' : [],
        'liste' : []
       }
       const lists = await this.connection(objectName);
       if(Array.isArray(lists.values) === false || lists.status === 'ko'){
                data.status = 'ko';
                data['message'] = lists.message;
                return data;
       }
        data.liste = lists.values;
        data.liste.forEach( (item) => {
           try{
              if(data.nations.includes(item.n) === false && item.n.includes('Tutte') === false){
                  data.nations.push(item.n);
              }
              if(data.categories.includes(item.pn) === false && item.pn.includes('Tutte') === false){
                  data.categories.push(item.pn);
              }
            }
            catch(error){
              console.log(error.message);
            }
        });
      return data;
    }


    this.storeData = async(objectName, values) => {
         this.action = 'INSERT';
         this.values = values;
         const response = await this.connection(objectName);
         return response;
    };

    this.requestData = async(objectName) => {
      try{
       this.action = 'SELECT';
      }
      catch(err){
        console.log(err.message);
      }
       const data = await this.connection(objectName);
       return data;

    };

    this.removeData = async(objectName, values) => {
      this.action = 'DELETE';
      this.values = values;
      const response = await this.connection(objectName);
      return response;
    };

    this.clearAll = async(objectName) => {
      this.action = 'CLEAR';
      const response = await this.connection(objectName);
      return response;
    };

}
export default IndexedDb;