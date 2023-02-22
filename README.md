#Blog's monolith app where main goal is to get a deep understanding of how authentication and authorization works.

# Used JWT(Json Web Tokens) to authorize the user.
For authentication, credential verification is done by validating the hashed credentials.
Credentials are hashed using bcryptjs and stored in mongodb database.
And the authorized by assigning jwt token using jsonwebtoken library and then stored in Cookies

# Flow
> When user lands first time on home page, there is no valid jwt token that exist so he can't go to blogs route
> User can go to login/signup route & 
  -> If new user, then a new jwt token gets assigned to it and gets stored into the Cookie
  -> If user already exist, it first gets authenticated and after that a valid jwt got assigned to it

# Routes are protected using middlewares
* And user can't go back from blogs route to login/signup route after logging in from browser back button.
* By disabling the bf-cache we can achieve it.
