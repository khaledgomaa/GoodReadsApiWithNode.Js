# GoodReadsApiWithNode.Js

**It's a simple goodreads api apps with the first try using node.js**

**How to test this api**

**Notes :-**

# I'm using mongoDb so you need to install it first 

**All you have to do just download mongo files then connect to database folder exist in the repository**

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
 
 **Admin can manage books and acutally not all crud operation covered just adding**
 
 **Used jwt for authorization **
 
 **Used express to handle http requests**
 
 # Apis 
 
 **User Apis**
 
 # **Register**
 
 http://localhost:6060/api/user/register
 
 body :- 
 
 {
    "email":"",
    "userName":"",
    "password":"",
    "role":""
}

# **Login**

http://localhost:6060/api/user/login


body :- 


{
    "email":"",
    "password":""
}

# Logout

http://localhost:6060/api/user/logout

# AddBookTOFav

http://localhost:6060/api/user/addBookToFav

body :- 

{
    "bookId":""
}

# Rate book in your fav

http://localhost:6060/api/user/rateBookInFav

body:- 

{
    "bookId":"6053ad292ae6cc22741e2ef6",
    "rate":1
}

# Book Apis

# Get Books 

http://localhost:6060/api/book/


# Add new book

http://localhost:6060/api/book/add

body :- 

{
    "title":"",
    "author":"",
    "price":int value,
    "description":""
}
 
