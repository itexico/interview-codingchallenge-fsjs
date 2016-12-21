/**
* Main App Controller for the Angular Material Starter App
* @param UsersDataService
* @param $mdSidenav
* @constructor
*/
function AppController(UsersDataService, $mdSidenav,$mdDialog,$mdToast) {
    var self = this;

    self.selected     = null; //this says which list is selected , used to apply css style
    self.users        = [ ]; // list of lists
    self.selectUser   = selectUser; //this is the function that selectes a list to pass to the details
    self.toggleList   = toggleUsersList; // this opens the left sidebar
    self.toggleNewList= toggleNewList; // this opens the form to add new list
    self.newListName=null; //this is the list to send to server
    self.deletelist= deletelist; // exposes delete method to the scope forbutton input
    self.deleteitems=deleteitems;
    const {deleteList,saveList,loadAllUsers,saveItem}= UsersDataService; //extract the methods from service
    // self.addList=addList; // not needed
    // self.showEmptyListError=false; //not needed
    // self.shownew= false; // this is the boolean to add show the add new form //not needed



    refreshLists(); // this loads list from server


    // *********************************
    // Internal methods
    // *********************************



    /*dialogs and toasts methods*/
    function showToast(message){
        $mdToast.show(
            $mdToast.simple()
            .textContent(message)
            .position('bottom right' )
            .hideDelay(3000)
        );
    }
    function showAlert(messageTitle,mesageContent){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(messageTitle)
            .textContent(mesageContent)
            .ariaLabel('Alert Dialog ')
            .ok('ok!')
        );
    }
    function openDeletePrompt  (listName) {
        const confirm = $mdDialog.confirm()
        .title(`This will delete the ${listName} list`)
        .textContent('are you sure?')
        .ariaLabel('delete list')
        .ok('I am ')
        .theme('default')
        .openFrom('top')
        .cancel('no');
        return $mdDialog.show(confirm)
    };

    function openSavePrompt(action) {
        if(action==='list'){
            const confirm = $mdDialog.prompt()
            .title('Add the name of your new list')
            .textContent('This must be unique.')
            .placeholder('list name')
            .ariaLabel('newList name')
            .ok('Add!')
            .cancel('cancel');
            return $mdDialog.show(confirm);
        }else if(action==='item'){
            const confirm = $mdDialog.prompt()
            .title(`Add new item to the "${self.selected.name}" list.`)
            .textContent('This must be unique.')
            .placeholder('')
            .ariaLabel('newItem name')
            .ok('Add!')
            .cancel('cancel');
            return $mdDialog.show(confirm);
        }
    };
/****************************************
*/

function deleteitems(){console.log('deleted!!!!!');}

    function refreshLists(isDelete=false){
        loadAllUsers().then((lists)=>{
            console.log(lists);
            self.users    = [].concat(lists.data);
            if(isDelete){self.selected=lists.data[0];
            }else{
                self.selected=(self.selected)?self.selected=self.users.find(user=>user.name===self.selected.name):self.users[0];//if first load, it takes the first element, if just a refresh , it stays on the same list
            }

            /*on load it loads the firsrt openSavePromptwhen i add one it refreshes the current list*/
            /**doenst kneo what to do if list is deleted*/


        });
    };
    /*
    * Hide or Show the 'left' sideNav area
    */

    function toggleUsersList($http) {
        $mdSidenav('left').toggle();
    }

    function toggleNewList(item){
        if(item){/*new item*/
            openSavePrompt('item').then(
                (result)=>{
                    if(result){
                        saveItem(self.selected.name,result).then(
                            ( )=>{refreshLists();showToast(`"${result}" item added to the ${self.selected.name} list`);/*success*/},
                            ( )=>{showAlert('Error: Save operation unsuccessfull.',' please check your server is running.');/*server down*/}
                        );
                    }else{showAlert('Error: Item name empty','The Item must have a valid name.');/* alert can't be empty*/}
                },
                ()=>{console.info('user canceled save dialog');}
            );
        }else{/*new list*/
            openSavePrompt('list').then(
                (result)=>{
                    if(result){
                        if(isUnique(result) ){/*save*/
                            saveList(result).then(
                                ( )=>{refreshLists();showToast(`"${result}" list saved`);/*success*/},
                                ( )=>{showAlert('Error: Save operation unsuccessfull.',' please check your server is running.');/*server down*/}
                            );
                        }else{showAlert('Error: List name not unique','The list name should be unique.');/*name is not unique*/}
                    }else{showAlert('Error: List name empty','The list must have a valid name.');/* alert can't be empty*/}
                },
                ()=>{console.info('user canceled save dialog');}
            );
        }
    }

    function deletelist(user){
        openDeletePrompt(user.name).then(()=>{
            deleteList(user._id).then(
                ( )=> {
                    showToast(`"${user.name}" list deleted`);
                    refreshLists(true);

                    /*success in delete*/
                },
                ( )=>{showAlert('Error: Delete operation unsuccessfull.',' please check your server is running.');/*server down*//*clicked cancel in delete window*/}
            ); },
            ()=>{console.info('user canceled delete dialog');});
        }
        /**
        * Select the current avatars and CSS classes
        * @param menuId
        */
        function selectUser ( user ) {
            self.selected = angular.isNumber(user) ? $self.users[user] : user;
        }

        /**********************
        *     Helper methods
        *************************/
        function isUnique(list){
            return self.users.every(user=>list.toUpperCase()!=user.name.toUpperCase())
        }
    }

    export default [ 'UsersDataService', '$mdSidenav','$mdDialog','$mdToast',AppController ];
