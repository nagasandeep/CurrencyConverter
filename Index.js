var app = angular.module("myApp", []);

function getCurrencies()
{
    var a = 
    [
        {
            currency: 'INR',
            value: 1,
            description: 'Indian Rupee'
        },
        {
            currency: 'USD',
            value: 0.015,
            description: 'US Dollar'
        },
        {
            currency: 'GBP',
            value: 0.010,
            description: 'British Pound'
        },
        {
            currency: 'AED',
            value: 0.054,
            description: 'United Arab Emirates Dirham'
        },
        {
            currency: 'AUD',
            value: 0.021,
            description: 'Australian Dollar'
        },
        {
            currency: 'EUR',
            value: 0.014,
            description: 'Euro'
        }
    ];
    return a;
}

app.controller('CurrencyConverter', function($scope, $filter)
{
    $scope.currencies = getCurrencies();
    $direction = 0;

    $scope.convert = function(from, to, amount)
    {
        var fromFound = $filter('filter')($scope.currencies, {currency: from}, true);
        var toFound = $filter('filter')($scope.currencies, {currency: to}, true);
        var IndianAmount = 0;
        if(fromFound.length)
            IndianAmount = amount/fromFound[0].value;
        var toAmount = toFound[0].value*IndianAmount
        return toAmount;
    }

    $scope.updateTarget = function()
    {
        $scope.to.amount = 
            $scope.convert(
                $scope.from.selectedcurrency.currency,
                $scope.to.selectedcurrency.currency,
                $scope.from.amount)
            if($scope.to.amount == 0)
                $scope.to.amount = '';
    }

    $scope.updateSource = function()
    {
        $scope.from.amount = 
            $scope.convert(
                $scope.to.selectedcurrency.currency,
                $scope.from.selectedcurrency.currency,
                $scope.to.amount)
            if($scope.from.amount == 0)
                $scope.from.amount = '';
    }

    $scope.from = 
    {
        selectedcurrency : $scope.currencies[0]
    };

    $scope.to = 
    {
        selectedcurrency : $scope.currencies[1]
    };

    $scope.$watch(
        'from.amount',
        function(newValue, oldValue)
        {
            if($scope.direction == 0)
                $scope.updateTarget();
        }
    );



    $scope.$watch(
        function()
        {
            return $scope.from.selectedcurrency.currency;
        },
        function(newValue, oldValue)
        {
            if($scope.direction == 0)
                $scope.updateTarget();
        }
    );

    $scope.$watch(
        function()
        {
            return $scope.to.selectedcurrency.currency;
        },
        function(newValue, oldValue)
        {
            if($scope.direction == 0)
                $scope.updateTarget();
        }
    );

    $scope.$watch(
        function()
        {
            return $scope.to.amount;
        },
        function(newValue, oldValue)
        {
            if($scope.direction == 1)
                $scope.updateSource();
        }
    );
});

app.directive('currencycontrol', function()
{
    return {

        scope:{
            currencyobject:'=',
            currencies:'=',
            direction:'=',
            source:'='
        },

        restrict: "E",

        templateUrl: "directives/currencycontrol.html",

        controller: function($scope)
        {
            $scope.changeDirection = function(source)
            {
                if(source == 0)
                {
                    $scope.direction = 1;
                }
                else
                {
                    $scope.direction = 0;
                }
            }
        }
    };
});
