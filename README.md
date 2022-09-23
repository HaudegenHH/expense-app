# MERN Stack App that helps to keep track of expenses

This app uses MongoDB Atlas - the cloud version of MongoDB

1. Go to mongodb.com
2. Sign in with google account
3. make a new "cluster" (with username / password that you create)
4. NOT connecting with current id-address, but "Allow connection from anywhere" (..eg you app)
5. copy the connection string:
   "mongodb+srv://< Username >:< Password >@< Clustername >etc"
   ..and use it in database/mongodb.js for connecting with mongodb with the help of mongoose (which you install first with npm)
6. Then you could also outsource the URL string with the credentials to the .env file
   Et voila! DB connection done!

Next step to continue and in order to store the data you need to create a model/schema etc...
