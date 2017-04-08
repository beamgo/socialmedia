'use strict';

angular.module('tweets').controller('FeedController', [
    '$scope',
    '$modal',
    'Authentication',
    '$http',
    'Upload',
    '$timeout',
    function($scope, $modal, Authentication, $http, Upload, $timeout) {
        $scope.profile = {
            name: Authentication.user.displayName,
            screenName: Authentication.user.username,
            userpicture: Authentication.user.userpicture,
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
                tweetPic: '',
                userpicture:'img/p-half_0001.png'
            },
            {
                name: 'Supasate Choochaisri',
                screenName: 'kaizerwing',
                tweetText: 'Hello World',
                tweetTime: '2015-02-29T15:37:26+07:00',
                userpicture:'img/p-half_0002.png'
            },
            {
                name: 'Somchai Jaidee',
                screenName: 'somchaic',
                tweetText: '555555555555555',
                tweetTime: '2015-06-29T15:37:26+07:00',
                tweetVid: ['uploads/83c9c3d03f0c92eddec9cd88f56f6bf9/IMG_4006.mp4'],
                userpicture:'img/p-half_0003.png'
            },
            {
                name: 'Supasate Choochaisri',
                screenName: 'kaizerwing',
                tweetText: 'Sawasdee Thailand',
                tweetTime: '2015-02-29T15:37:26+07:00',
                userpicture:'img/p-half_0004.png'
            }
        ];
        $scope.uploads =[];
        $scope.lastUploadPath = '';
        $scope.lastUploadName = '';
        console.log("uploads"+$scope.uploads);

        $http.get('/uploads').then(function(response){
            console.log(response.data);
            $scope.uploads = response.data;
          });

        // $scope.$watch('upload.file',function(newVal,oldVal){
        //     Upload.upload({
        //       url: '/uploads',
        //       method: 'post',
        //       data: $scope.upload
        //     }).then(function (response) {
        //       console.log("file"+response.data.file.path);
        //       $scope.uploads.push(response.data);
        //       $scope.upload = {};
        //       $scope.lastUploadPath = response.data.file.path;
        //       $scope.lastUploadName = response.data.file.originalname;
              
        //     })
        // });
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
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
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
                userpicture: userpicture,
                tweetText: tweetText,
                tweetTime: new Date().toISOString(),
                tweetPic: tweetPicArray,
                tweetVid: tweetVideo
            });

            $http.post('/statuses/update', {
                name: name,
                screenName: screenName,
                userpicture: userpicture,
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

    }
   
]);