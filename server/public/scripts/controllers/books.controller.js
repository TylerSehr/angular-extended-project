app.controller('BooksController', ['$http', function($http){
    console.log('BooksController Loaded');
    let self = this;

    self.submitBook = function(){
        console.log(self.newBook);
        $http({
            url:'/books',
            method: 'POST',
            data: {data: self.newBook}
        }).then(function(response){
            console.log(response);
            self.emptyInputs();
            swal({
                title: "Book Submitted",
                icon: "success",
            });
        }).catch(function(error){
            console.log(error);
            alert('something went quite wrong');
        });
    }

    self.emptyInputs = function(){
        console.log('in self.emptyInputs');
        self.newBook.name = '';
        self.newBook.date = '';
        self.newBook.img_url = '';
        self.newBook.genre = '';
    }

}])