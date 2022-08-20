# REST API with Node JS and Express

## What is it?

It's an REST API project made with express.js. For database I'm using JSON database that came from package "file-system-db".  
Passwords are stored as bcrypt hash. User ids are UUID's with chars "-" removed. This id is sent in JWT
token because we don't want to send any identifiable data. These ids are also used in JSON database where you 
can get data object easily with users[uuid].

## What can it do?

You can register users and create posts while JWT tokens are used for authentication. Basically, this is very simple "headless" blog.

## Testing

Start server and open "src/test.html". Register user and login after that you can create posts and list them out. 

## Developed and tested on Ubuntu!

### HAVE FUN!