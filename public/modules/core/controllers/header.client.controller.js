'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$rootScope',
	function($scope, Authentication, Menus, $rootScope) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(toState) {
			$scope.isCollapsed = false;
			
		});
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (  toState.name !== 'firstsignup') {
               $scope.isfirstsignup = true;
               
            }
            else {
				$scope.isfirstsignup = false;
				
			}
           
        });

		$scope.clickBlackWhite = function() {
			var elements = document.getElementsByTagName("body");
			if(elements[0].className == 'w3-theme-l5'
			||elements[0].className == 'w3-theme-l5 fontsmall'
			||elements[0].className == 'w3-theme-l5 fontlarge'){
			    elements[0].className += " blackwhite";
			} else if(elements[0].className.match(/(?:^|\s)blackyellow(?!\S)/)){
				elements[0].className = elements[0].className.replace( /(?:^|\s)blackyellow(?!\S)/g , '' );
				elements[0].className += " blackwhite" ;
			}
		};
		$scope.clickBlackYellow = function() {
			var elements = document.getElementsByTagName("body");
			if(elements[0].className == 'w3-theme-l5'
			||elements[0].className == 'w3-theme-l5 fontsmall'
			||elements[0].className == 'w3-theme-l5 fontlarge'){
			    elements[0].className += " blackyellow";
			} else if(elements[0].className.match(/(?:^|\s)blackwhite(?!\S)/)){
				elements[0].className = elements[0].className.replace( /(?:^|\s)blackwhite(?!\S)/g , '' );
				elements[0].className += " blackyellow" ;
			}
		};
		$scope.clickNormal = function() {
			var elements = document.getElementsByTagName("body");
			if (elements[0].className.match(/(?:^|\s)blackwhite(?!\S)/) ){
				elements[0].className = elements[0].className.replace( /(?:^|\s)blackwhite(?!\S)/g , '' );
			} else if (elements[0].className.match(/(?:^|\s)blackyellow(?!\S)/)){
				elements[0].className = elements[0].className = elements[0].className.replace( /(?:^|\s)blackyellow(?!\S)/g , '' );
			}
		    
		};
		$scope.fontSmall = function() {
			var elements = document.getElementsByTagName("body");
			if(elements[0].className == 'w3-theme-l5'
			||elements[0].className == 'w3-theme-l5 blackyellow'
			||elements[0].className == 'w3-theme-l5 blackwhite'){
				elements[0].className += " fontsmall" ;
			} else if(elements[0].className.match(/(?:^|\s)fontlarge(?!\S)/)){
				elements[0].className = elements[0].className.replace( /(?:^|\s)fontlarge(?!\S)/g , '' );
				elements[0].className += " fontsmall" ;
			}
		    
		};
		$scope.fontNormal = function() {
			var elements = document.getElementsByTagName("body");
		    if (elements[0].className.match(/(?:^|\s)fontsmall(?!\S)/)){
		    	console.log("fontNormal");
				elements[0].className = elements[0].className.replace( /(?:^|\s)fontsmall(?!\S)/g , '' );
			
			} else if (elements[0].className.match(/(?:^|\s)fontlarge(?!\S)/)){
				console.log("fontNormal");
				elements[0].className = elements[0].className = elements[0].className.replace( /(?:^|\s)fontlarge(?!\S)/g , '' );
			}

		};
		$scope.fontLarge = function() {
			var elements = document.getElementsByTagName("body");
			if(elements[0].className == 'w3-theme-l5'
			||elements[0].className == 'w3-theme-l5 blackwhite'
		   	|| elements[0].className == 'w3-theme-l5 blackyellow'){
				elements[0].className += " fontlarge" ;
			console.log('fontlarge');
			} else if(elements[0].className.match(/(?:^|\s)fontsmall(?!\S)/)){
				elements[0].className = elements[0].className.replace( /(?:^|\s)fontsmall(?!\S)/g , '' );
				elements[0].className += " fontlarge" ;
			}
		    
		};
	}
]);