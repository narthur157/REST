To run this on your machine you need:
  node (http://nodejs.org/)
  mongo (http://www.mongodb.org/downloads)

`git clone https://github.com/BostonProjectCollaboration/note-overflow.git && cd note-overflow && npm install`

We've gone from nothing to pre-alpha stage here aka it's almost like this will happen eventually or very soon depending on my motivation. This is pre-alpha quality software so your mileage will vary from very poor to poor.

TODO:
  Fix all the anti-angular patterns
  Encapsulate all the functionality so that there is hope of eventually making a real UI
  Permissioning in its entirety
  Possibly stop using node/mongo? Not actually using them for anything significant right now 
  
TODO EVENTUALLY:
  Don't use realtime connections when people aren't collaborating. It's not necessary to have realtime if you're just watching somebody else do stuff. Might require digging into firepad code and incredible amounts of hacking. Probably better to just throw money at firebase if it's actually a problem
  
  
