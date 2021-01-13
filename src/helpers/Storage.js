const Store = {

  setLocal: function(name, value){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage
        localStorage.setItem(name, value);// Store
        return true;
      } else {
        // Sorry! No Web Storage support..
        return false;
      }
  },

  getLocal: function(name){
         if(typeof(Storage) !== "undefined" && localStorage[name]){
           return localStorage[name];
         }
         else{
          return false;
         }      
  },

  removeLocalItem: function(name){
      if(typeof(Storage) !== "undefined" && localStorage[name]){
         localStorage.removeItem(name);   
         return true;
      }
      else{
          return false;
      }
  },

  setSession : (name, value) => {
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage
      sessionStorage.setItem(name, value);// Store
      return true;
    } else {
      // Sorry! No Web Storage support..
      return false;
    }
  },

  getSession: (name) => {
    if (typeof(Storage) !== "undefined" && sessionStorage[name]) {
        return sessionStorage[name];
    }
    else{
      return false;
    }
  },

  removeSession: (name) => {
    if (typeof(Storage) !== "undefined" && sessionStorage[name]) {
      sessionStorage.removeItem(name);
      return true;
    }
    else{
      return false;
    }
  },

  clearSessionStorage: () => {//remove all saved data from sessionStorage
    if (typeof(Storage) !== "undefined") {
        sessionStorage.clear();
        return true;
    }
    else{
      return false;
    }
  }

}
export default Store;