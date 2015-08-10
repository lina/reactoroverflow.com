'use strict';

/**
 * Create Controller
 */

angular.module('RDash')
.controller('CreateCtrl', function($scope, $location, Posts, $http) {
  // $scope.title = '';
  // $scope.content = '';
  $scope.tags = [
  { text: 'Tag1' },
  { text: 'Tag2' },
  { text: 'Tag3' }
  ];
  // $scope.createPost = function() {
  //   $scope.post = {
  //     title: $scope.title, 
  //     content: $scope.content, 
  //     tags: $scope.tags
  //     }; //keys: title, content and tags
  //   Posts.addPost($scope.post)
  //   .then(function(resp) {
  //     $location.path('/post/'+resp._id); //takes user to the post they created.
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  // };
});
