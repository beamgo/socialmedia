'use strict';

angular.module('users').controller('IndexController', ['$scope', '$http', '$location', 'Authentication','Upload',
    '$timeout', '$location','$window',
	function($scope, $http, $location, Authentication, Upload, $timeout, $window) {
		
	    $scope.changeService = function(obj,file){
	    	$scope.hoverActive=true;
			document.getElementById("service_img").style.backgroundImage = 'url("images/'+file+'")';
          }
          $scope.changeService1 = function(obj,file){
	    	$scope.hoverActive1=true;
			document.getElementById("service_img").style.backgroundImage = 'url("images/'+file+'")';
          }
          $scope.changeService2 = function(obj,file){
	    	$scope.hoverActive2=true;
			document.getElementById("service_img").style.backgroundImage = 'url("images/'+file+'")';
          }
	    $scope.redirectToSearch = function() {
	    	var win = window.open();
	    	win.location = 'http://localhost/enabled/p-main.php';
	    };
	    $scope.redirectToEditProfile = function() {
	    	$location.path('/view/profile');
	    };
	    $scope.redirectToSocial = function() {
	    	$location.path('/');
	    };
	}
]);