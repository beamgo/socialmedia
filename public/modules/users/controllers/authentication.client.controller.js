'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication','Upload',
    '$timeout',
	function($scope, $http, $location, Authentication, Upload, $timeout) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.userpicture = '';
		$scope.uploadFiles = function(file, errFiles) {
	        $scope.f = file;
	        $scope.errFile = errFiles && errFiles[0];
	        if (file) {
	            file.upload = Upload.upload({
	                url: '/uploads',
	                data: {file: file}
	            });

	            file.upload.then(function (response) {
	                $timeout(function () {
	                    file.result = response.data;
	                    console.log(response.data);
	                    $scope.userpicture = response.data.file.path+'/'+response.data.file.originalname;
	                    console.log($scope.userpicture); 
	                });
	            }, function (response) {
	                if (response.status > 0)
	                    $scope.errorMsg = response.status + ': ' + response.data;
	            }, function (evt) {
	                file.progress = Math.min(100, parseInt(100.0 * 
	                                         evt.loaded / evt.total));
	            });
	        }
	          
	    };

		$scope.signup = function() {
			console.log("credentials "+$scope.credentials);
			console.log("credentials username "+$scope.credentials.username);
			$scope.credentials.userpicture = $scope.userpicture;
			$scope.credentials.positionofwork = $scope.credentials.positionofwork.singleSelect;
			$scope.credentials.provinceprefer = $scope.credentials.provinceprefer.singleSelect;
			$scope.credentials.edulevel = $scope.credentials.edulevel.singleSelect;
			console.log("credentials "+$scope.credentials.userpicture);
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user day
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user day
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.uncheck = function (event) {
        	if ($scope.checked == event.target.value) $scope.checked = false
    	};
	    $scope.checkErrBD = function(BirthDate) {
	        $scope.errMessageBD = '';
	        var curDate = new Date('2002-01-01');
	        
	        if(new Date(BirthDate) > curDate){
	           $scope.errMessageBD = 'วันเกิดผิดพลาด กรุณากรอกใหม่';
	           return false;
	        }
	    };
	    $scope.checkErrDate = function(startDate,endDate) {
	        $scope.errMessage = '';
	        var curDate = new Date();
	        
	        if(new Date(startDate) > new Date(endDate)){
	          $scope.errMessage = 'วันสิ้นสุดไม่ควรเกินวันเริ่มต้น';
	          return false;
	        }
	        if(new Date(startDate) > curDate){
	           $scope.errMessage = 'วันเริ่มต้นไม่ควรเกินปัจจุบัน';
	           return false;
	        }
	    };
	    
	}
]);