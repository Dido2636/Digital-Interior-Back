Deployment procedure
This documentation will guide you through the deployment of the application. Back-end 

Back-end application deployment
The back-end of the app is written in Express/Node.

Make sure to add your own .env file. All the environment variables you will need are listed in the file env.sample.

To run the project locally:
Install the dependencies:

npm install
Run the project:

npm run dev
To deploy the project:
Commit your app to a repository on github.com
Create an account on Vercel.com
Create a new project called chocolate-manager-back
In the secrets section add the environment variable called MONGO_URL=mongodb://your-mongo-url
Link the project to your github repository corresponding to chocolate-manager-back
Whenever you will push to your github repository, your app will be automatically deployed on vercel.
Front-end deployment
The front-end of the application is written in React.js.

Make sure to add your own .env file. All the environment variables you will need are listed in the file env.sample.

