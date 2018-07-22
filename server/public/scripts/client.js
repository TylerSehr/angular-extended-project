console.log('in client.js');

let app = angular.module('BookApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/books', {
        templateUrl: '../views/books.html',
        controller: 'BooksController as vm'
    }).when('/collections', {
        templateUrl: '../views/collections.html',
        controller: 'CollectionsController as vm'
    }).otherwise({
        template: '<h1>404</h1>'
    })
});
