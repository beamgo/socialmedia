'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication','$timeout','$filter',
	function($scope, $http, $location, Users, Authentication, $timeout,$filter) {
		$scope.user = Authentication.user;
		console.log('$scope.user'+$scope.user);

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};
		 $scope.bday = $filter('date')($scope.user.bday, "dd/MM/yyyy");
		 $scope.exp_start = $filter('date')($scope.user.exp_start, "dd/MM/yyyy");
		 $scope.exp_end = $filter('date')($scope.user.exp_end, "dd/MM/yyyy");
		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
					$timeout(function(){ 
					  
					  console.log('updateUserProfile');
					  $location.path("/view/profile"); 
					},2000);
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.redirectToEdit = function() {
			$location.path('/settings/profile');
		};
		$scope.redirectToProfile = function(){
            $location.path('/view/profile');
        };
        $scope.redirectToFeed = function(){
            $location.path('/');
        };
	}
]);