var button = document.getElementById('submit_btn') ;
button.onclick = function() {
      
  
    var request = new XMLHttpRequest() ;
    request.onreadystatechange = function() {

    if(request.readyState === XMLHttpRequest.DONE) {
        if(request.status === 200)
          {
              
          console.log('text send successsfully') ;
 
  
          }
              
          else if(request.status === 500){
              alert("Something went wrong on the server") ;
          }
    }
  
    
        
    };
    var text = document.getElementById('information').value;
    
    //console.log(text);
    
    
    request.open('POST', '/text', true) ;
    request.setRequestHeader('Content-Type','application/json') ;
    request.send(JSON.stringify({information: text})) ;

    
};