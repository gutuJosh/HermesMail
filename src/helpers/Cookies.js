const Cookie = {

    setCookie: function(cname, cvalue, exdays, cpath){
        /*the name of the cookie (cname), the value of the cookie (cvalue), 
        the number of days until the cookie should expire (exdays), the path the cookie belongs to (cpath)*/
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path="+cpath+"";
    },

    getCookie: function(cname){
        let name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
          return false;
    },

    deleteCookie(cname){
        //set the expires parameter to a passed date to delete the cookie
        document.cookie = cname + "=";"expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

}
export default Cookie;