angular.module('myDirectives', [])

.directive('navHeader', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/header/header.html', 
		link: function(scope, element, attrs) {
			scope.toggle = function () {
		        scope.openMenu = true;
		    };

			scope.goToSearch = function() {
				$location.url('/search');
			};
		}

	}
})

.directive('presentationFooter', function($location){
	return {

		restrict: 'E', 
		scope: {
			slide: '=', 
			current: '='
		},
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/presentation/presentation-footer.html', 
		link: function(scope, element, attrs) {
			scope.toggle = function () {
		        scope.openMenu = true;
		        console.log('clicked');
		    };
		}

	}
})