<div id="top_of_readme"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JuliaGrandury/lifecycle-app-mern">
    <img src="https://img.icons8.com/external-linector-flat-linector/64/000000/external-hang-clothes-personal-hygiene-linector-flat-linector.png" width="80" height="80"/>
  </a>
  <h3 align="center">Lifecycle</h3>
  <p align="center">
    An awesome app to track your closet and organize swaps and borrows with friends!
    <br />
    <a href="https://github.com/JuliaGrandury/lifecycle-app-mern"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/JuliaGrandury/lifecycle-app-mern">View Demo</a>
    ·
    <a href="https://github.com/JuliaGrandury/lifecycle-app-mern/issues">Report Bug</a>
    ·
    <a href="https://github.com/JuliaGrandury/lifecycle-app-mern/issues">Request Feature</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project & Demo

The 2.5 trillion clothing industry has a huge problem with pollution, waste, and human rights abuses. It is one of the most detrimental industries in the world but also one we have agency to interfere with as consumers. This app is for the many of us that care about our planet and hope to see us all move towards a more sustainable and fair world or for those who simply would like to avoid breaking the bank while still expressing themselves through fashion.

Lifecycle is meant to help users organize and keep track of what they own in order to avoid unnecessary purchases. Not only that but it is also meant to encourage and facilitate swaps and exchanges of clothing between friends and family. The philosophy behind it is fouded on the fact that humans are attracted to novelty. Our midbrain (particularly the substantia nigra/ventral segmental area) responds to novel stimuli by directly activating the dopaminergic system in our brain. In other words, novelty makes us feel good. But we don't need to buy new clothes in order to produce that reaction. Borrowing an item from a friend's closet or lending an item, forgetting about it and then getting it back a couple of weeks later can produce the same reaction. Absence makes the heart grow fonder and sometimes that is all we need to want to wear our favorite items again. 

**TLDR;** LifeCycle allows users to partake in fashion in a sustainable manner for the planet and their wallets. Features include:
- Creating an account and logging in
- Uploading one's closets to the app
- Sharing your closet virtually with a circle of friends
- Submitting borrow or swap requests to friends
- Tracking items that are "out of closet" for loans or repairs
- Adding a wishlist of items their circle can view
<p align="right">(<a href="#top_of_readme">back to top</a>)</p>


## Installing LifeCycle

#### Prerequisites
1. You will need to have Node.js and npm package manager installed. Verify that you do with the commands `node -v` and `npm -v`.
If you do not, visit [Node.js](https://nodejs.org/en/) and download the version labeled LTS. To install the latest version of npm run `npm install npm@latest -g`. Finally, verify that both are correctly installed using `node -v` and `npm -v`.
2. You will also need to have a MongoDB account. If you do not, visit [MongoDB](https://www.mongodb.com/cloud/atlas/register) to create a FREE account and download MongoDB Compass Desktop GUI. Then follow these steps: 
  a. Create an Organization > Name Your Organization > Select Cloud Service: MongoDB Atlas > Create Organization
  b. Create a project > Name Your Project > Next > Create Project
  c. "Database Deployments" > Build a Database > Shared Plan (FREE) > Cloud Provider & Region: AWS and [your current region] > Name your Cluster > Create Cluster
  d. "Security Quickstart"
    - How would you like to authenticate your connection? Add a username and password > Create User -- Note: you will need these later
    - Where would you like to connect from? My Local Environment > Add My Current IP Address > Finish and Close

#### Installation Steps
1. Download the ZIP: At the top right of the web version of Github, click on the green button "<> Code" > Download Zip > Double-click on the ZIP folder to uncompress it OR clone the repo with:
   ```sh
   git clone https://github.com/JuliaGrandury/lifeycle-app-mern.git
   ```
2. Install dependencies
   ```sh
   npm i
   ```
3. Create a .env file in your server folder with the following variables:
  ```
  NODE_ENV = development // Note: you will change this to "production" in production
  PORT = 5000
  MONGO_URI = "your MongoDB database connection string obtained in the step 4"
  CLIENT_URI = "http:localhost:3000"
  API_URI = "http:localhost:5000/api/v1/"
  JWT_SECRET = "your JWT secret"
  ```
4. Connect your MongoDB and Application
 - "Database Deployments" > Connect > Connect using MongoDB Compass
 - "Databases" > Collections > Add My Own Data > Create Database > Database name [your database name] and Collection name [your collection name] > Create
 - "Overview" > Connect > Connect using MongoDB Compass > Copy the connection string > Open up Compass App and paste the string in New Connection but replace "<password>" by the password you chose earlier in step 2d and replace "test" by your database name > Connect
 - "Overview" > Connect > Connect to your application > Copy the connection string > Add a MONGO_URI = [your connection string] environment variable to your .env file created above, remember to change the database name and password as above
Note: if you encounter any issues later when connecting to your DB, verify that your current IP address is whitelisted in the Network Access Tab
5. Run the frontend of the application using `npm run start` and the backend using `nodemon server.js`
6. Run the test suite using `npm test` or a specific file using `npm test <filepath>`

<p align="right">(<a href="#top_of_readme">back to top</a>)</p>


## Built With
#### Front-end
- [ReactJS](https://reactjs.org/) - Frontend framework
- [Redux w/ hooks](https://redux.js.org/) - State management library
- [Redux Toolkit](https://redux-toolkit.js.org/) - Toolset for efficient Redux development
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Middleware which allows action creators to return a function
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [Material UI](https://mui.com/core/) - UI library used for forms

#### Back-end
- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MongoDB](https://www.mongodb.com/) - Open-source document database to store data
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file
<p align="right">(<a href="#top_of_readme">back to top</a>)</p>



## License
Distributed under the MIT License. See `LICENSE.txt` for more information.
<p align="right">(<a href="#top_of_readme">back to top</a>)</p>



## Contact
Julia Grandury - booleanjules@gmail.com

Project Link: [https://github.com/JuliaGrandury/lifecycle-app-mern](https://github.com/JuliaGrandury/lifecycle-app-mern)
<p align="right">(<a href="#top_of_readme">back to top</a>)</p>