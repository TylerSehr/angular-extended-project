console.log('in client.js');

let app = angular.module('BookApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '../views/home.html',
        controller: 'HomeController as vm'
    }).when('/books', {
        templateUrl: '../views/books.html',
        controller: 'BooksController as vm'
    }).when('/genres', {
        templateUrl: '../views/genres.html',
        controller: 'GenresController as vm'
    }).otherwise({
        template: '<h1>404</h1>'
    })
});
