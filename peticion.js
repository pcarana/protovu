var data = {
    form: {
      domain: 'test/me'
    },
	apiresponse: null
};

var methods = {
      onSubmitDomain(evt) {
        const vm = this;
        evt.preventDefault();
        // axios.get('http://localhost:8080/rdap-server/domain/whiterabbit.com')
       // axios.get('https://jsonplaceholder.typicode.com/posts/1')
        axios.get('http://echo.jsontest.com/' + vm.form.domain)
          .then(function (response) {
            console.log(response.data);
            // vm.apiresponse = JSON.stringify(JSON.parse(response.data), null,
			// 2);
            vm.apiresponse = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
};