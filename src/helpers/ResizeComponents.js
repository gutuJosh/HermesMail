//Responsive Components: a Solution to the Container Queries Problem

class ResizeComponents{

    constructor(props) {

      this.options = { //default breakpoints
        breakpoints: {
           "xs" : 767,
           "sm" : 768,
           "md" : 992,
           "lg" : 1200
        },
        items: null//items to observe
      };
  
      
        //update options
        if (typeof props === "object") {

          for (var property in props) {

            if (props.hasOwnProperty(property)) {
              this.options[property] = props[property];
            }

          }

        }

        if(this.options.items === null){
          console.log('Missing html object');
          return;
        }

        // Only run if ResizeObserver is supported.
        if ('ResizeObserver' in window) {
             // Create a single ResizeObserver instance to handle all
		    // container elements. The instance is created with a callback,
		   // which is invoked as soon as an element is observed as well
		  // as any time that element's size changes.
          const resizer = new ResizeObserver(
            this.handleResize.bind(this),
            this.options
          );

          document.querySelectorAll(this.options.items).forEach( item => {
            resizer.observe(item);
          });

        } 
        else {

          console.log('ResizeObserver not supported!');

        }
    
    }
  
  
    handleResize(entries) {  
      try{

        const self = this;
      
        entries.forEach((entry) => {

                // If breakpoints are defined on the observed element,
                // use them. Otherwise use the defaults.
                const breakpoints =  entry.target.dataset.breakpoints ? JSON.parse(entry.target.dataset.breakpoints) : self.options.breakpoints;

                Object.keys(breakpoints).forEach( (breakpoint) => {

                    if(entry.contentRect.width <= breakpoints['xs']) {
                        entry.target.classList.add('xs');
                        entry.target.classList.remove('sm', 'md', 'lg');
                     }
                     else{
                        var minWidth = breakpoints[breakpoint];

                        if (entry.contentRect.width >= minWidth) {
                            entry.target.classList.add(breakpoint);
                        
                        } else {
                            entry.target.classList.remove(breakpoint);
                        }

                        entry.target.classList.remove('xs');
                    }

                });//end object keys
        });//end entries foreach
      }
      catch(e){
        console.log(e.message);
      }
  
    }
  }
  
  export default ResizeComponents;
  