angular.module("presentationApp", [
        'ui.router', 
        'ui.bootstrap'
    ])

    .config(function ($compileProvider, $stateProvider, $urlRouterProvider) { 

          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|mfly):/);        
          $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:|http:\/\/|https:\/\/)/);

          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/presenter");
          
          $stateProvider
                .state('presenter', {
                    url: '/presenter',
                    templateUrl: 'components/presenter/presenter.html', 
                    controller: 'PresenterCtrl' 
                });

    });
        