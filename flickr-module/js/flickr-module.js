var flickrModule = angular.module('flickrModule', []);

flickrModule.directive('fphotos', function($http) {
  return {
    restrict: 'E',
    templateUrl: 'flickr-module/template/fp-template.html',

    /*template: [
    	'<h1>Directive Attributes</h1>',
    	'<p>api-key: {{apiKey}}</p>',
    	'<p>user-id: {{userId}}</p>',
    	'<p>per-page: {{perPage}}</p>',
    	'<p>size: {{size}}</p>'
    ].join(""),*/

    scope: {},

    controller: function($scope, $element, $http) {
    	$scope.isLoading = true;
    	$scope.isMultiplePages = false;
    	$scope.photos = [];
    	$scope.flickrData = {};

    	$scope.getRecent = function() {
    		$http({
			    url: [
			    	"http://api.flickr.com/services/rest/?method=flickr.photos.getRecent",
			    	"&api_key=", $scope.apiKey,
			    	"&per_page=", $scope.perPage,
			    	"&format=json",
			    	"&jsoncallback=JSON_CALLBACK"
			    ].join(""),
			    method: "JSONP"
				})
				.success(function(data, status) {
			    $scope.flickrData = data.photos;
			    $scope.isLoading = false;

			    data.photos.photo.forEach(function(photo) {
			    	$scope.photos.push({
			    		url: ["http://www.flickr.com/photos/", photo.owner, "/", photo.id].join(""),
			    		imgUrl: [
			    			"http://farm", photo.farm, ".static.flickr.com/", 
			    			photo.server, "/", photo.id, "_", photo.secret, "_", $scope.size, ".jpg"
			    		].join(""),
			    		desc: photo.title,
			    	});
			    });

			    if(data.photos.pages) {
			    	$scope.isMultiplePages = true;
			    }

				})
				.error(function(data, status) {
			    $scope.isLoading = false;
				});
    	};

    	$scope.search = function() {
    		//search implementation
    	}
    },

    link: function(scope, element, attr) {
      scope.apiKey = attr.apiKey;
      scope.userId = attr.userId;
      scope.perPage = attr.perPage;
      scope.size = attr.size;
      scope.getRecent();
    }
  }
});