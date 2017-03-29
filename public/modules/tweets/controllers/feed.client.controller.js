'use strict';

angular.module('tweets').controller('FeedController', [
    '$scope',
    '$modal',
    'Authentication',
    '$http',
    'Upload',
    function($scope, $modal, Authentication, $http, Upload) {
        $scope.profile = {
            name: Authentication.user.displayName,
            screenName: Authentication.user.username,
            tweetCount: 2,
            followerCount: 34,
            followingCount: 140
        };

        $scope.timeline = [
            {
                name: 'Arnupharp Viratanapanu',
                screenName: 'topscores',
                tweetText: 'My name is Top',
                tweetTime: '2015-01-29T15:37:26+07:00',
                tweetPic: 'public/modules/core/img/brand/logo.png'
            },
            {
                name: 'Supasate Choochaisri',
                screenName: 'kaizerwing',
                tweetText: 'Hello World',
                tweetTime: '2015-02-29T15:37:26+07:00'
            },
            {
                name: 'Somchai Jaidee',
                screenName: 'somchaic',
                tweetText: '555555555555555',
                tweetTime: '2015-06-29T15:37:26+07:00'
            },
            {
                name: 'Supasate Choochaisri',
                screenName: 'kaizerwing',
                tweetText: 'Sawasdee Thailand',
                tweetTime: '2015-02-29T15:37:26+07:00'
            }
        ];

        $scope.postTweet = function(tweetText, name, screenName) {
            $scope.timeline.push({
                name: name,
                screenName: screenName,
                tweetText: tweetText,
                tweetTime: new Date().toISOString(),
                tweetPic: tweetPic
            });

            $http.post('/statuses/update', {
                name: name,
                screenName: screenName,
                tweetText: tweetText,
                tweetPic: tweetPic,
                tweetTime: new Date().toISOString()       
            }).success(function(response) {
                $scope.tweetText = '';
                $scope.tweetPic = '';
                $scope.profile.tweetCount += 1;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.replyTo = function(screenName) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/modules/tweets/views/replymodal.client.view.jade',
                controller: 'ReplyModalController',
                resolve: {
                    tweetText: function() {
                        return '@' + screenName + ' ';
                    }
                }
            });

            modalInstance.result.then(function(tweetText) {
                $scope.postTweet(tweetText, $scope.profile.name, $scope.profile.screenName);
            });
        };

        $scope.stepsModel = [];

        $scope.imageUpload = function(event){
             var files = event.target.files; //FileList object
             
             for (var i = 0; i < files.length; i++) {
                 var file = files[i];
                     var reader = new FileReader();
                     reader.onload = $scope.imageIsLoaded; 
                     reader.readAsDataURL(file);
                     console.log(file);
             }
             console.log(files);
        };


        $scope.imageIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.stepsModel.push(e.target.result);
                
            });
            console.log($scope.stepsModel);
        };
        
        $scope.url = "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
        $scope.pauseOrPlay = function(ele){
               var video = angular.element(ele.srcElement);
                video[0].pause(); // video.play()
       };

       $http.get('/uploads').then(function(response){
        console.log(response.data);
        $scope.uploads = response.data;
      });

      $scope.submit = function(){
        Upload.upload({
          url: '/uploads',
          method: 'post',
          data: $scope.upload
        }).then(function (response) {
          console.log(response.data);
          $scope.uploads.push(response.data);
          $scope.upload = {};
        })
      };

    }
    

    
]);