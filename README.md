# assestmanagement-ui-dev

This project is based on [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0

## Development server

Run 'ng serve' for a dev server. Navigate to 'http://localhost:4200/'. The app will automatically reload if you change any of the source files.

Any proxy settings to be defined in proxy.conf.json, then Run the application using
'ng serve --proxy-config proxy.conf.json'

To change  the default port run ng serve with as follows:
'ng serve --proxy-config proxy.conf.json --port <port_number>'

or run command "npm start", this would use the proxy file proxy.conf.json and run application on port 4600

## Code scaffolding

Run 'ng generate component component-name' to generate a new component. You can also use 'ng generate directive|pipe|service|class|guard|interface|enum|module'.

Place the guard, pipe, services, interceptor, model in the respective folder as created in the project.

## Token Interceptor
Token Interceptor (in folder _interceptor/tokeninterceptor.interceptor.ts) is created in the project, any header param which would be part of the http request , can be added here.
For example: Token for authorization which would be part of all request call to the API can be placed here.

## Build

Run 'ng build' to build the project. The build artifacts will be stored in the 'dist/' directory. Use the '-prod' flag for a production build.
