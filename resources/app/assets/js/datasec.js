/* Main Controller */
var app = angular.module('datasec', ['ngMessages']);

var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

function convertDateStringsToDates(input){
    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    } 
};

app.config(["$httpProvider", function ($httpProvider) {
     $httpProvider.defaults.transformResponse.push(function(responseData){
        if (typeof responseData !== "object") return responseData;
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);

app.value('appdata', { msg: '', content: 'default', submenu: 'default', object: undefined, user:null, show_static_data:false, show_data:false, show_status:false});

app.factory("DataService", function($http){
    var standorte = {};
    var daten = {};
    var statusliste = {};
    var zutrittsmittelliste = {};
    var mitarbeiterliste = {};
    var aufgabenliste = {};
    var mitarbeiterstatusliste = {};
    var rollenliste = {};
    var beschaeftigungliste = {};
    var musterrollen = {};
    var tresorliste = {};
    var raumliste = {};
    var fahrzeugliste = {};
    var dokumentliste = {};
    var hardwareliste = {};
    var ressourcentypliste = {};
    var rechteliste = {};
    var ressourcenliste = {};
    var is_init = true;
    var fading_time;
    var message_time;
       
    return {
        is_init : function() { return is_init; },
        set_is_init: function(val) { is_init = val; },
        standorte: function() { return standorte; },
        set_standorte: function(val) { standorte = val; },
        daten : function() { return daten; },
        set_daten: function(val) {daten = val; },
        statusliste: function() { return statusliste; },
        set_statusliste: function(val) { statusliste = val; },
        zutrittsmittelliste: function() { return zutrittsmittelliste; },
        set_zutrittsmittelliste: function(val) { zutrittsmittelliste = val; },
        mitarbeiterliste: function() { return mitarbeiterliste; },
        set_mitarbeiterliste: function(val) { mitarbeiterliste = val; },
        aufgabenliste: function() { return aufgabenliste; },
        set_aufgabenliste: function(val) { aufgabenliste = val; },
        mitarbeiterstatusliste: function() { return mitarbeiterstatusliste; },
        set_mitarbeiterstatusliste: function(val) { mitarbeiterstatusliste = val; },
        rollenliste: function() { return rollenliste; },
        set_rollenliste: function(val) { rollenliste = val; },
        beschaeftigungliste: function() { return beschaeftigungliste; },
        set_beschaeftigungliste: function(val) { beschaeftigungliste = val; },
        musterrollen: function() { return musterrollen; },
        set_musterrollen: function(val) { musterrollen = val; },
        tresorliste: function() { return tresorliste; },
        set_tresorliste: function(val) { tresorliste = val; },
        raumliste: function() { return raumliste; },
        set_raumliste: function(val) { raumliste = val; },
        fahrzeugliste: function() { return fahrzeugliste; },
        set_fahrzeugliste: function(val) { fahrzeugliste = val; },
        dokumentliste: function() { return dokumentliste; },
        set_dokumentliste: function(val) { dokumentliste = val; },
        hardwareliste: function() { return hardwareliste; },
        set_hardwareliste: function(val) { hardwareliste = val; },
        ressourcentypliste: function() { return ressourcentypliste; },
        set_ressourcentypliste: function(val) { ressourcentypliste = val; },
        rechteliste: function() { return rechteliste; },
        set_rechteliste: function(val) { rechteliste = val; },
        ressourcenliste: function() { return ressourcenliste; },
        set_ressourcenliste: function(val) { ressourcenliste = val; },
        fading_time: function() { return fading_time; },
        set_message_time : function(val) { message_time = val; },
        message_time: function() { return message_time; },
        
        init: function() {
            if (is_init){
                // loading data
                $http.get('/api/standort/list_active').then( function(res) { standorte = res.data; });
                $http.get('/api/daten/list').then( function(res) { daten = res.data; });
                $http.get('/api/zutrittsmittelstatus/list').then( function(res) { statusliste = res.data; });
                $http.get('/api/zutrittsmittel/list').then( function(res) { zutrittsmittelliste = res.data; });
                $http.get('/api/mitarbeiter/list').then( function(res) { mitarbeiterliste = res.data; });
                $http.get('/api/aufgabe/list').then( function(res) { aufgabenliste = res.data; });
                $http.get('/api/mitarbeiterstatus/list').then( function(res) { mitarbeiterstatusliste = res.data; });
                $http.get('/api/rolle/list').then( function(res) { rollenliste = res.data; });
                $http.get('/api/beschaeftigung/list').then( function(res) { beschaeftigungliste = res.data; });
                $http.get('/api/musterrolle/list').then( function(res) { musterrollen = res.data; });
                $http.get('/api/tresor/list').then( function(res) { tresorliste = res.data; });
                $http.get('/api/raum/list').then( function(res) { raumliste = res.data; });
                $http.get('/api/fahrzeug/list').then( function(res) { fahrzeugliste = res.data; });
                $http.get('/api/hardware/list').then( function(res) { hardwareliste = res.data; });
                $http.get('/api/ressourcentyp/list').then( function(res) { ressourcentypliste = res.data; });
                $http.get('/api/ressourcen/list').then( function(res) { ressourcenliste = res.data; });
                $http.get('/api/rechte/list').then( function(res) { rechteliste = res.data; });
                this.is_init = false;
                fading_time = 750;
                message_time = 1000;
            }
        },
        
        update : function() {
            this.is_init(true);
            this.init();
        }
    };
});

app.filter('filterList', function (){
    return function(list, formData, selected) {
        var filteredList = [];        
        
        if (formData !== undefined && formData.length > 0) {
            for ( var index in list ){
                var element = list[index];
                var inFormData = false;

                for ( var index2 in formData ){
                    var data = formData[index2];
                    if (data._id === element._id) {
                        inFormData = true;
                    }
                }
                if (!inFormData){
                    filteredList.push(element);
                }
            }
        }
        else {
            filteredList = list;
        }
        if (selected !== undefined) {
            filteredList.push(selected);
        }
         return filteredList;
    };
});

app.controller('DataSecController', ['$scope', '$http', 'appdata', '$log', '$window', 'DataService', '$location', function($scope, $http, appdata, $log, $window, DataService, $location) {
        $scope.appdata = appdata;
        $scope.list = '';
        $scope.dataservice = DataService; 
        $scope.formData = {};
        $scope.object_id = undefined;
        $scope.title = appdata.submenu + ' anlegen';
        $scope.params = {};
                
        (function (){
            $http.get('/api/user/loggedIn').then( 
                function(res) { 
                    $http.get('/api/benutzer/get',{params: { id : res.data }}).then(
                        //success
                        function (data) { 
                            appdata.user = data.data.object[0];
                            appdata.show_data = appdata.user.rechte 
                                                    | appdata.user.beschaeftigung 
                                                    | appdata.user.hardware 
                                                    | appdata.user.ressourcen 
                                                    | appdata.user.ressourcentyp 
                                                    | appdata.user.raum 
                                                    | appdata.user.standort 
                                                    | appdata.user.tresor 
                                                    | appdata.user.zutrittsmittel ;
                            appdata.show_static_data = appdata.user.mitarbeiter 
                                                            | appdata.user.musterrolle 
                                                            | appdata.user.dokumente ; 
                            appdata.show_status = appdata.user.mitarbeiterstatus 
                                                        | appdata.user.zutrittsmittelstatus;
                            // init data
                            $scope.dataservice.init();
                        }
                        , //error
                        function () {
                           alert('Probleme bei der Benutzerauthorisierung!');
                        });
                }
            );
        })();
                
        //Call Submenu
        $scope.call_submenu = function($name){
//            $http.get('/api/connection/state').success (function(data) { 
//                if(data.state === 1){
                    if ($name === undefined | $name === null) {
                        $name = 'default';
                    };
                    appdata.submenu = $name;
                    $http.get('/api/'+$name+'/list').then( function(res) { 
                        $scope.list = res.data;
                        $log.debug('list: ' + JSON.stringify($scope.list));
                        $("#content").fadeOut($scope.dataservice.fading_time, function() {
//                            appdata.submenu = $name;
                            appdata.content = 'default';
                            $("#submenu").fadeIn($scope.dataservice.fading_time);
                        }); 
                        
                        appdata.msg = $name;
                    });
//                } else {
//                    $window.location.path('/disconnected.html');
//                }
//            });
        };
        
        //Call Content
        $scope.call_content = function($content, $object){
            if ($content === undefined | $content === null) {
                $content = 'default';
            };
            $log.debug('call ' + $content + ' object: ' + $object);
            
            appdata.content = $content;
            if ($object !== undefined) {
                appdata.object = $object;
            }
            $log.debug('$scope.object_id ' + $scope.object_id);
            if (appdata.object !== undefined) {
                $http.get('/api/'+appdata.submenu+'/get',{params: { id : appdata.object}}).then( 
                  function(data) { 
                      
                      if (data.data.object[0] !== undefined) {
                          $scope.formData = data.data.object[0];
                      } else {
                          $scope.formData = data.data.object;    
                      }
                      if (appdata.content === 'delete' ){
                          $scope.title = ' löschen';
                      } else{
                          $scope.title = ' ändern'; 
                      }
                      $scope.object_id = appdata.object;      
                      $log.debug('formData: ' + JSON.stringify($scope.formData));
                });
            } else {
                $http.get('/api/'+appdata.submenu+'/get_new_obj',$scope.params).then( 
                    //success
                    function (data) { 
                        $scope.formData = data.data.object;
                        $scope.title = ' anlegen'; 
                        $scope.object_id = undefined;
                        appdata.content = $content;
                    }, //error 
                    function () {                      
                       console.log('error: setting object to undefined');
                       $scope.formData = {};
                       $scope.object_id = undefined;
                       $scope.title = ' anlegen';
                   });                
            }
            
            $("#submenu").hide($scope.dataservice.fading_time, function() {
                $("#content").fadeIn($scope.dataservice.fading_time); 
            });            
        };
        
        //Reset
        $scope.reset = function(){
            appdata.object = undefined;
            $scope.object_id = undefined;
            $scope.formData = {};
            $scope.content = undefined;
            $scope.call_submenu(appdata.submenu);
        };

        //Create or Update
        $scope.save = function(){
            $log.debug('object_id ' + $scope.object_id);
            $log.debug('formData: ' + JSON.stringify($scope.formData));
            if ($scope.object_id === undefined) {                
//                Materialize.toast('create: ' + appdata.submenu  + '   '  + JSON.stringify($scope.formData), 4000);
                $http.post('/api/' + appdata.submenu + '/create', $scope.formData).then( 
                    //success
                    function(data, status, headers, config){
                      appdata.msg = appdata.submenu + ' gespeichert!';
//                      Materialize.toast(appdata.msg, 4000);
                      $scope.reset();
                    }, 
                    //error
                    function(data, status, headers, config){
                        alert("Fehler beim Speichern: " + data);
                    });
            } else {
                $http.post('/api/' + appdata.submenu + '/save', $scope.formData).then( 
                  //success
                    function(data, status, headers, config){
                        appdata.msg = appdata.submenu + ' gespeichert!';
//                        Materialize.toast(appdata.msg, $scope.dataservice.message_time);
//                        $scope.reset();
                    }, //error
                    function(data, status, headers, config){
                        appdata.msg = 'Fehler beim Speichern: ' + data;
//                        Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                    }); 
            }
        };

        //Delete
        $scope.delete = function(){
            if (appdata.object !== undefined){
                $http.post('/api/' + appdata.submenu + '/delete', $scope.formData).then( 
                    //success
                    function(data, status, headers, config){
                        appdata.msg = appdata.submenu + ' gelöscht!';
//                        Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                        $scope.reset();
                    }, 
                    //error
                    function(data, status, headers, config){
                        alert("Fehler beim Löschen: " + data);
                    });
            }
        };

        $scope.add_entry = function(list, data){
            $log.debug('list: ' + JSON.stringify(list));
            if (list !== undefined){
                list.push(data);
            } else {
                list = [];
                list.push(data);
            }
            $(document).ready(function() {
                $('select').material_select();
            });
        };

        $scope.remove_entry = function(list, entry){
            if (list !== null & list !== undefined & angular.isArray(list)){
                var index = list.indexOf(entry);
                list.splice(index,1);
            }
            $(document).ready(function() {
                $('select').material_select();
            });
        };
        
        $scope.init_rights = function(aufgabe_id, beschaeftigung_id) {
            if (aufgabe_id !== undefined & beschaeftigung_id !== undefined) {
                $http.get('/api/mitarbeiter/get_init_right',{params: { aufgabe_id : aufgabe_id, beschaeftigung_id : beschaeftigung_id}}).then( 
                    //success
                    function (data) { 
                        $log.debug('data: ' + JSON.stringify(data.object));
                        $scope.formData.berechtigung = data.object;           
                    },
                    //error
                    function () {
                        appdata.msg = 'Error: Initialisierung Berechtigung fehlgeschlagen!';
//                        Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                        $log.debug('error: setting object to undefined');
                    });   
            } else {
                appdata.msg = 'Error: Initialisierung Berechtigung fehlgeschlagen! Aufgabe und Beschäftigung nicht definiert!';
                alert(appdata.msg);
                $log.debug('Error: Initialisierung Berechtigung fehlgeschlagen! Aufgabe und Beschäftigung nicht definiert!');
            }
        };

        $scope.musterrolle_is_new = function(aufgabe_id, beschaeftigung_id) {
            $log.debug('in musterrolle_exists');
            if (aufgabe_id !== undefined & beschaeftigung_id !== undefined) {
                $http.get('/api/musterrolle/exists',{params: { aufgabe_id : aufgabe_id, beschaeftigung_id : beschaeftigung_id}}).then( 
                    //success
                    function (data) { 
                        if (data === true) {
                            appdata.msg = 'Musterrolle für gewählte Aufgabe-Beschäftigungskombination existiert bereits!';
//                            Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                        } 
                        return !data;           
                    }, 
                    //error
                    function () {
                        appdata.msg = 'Error: Initialisierung Berechtigung fehlgeschlagen!';
//                        Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                        $log.debug('error: setting object to undefined');
                    });   
            } 
        },

        $scope.signup = function(){
            $http.get('/api/benutzer/exists',{params: { name : $scope.formData.username }}).then(
                //success
                function (res) { 
                    $log.debug('data: ' + JSON.stringify(res.data.userExists));
                   if (res.data.userExists) {
                       alert('Username ist bereits vergeben!');
                   } else {
                        $http.post('/signup', $scope.formData).then( 
                        //success
                        function(data, status, headers, config){
                            appdata.msg = 'User registriert!';
                            $scope.reset();
                        }, 
                        //error
                        function(data, status, headers, config){
                            alert("Fehler beim Registrieren: " + res);
                        }); 
                   }
                }, //error
                function () {
                   alert('Probleme bei der Prüfung des Benutzernamens!');
                });
        };
        
        //Log out user and kill session
        $scope.logout = function(){
            appdata.object = undefined;
            $http.get('/logout').then( 
                //success
                function(data, status, headers, config){
                    appdata.msg = 'Erfolgreich abgemeldet!';
                    $window.location.reload();                    
                }, 
                //error
                function(data, status, headers, config){
                    appdata.msg = 'Fehler beim Abmelden: '+ data;
//                    Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                }); 
        };
        
        //Log out user and kill session
        $scope.login = function(){
            appdata.object = undefined;
            $http.post('/login', $scope.formData).then( 
                //success
                function(data, status, headers, config){
                    appdata.msg = 'Erfolgreich abgemeldet!';
                    $window.location.reload();                    
                }, 
                //error
                function(data, status, headers, config){
                    appdata.msg = 'Fehler beim Abmelden: '+ data;
//                    Materialize.toast(appdata.msg, $scope.dataservice.message_time);
                }); 
        };
        
        $scope.hide_submenu = function() {
            appdata.submenu = undefined;
            $("#submenu").fadeOut($scope.dataservice.fading_time, function() {}); 
        };
        
        $scope.getClass = function (item) {
            if (item === appdata.submenu) {
//                Materialize.toast('menu_active', $scope.dataservice.message_time);
                return 'menu_active';
                
            } else {
                return '';
            }
        };
        
}]);
