var flickrModule = angular.module('flickrModule', []);

flickrModule.directive('fphotos', function() {
  return {
    restrict: 'E',
    
    template: [
    	'<h1>Directive Attributes</h1>',
    	'<p>api-key: {{apiKey}}</p>',
    	'<p>user-id: {{userId}}</p>',
    	'<p>per-page: {{perPage}}</p>',
    	'<p>size: {{size}}</p>'
    ].join(""),

    scope: {},

    link: function(scope, element, attr) {
      scope.apiKey = attr.apiKey;
      scope.userId = attr.userId;
      scope.perPage = attr.perPage;
      scope.size = attr.size;
    }
  }
});