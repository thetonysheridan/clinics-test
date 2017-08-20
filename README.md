# clinics-test
Clinics test for Civil Service.

## Issues
At the time of completing this test is appears that the health api has been retired. It was my original
intention to provide a working implementation that would access the real service from the web server
and integration tests whilst the unit tests would use a hardwired stub. As I cannot obtain data from the service I opted to keep the design pattern but have used the same class (copied).

## Prerequisites
Once you have cloned or downloaded the repository the following steps need to be completed.
If you do not have gulp installed then the gulp-cli npm package will need to be installed globally.
```sh
npm i -g gulp-cli
```
The required npm packages will then need to be downloaded. From the project root type :
```sh
npm i
```

## Building the project
From the project root type:
```sh
npm run build
```

## Running the unit tests
From the project root type:
```sh
npm run test
```

## Running the integration tests
From the project root type:
```sh
npm run integration
```

## To run the (simple) web server
From the project root type
```sh
npm run start
```

## Project structure
The project contains two main directories along with supporting files. The structure is
really intended to allow each sub component to be packaged and sent to the npm repository (hopefully
making it plug ad play).   
/src  : contains all the source code.  
/test : contains all the test source code.  
All source code is built into a build directory and tests / web server are run from there.

## Improvements
There needs to be a great deal (more) error handling and use of try catch and promise catch. This has
been omitted for simplicity reasons.  
It would be simple to include documentation (e.g. ts-doc) but I did not provide this for time
and simplicity reasons.  
The health api should have interfaces defined for the returned data. As this was not the focus of the test
I chose not to implement this but did for the clinics api. These interfaces are only used for type
checking in Typescript.  
I have versioned the api url for ease of updating / deprecation but have not provided a mechanism
for doing this. This should be easy to add.  
The code would benefit from more concrete dependency injection or plug-in management (e.g. routing,
versioning, etc.). This should not be too hard to implement but again was omitted due to time constraints.  
Additional tests should be added particularly a variation of data returned. As I did not have access to the real api
this was omitted due to time constraints.
The entire build system should be better implemented with watch functionality and only building code when
it changes. Additionally the spurious js files created by typescript for interfaces (empty in js) should be
removed as part of the build (I would normally do this as part of creating the npm packages).    
Error messages should be provided as constants and have more information (such as a code). This would allow
for i18n.
