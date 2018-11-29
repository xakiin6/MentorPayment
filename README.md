# Mayma (Mentor Payment)

This project is developed using `angular version 6.1.9` and backend server `Dotnet Core Web API 2.1` and for security and authenticating users it uses `IdentityServer4`

## Technologies
1. To get started with anugular check this [Link](https://angular.io/guide/quickstart)
2. To get start with `dotnet core` check this [Link](https://docs.microsoft.com/en-us/dotnet/core/get-started?tabs=windows)
3. Identity Server , Check this [Link](https://identityserver4.readthedocs.io/en/release/)

## Development server

1. The Web API uses `json` files to store data so you need to create these two files
      `c:/datafiles/class.json`
      `c:/datafiles/review.json`

2. Run `npm start` will start the web client and both the `API` and the `Identity Server`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
And make sure you also build the API and Identity server also for production.
using `dotnet publish --configuration Release`

## Running the app
 
 The production build is in `dist/` directory , you can use any web server to run the application also the API and Identity Server publishes are in `bin/Release`, you can use `dotnet run` to run it or use `IIS web server`.


 ## Author
 Abdihakin Abdullahi

