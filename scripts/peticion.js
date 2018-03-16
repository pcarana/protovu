var data = {
    form: {
      domain: 'test/me',
      apiresponse: null
    },
	apiobject: null,
	showDismissibleAlert: false,
	errorMessage: ''
};

var methods = {
      onSubmitDomain(evt) {
        const vm = this;
        vm.apiobject = '';
        vm.form.apiresponse = '';
        vm.errorMessage = '';
        vm.showDismissibleAlert = false;
        evt.preventDefault();
        // axios.get('http://localhost:8080/rdap-server/domain/whiterabbit.com')
       // axios.get('https://jsonplaceholder.typicode.com/posts/1')
        axios.get('http://echo.jsontest.com/' + vm.form.domain)
          .then(function (response) {
            console.log(response.data);
            vm.form.apiresponse = response.data;
            //vm.apiobject = JSON.parse(JSON.stringify(vm.apiresponse, null, 2));
            var keys = Object.entries(response.data);
            for (i = 0; i < keys.length; i++) {
            	vm.apiobject += keys[i][0] + " = " + keys[i][1] + " / ";
            }
          })
          .catch(function (error) {
            console.log(error);
            vm.showDismissibleAlert = true;
            vm.errorMessage = error;
          });
      }
};