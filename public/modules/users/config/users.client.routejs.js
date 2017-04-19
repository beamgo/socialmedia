angular.module('users')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('signup', {
            // css files can also be omitted completely (if a route does not need them)
            templateUrl: 'modules/users/views/authentication/signup.client.view.jade',
            js: 'js/signup.js'
            });
            
            // more routes can be declared here
    }]);