var KEY_ENTER = 13;
var KEY_UP = 38;
var KEY_DOWN = 40;

angular.module('ps1', ['ui'])
  .filter('concat', function() {
    return function(list, member) {
      var s = '';
      angular.forEach(list, function(part) {
        s += part[member];
      });
      return s;
    };
  })
  .directive('showOnHover', function() {
    return {
      link: function(scope, element, attrs) {
        element.hide();
        hoverElement = (attrs.showOnHover === "parent")
          ? element.parent()
          : element;
        hoverElement.mouseenter(function() {
          element.show();
        });
        hoverElement.mouseleave(function() {
          element.hide();
        });
      },
    };
  })
  .directive('captureKeypress', function() {
    return {
      link: function(scope, element, attrs) {
        $('body').keypress(function(ev) {
          if(ev.which !== KEY_ENTER)
            element.focus();
        });
      },
    };
  })
  .directive('navigatable', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        $('body').keydown(function(ev) {
          console.log(ev.which);
        });
      },
    };
  })
  ;

var OptionsCtrl = function($scope) {
  $scope.options = [
    {
      code: ' ',
      description: 'space',
      example: ' ',
    },
    {
      code: '@',
      description: '@',
      example: '@',
    },
    {
      code: '\\n',
      description: 'newline',
      example: "⏎",
    },
    {
      code: '\\u',
      description: 'user',
      example: 'buck',
    },
    {
      code: '\\h',
      description: 'short hostname',
      example: 'example',
    },
    {
      code: '\\H',
      description: 'full hostname',
      example: 'example.com',
    },
    {
      code: '\\d',
      description: 'date',
      example: 'Wed Mar 27',
    },
    {
      code: '\\j',
      description: 'number of shell jobs',
      example: '3',
    },
    {
      code: '\\l',
      description: '',
      example: '2',
    },
  ];

  $scope.ps1 = [
    $scope.options[1],
    $scope.options[2],
  ];

  $scope.add = function(option) {
    $scope.ps1.push(option);
  };

  $scope.remove = function(index) {
    $scope.ps1.splice(index, 1);
  };

}
