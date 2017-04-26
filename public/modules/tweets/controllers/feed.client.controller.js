'use strict';

angular.module('tweets').controller('FeedController', [
    '$scope',
    '$modal',
    'Authentication',
    '$http',
    'Upload',
    '$timeout',
    '$location',
    function($scope, $modal, Authentication, $http, Upload, $timeout,$location) {
        $scope.profile = {
            name: Authentication.user.displayName,
            screenName: Authentication.user.username,
            userpicture: Authentication.user.userpicture,
            exp_position: Authentication.user.exp_position,
            edulevel: Authentication.user.edulevel,
            bday: Authentication.user.bday,
            tweetCount: 2,
            followerCount: 34,
            followingCount: 140
        };
        $scope.reply = [];
        $scope.timeline =[];
       
        $scope.uploads =[];
        $scope.lastUploadPath = '';
        $scope.lastUploadName = '';
        console.log("uploads"+$scope.uploads);

        $http.get('/uploads').then(function(response){
            console.log(response.data);
            $scope.uploads = response.data;
        });


        $http.get('/getAllUser')
        .success(function(response) {
            $scope.users = response;
            console.log("all users "+$scope.users[0].username);
        })
        .error(function(response) {
            $scope.error = response.message;
        });


        $http.get('/statuses/news_feed')
        .success(function(response) {
            $scope.tweets = response;
            console.log($scope.tweets);
        })
        .error(function(response) {
            $scope.error = response.message;
        });

        $scope.type;
        $scope.files;
        $scope.uploadFiles = function(files, errFiles) {
            console.log('innf');
            $scope.files = files;
            $scope.type = 'image';
            
        };
        $scope.video;
        $scope.uploadVideo = function(files, errFiles) {
            $scope.video = files;
            console.log('v'+$scope.video[0]);
            $scope.type = 'video';
             console.log('inn');
        };

        $scope.remove = function(file){
            var index = $scope.files.indexOf(file);
            $scope.files.splice(index, 1);
                console.log('remove '+$scope.files);
        };

        $scope.postTweet = function(tweetText, name, screenName, userpicture) {
            $scope.ArrayFiles =[];
            $scope.ArrayVideo = [];
            console.log('test result'+$scope.files);
            if($scope.type == 'image'){
                angular.forEach($scope.files, function(file) {
                    file.upload = Upload.upload({
                        url: '/uploads',
                        data: {file: file}
                    });
                        
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            $scope.ArrayFiles.push(response.data.file.path+'/'+response.data.file.originalname);
                            console.log('ArrayFiles in'+$scope.ArrayFiles);
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * 
                                                 evt.loaded / evt.total));
                    });
                });
            } else if($scope.type == 'video'){
                console.log('inn');
                angular.forEach($scope.video, function(file) {
                    file.upload = Upload.upload({
                        url: '/uploads',
                        data: {file: file}
                    });
                        
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            console.log('file.result '+file.result);
                            $scope.ArrayVideo.push(response.data.file.path+'/'+response.data.file.originalname);
                            console.log('ArrayVideo in'+$scope.ArrayVideo);
                        });
                    }, function (response) {
                        if (response.status > 0){
                            $scope.errorMsg = response.status + ': ' + response.data;
                            console.log('error');
                        }
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * 
                                                 evt.loaded / evt.total));
                    });
                });
            }

            console.log('ArrayFiles'+$scope.ArrayFiles);
            console.log('ArrayVideo'+$scope.ArrayVideo);
            var tweetPicArray = $scope.ArrayFiles;
            var tweetVideo = $scope.ArrayVideo;
           
            $scope.timeline.push({
                name: name,
                screenName: screenName,
                screenPicture: userpicture,
                tweetText: tweetText,
                tweetTime: new Date().toISOString(),
                tweetPic: tweetPicArray,
                tweetVid: tweetVideo
            });

            
            setTimeout(function() {
              //code to be executed after 3 second
              console.log("screenPicture "+userpicture);
              $http.post('/statuses/update', {
                    name: name,
                    screenName: screenName,
                    screenPicture: userpicture,
                    tweetText: tweetText,
                    tweetPic: tweetPicArray,
                    tweetVid: tweetVideo,
                    tweetTime: new Date().toISOString()       
                }).success(function(response) {
                    $scope.tweetText = '';
                    $scope.tweetPic = [];
                    $scope.tweetVid = '';
                    $scope.files = null;
                    $scope.video = null;
                    $scope.profile.tweetCount += 1;
                }).error(function(response) {
                    $scope.error = response.message;
                });
            } , 3000);

        };

        

        $scope.replyTo = function(screenName,text) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/modules/tweets/views/replymodal.client.view.jade',
                controller: 'ReplyModalController',
                resolve: {
                    tweetText: function() {
                        return ;
                    }
                }
            });

            modalInstance.result.then(function(tweetText) {
                $scope.postReply(text,tweetText, $scope.profile.name, $scope.profile.screenName,$scope.profile.userpicture);
            });
            
        };

        $scope.postReply = function(text,tweetText, name, screenName, userpicture) {
            $scope.reply.push({
                text:text,
                name: name,
                screenName: screenName,
                screenPicture: userpicture,
                tweetText: tweetText,
                tweetTime: new Date().toISOString(),
            });
            console.log('$scope.reply'+$scope.reply);
            
              $http.post('/statuses/reply', {
                    id : text,
                    reply: [
                        {
                        text:text,
                        name: name,
                        screenName: screenName,
                        screenPicture: userpicture,
                        tweetText: tweetText,
                        tweetTime: new Date().toISOString()  
                        }  
                    ]    
                }).success(function(response) {
                    $scope.tweetText = '';
                    $scope.tweetPic = [];
                    $scope.tweetVid = '';
                }).error(function(response) {
                    $scope.error = response.message;
                });
        };

        $scope.changekeyword = function(keyword){
            $scope.query = keyword;
            console.log($scope.query); 
        };
        $scope.redirectToProfile = function(){
            console.log('go');
            $location.path('/view/profile');
            // $location.path('/index');
        };
        $scope.redirectToChat = function(username_paticipant,userpicture_paticipant){
            var win = window.open();
            win.location = 'http://localhost:3000/chat.client.view.html?name='+Authentication.user.username+'='+username_paticipant+'='+Authentication.user.userpicture+'='+userpicture_paticipant;
        };
       

    }
   
]);