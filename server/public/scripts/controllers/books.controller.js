app.controller('BooksController', ['$http', function($http){
    console.log('BooksController Loaded');
    let self = this;

    self.collections = [];
    self.books = [];

    self.submitBook = function(){
        console.log(self.newBook);
        if (self.newBook.name == undefined || self.newBook.name === '') {
            swal('you need to fill out both the name and date input');
        }else{
            $http({
                url:'/books',
                method: 'POST',
                data: {data: self.newBook}
            }).then(function(response){
                console.log(response);
                self.emptyInputs();
                self.getBooks();
                swal({
                    title: "Book Submitted",
                    icon: "success",
                });
            }).catch(function(error){
                console.log(error);
                alert('something went quite wrong');
            })
        }
    }

    self.emptyInputs = function(){
        console.log('in self.emptyInputs');
        self.newBook.name = '';
        self.newBook.date = '';
        self.newBook.img_url = '';
        self.newBook.collection = '';
    }

    self.getCollections = function(){
        console.log('in getCollectionsdbrr');
        $http({
            url: '/collections/books',
            method: 'GET'
        }).then(function(response){
            console.log(response.data);
            self.collections = response.data
        }).catch(function(error){
            console.log(error);
            alert('collections could not be retrieved');
        })
    }

    self.getBooks = function(){
        console.log('in getBooks');
        $http({
            url:'/books',
            method: 'GET'
        }).then(function(response){
            console.log(response);
            self.books = response.data
        }).catch(function(error){
            console.log(error);
            alert('your books could not be retrieved')
        })
    }

    self.deleteBook = function(id){
        console.log('in deleteBooks', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this book",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                $http({
                    url:`/books/${id}`,
                    method: 'DELETE'
                }).then(function(response){
                    console.log(response);
                    self.getBooks();
                    swal({
                        title: "Book Deleted",
                        icon: "success",
                    });
                }).catch(function(error){
                    console.log(error);
                    alert('it did not delete your book')
                })
            } else {
              swal("Movies and Poems may brick your Phones, but this Book will never harm you.");
            }
        });
    }

    self.getCollections();
    self.getBooks();
}])