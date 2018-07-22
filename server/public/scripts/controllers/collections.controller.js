app.controller('CollectionsController', ['$http', function($http){
    console.log('CollectionsController Loaded');
    let self = this;

    self.collections = [];
    self.showCollection = false;
    self.collectionToShow = [];

    self.getCollections = function(){
        console.log('in getCollections');
        $http({
            url: '/collections',
            method: 'GET'
        }).then(function(response){
            console.log(response.data);
            self.collections = response.data
        }).catch(function(error){
            console.log(error);
            alert('collections could not be retrieved');
        })
    }

    self.submitCollection = function(newCollection){
        console.log('in submitCollection', newCollection);
        let data = { collection : newCollection}
        $http({
            url: '/collections',
            method: 'POST',
            data: data
        }).then(function(response){
            console.log(response.data);
            self.getCollections();
            swal({
                title: "Collection Submitted",
                icon: "success",
            });
            self.newCollection = '';
        }).catch(function(error){
            console.log(error);
            alert('collection could not be submitted')
        })
    }

    self.deleteCollection = function(collection){
        console.log('in deleteCollection', collection);
        swal({
            title: "Are you sure?",
            text: "This will remove this Collection and ALL Books in that Collection",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                $http({
                    url: `/collections/${collection}`,
                    method: 'DELETE'
                }).then(function(response){
                    console.log(response.data);
                    self.getCollections();
                    swal({
                        title: "Collection Deleted",
                        icon: "success",
                    });
                }).catch(function(error){
                    console.log(error);
                    alert('collection could not be deleted')
                })
            } else {
              swal("coward");
            }
        });
    }

    self.getCollectionBooks = function(collection){
        console.log(collection);
        if (collection.count === 0) {
            swal('this collection has no books to edit')
        }else{
            let collectionName = collection.name;
            $http({
                url: `/collections/${collectionName}`,
                method: 'GET'
            }).then(function(response){
                console.log('getCollectionBooks',response.data);
                self.showCollection = !self.showCollection;
                self.collectionToShow = response.data
            }).catch(function(error){
                console.log('getCollectionBooks',error);
            })
        }
    }

    self.removeFromCollection = function(book){
        console.log('in removeFromCollection');
        swal({
            title: "Are you sure? it can be undone as long as this page is loaded.",
            buttons: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let id = book.id;
                $http({
                    url:`/collections/${id}`,
                    method: 'PUT'
                }).then(function(response){
                    console.log(response);
                    self.removed = true;
                }).catch(function(error){
                    console.log(error);
                    alert('it did not delete your book')
                });
            }
        })
    }

    self.undoRemoveFromCollection = function(book){
        let id = book.id;
        console.log(book.collection);
        $http({
            url:`/collections/undo/${id}`,
            method: 'PUT',
            data: {collection: book}
        }).then(function(response){
            console.log(response);
            self.removed = false;
        }).catch(function(error){
            console.log(error);
            alert('it did not delete your book')
        })
    }

    self.getCollections();
}])