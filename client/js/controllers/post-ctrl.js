'use strict';

/**
 * Post Controller
 */

angular.module('RDash')

.controller('PostCtrl', function PostCtrl($scope, $stateParams, $location, Posts, Comments) {
    $scope.data = {};

  $scope.fetch = function(){
    Posts.getPost($stateParams.postID, function (resp) {
      $scope.data.post = resp._source;
      $scope.data.post.created_at = new Date($scope.data.post.created_at).toString();
    });
    Comments.getComments($stateParams.postID, function (resp) {
      $scope.data.comments = resp;
      $scope.data.comments.forEach(function (comment) {
        comment._source.created_at = new Date(comment._source.created_at).toString();
      });
    });
  };

  $scope.fetch();

  $scope.createComment = function() {
    $scope.comment = {
      content: marked($scope.simplemde.value()),
      postID: $stateParams.postID
    }; //keys: content
    Comments.addComment($scope.comment)
    .then(function(resp) {
      resp._source.created_at = new Date(resp._source.created_at).toString();
      resp.votes = resp.votes || 0;
      $scope.data.comments.push(resp);
      $scope.simplemde.value('');
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.upVote = function(commentID) {
    //use commentID to send the user into the comment.upVotes array
    Comments.upVote(commentID).then(function() {
      $scope.fetch();
    });
    
  };

  $scope.downVote = function(commentID) {
    Comments.downVote(commentID).then(function() {
      // debugger
      $scope.fetch();
    });
    
  };

  $scope.$on('$viewContentLoaded', function(){
    $scope.simplemde = new SimpleMDE({
      tabSize: 2
    });
    $scope.simplemde.render();
  });

});
