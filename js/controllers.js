angular.module('starter.controllers', ['ionic','ngCordovaOauth'])

.controller('DashCtrl', function($scope,$http,$cordovaOauth) {

    $scope.loginform = {
            uid:  "",pass: ""
        }
    $scope.LoginwithFacebook = function(){
 console.log("clicked");
 $cordovaOauth.facebook("1838893746325270", ["first_name"]).then(function(result) {
 alert("Auth Success..!!"+result);
 }, function(error) {
 alert("Auth Failed..!!"+error);
 });
 };
    
    
      $scope.login=function()
    {
        debugger;
        
        //alert($scope.loginform.uid);
        if($scope.loginform.pass === undefined || $scope.loginform.uid === undefined || $scope.loginform.pass === "" || $scope.loginform.uid === "" )
        {
            $scope.msg = "Please fill User ID and Password";
        }
        else
        {
             debugger;
        $http.post("http://localhost:82/ionicAppAPI/index.php", {
		      'userid':$scope.loginform.uid,
            'password':$scope.loginform.pass,
            
              'action':"login"    
            })
                       
    
            .success(function(data,status,headers,config){
                debugger;
                $scope.result = angular.fromJson(data);
                var obj = angular.fromJson(data);
                for(var i=0;i< obj.stuff.length ;i++)
                {
                //console.log(obj.stuff[i].id + "Data Inserted Successfully" + data.stuff[i].pass );
                if(data.stuff[i].status==="Success")
                {
                   
                    $scope.msg = "Welcome "+data.stuff[i].userid;
                   
                }
                else{
                    $scope.msg = "Please fill correct";
                   alert("Please check user id and use correct user id.");
                }      
            }
            });
        }
    }
    
    
    
    $scope.$on("$ionicView.loaded", function() {

    //Put your script in here!
        function log()
        {
            alert("Hi");
        }

});

})

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
    
     $scope.loginform = {
            uid1:  "",
         pass1: "",
         user_nicename:"",
         user_email:"",
         user_url:"",
         display_name:""
        }
    $scope.save=function()
    {
        debugger;
        
        //alert($scope.loginform.uid);
        if($scope.loginform.pass === undefined || $scope.loginform.uid === undefined || $scope.loginform.user_nicename === undefined || $scope.loginform.user_email === undefined ||  $scope.loginform.display_name === undefined || $scope.loginform.pass === "" || $scope.loginform.uid === "" || $scope.loginform.user_nicename === "" || $scope.loginform.user_email === "" ||  $scope.loginform.display_name === "" )
        {
            $scope.msg = "Please fill all mendatory *";
        }
        else
        {
             debugger;
        $http.post("http://localhost:82/ionicAppAPI/index.php", {
		    'userid':$scope.loginform.uid,
            'password':$scope.loginform.pass,
            'user_nicename':$scope.loginform.user_nicename,
            'user_email':$scope.loginform.user_email,
            'display_name':$scope.loginform.display_name,
            'user_url':$scope.loginform.user_url,
            'action':"insert"    
            })
                       
    
            .success(function(data,status,headers,config){
                debugger;
                $scope.result = angular.fromJson(data);
                var obj = angular.fromJson(data);
                for(var i=0;i< obj.stuff.length ;i++)
                {
                //console.log(obj.stuff[i].id + "Data Inserted Successfully" + data.stuff[i].pass );
                if(data.stuff[i].status==="Success")
                {
                   
                    $scope.msg = "Registred";
                   
                }
                else{
                    $scope.msg = "Registration Fail";
                   alert("Please try again Registration Fail.");
                }      
            }
            });
        }
    }

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$http) {
    
    $scope.getall = function()
    {
        $http.post("http://localhost:82/ionicAppAPI/index.php", {
		    
            'action':"getall"    
            })
                       
    
            .success(function(data,status,headers,config){
                debugger;
                $scope.result = angular.fromJson(data);
                var obj = angular.fromJson(data);
                $scope.users = obj.stuff;
            });
    }
    
    
  $scope.settings = {
    enableFriends: true
  };
});
