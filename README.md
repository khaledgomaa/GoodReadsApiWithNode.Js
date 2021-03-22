# GoodReadsApiWithNode.Js

**It's a simple goodreads api app with the first try using node.js**

**How to test this api**

**Notes :-**

# I'm using mongoDb so you need to install it first 

**All you have to do just download mongo files then connect to "database" folder exist in the repository**

**After downloading mongo files go to bin folder and run the following command mongod.exe --dbpath "path of DataBase folder in the project"**

**To install all required packages just write this command npm install**

**Database collections**

**Books , each book has the following properties :-**

    #title
    #author
    #price
    #description
    #rate
    
**Users , each user has the following properties:-**
  
    #email
    #userName
    #password
    #role
    #bookFavs --> ref to list of book document
    
 **Application contains two types of user : Admin , User**
 
 **Admin can manage books with all crud operations**
 
 **Used jwt for authorization**
 
 **Used express to handle http requests**
 
 # Apis 
 
 **User Apis**
 
 # **Register**  -Post method
 
 http://localhost:6060/api/user/register
 
 body :- 
 
 {
    "email":"",
    "userName":"",
    "password":"",
    "role":""
}

# **Login**  -Post method

http://localhost:6060/api/user/login


body :- 


{
    "email":"",
    "password":""
}

# Logout  -Post method

http://localhost:6060/api/user/logout

# AddBookTOFav  -Post method

http://localhost:6060/api/user/addBookToFav

body :- 

{
    "bookId":""
}

# Rate book in your fav

http://localhost:6060/api/user/rateBookInFav -Post method

body:- 

{
    "bookId":"6053ad292ae6cc22741e2ef6",
    "rate":1
}

# Book Apis

# Get Books 

http://localhost:6060/api/book/  -Get method


# Add new book

http://localhost:6060/api/book/add   -Post method

body :- 

{
    "title":"",
    "author":"",
    "price":int value,
    "description":""
}
 
# edit book

http://localhost:6060/api/book/edit   -Put method

body :- 

{
    "id": "",
    "title":"",
    "author":"",
    "description":""
}

# remove book

http://localhost:6060/api/book/delete  -Delete method

body :- 

{
    "bookId":""
}
