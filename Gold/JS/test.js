




$('#home').on('pageinit', function(){

		var myForm = $('#fillSurvey'),
			serrorLink = $('#serrorLink')
		;
		    myForm.validate({
			invalidHandler: function(form, validator) {
				serrorLink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]');
								
				};
				
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
/*	    var localStorageKey = "demoStorageKey";
        $('#personalInfo').live('pagecreate', function() {
            if (Modernizr.localstorage) {
                showStoreValue();
            }
            else {
                $('#message').text("Unfortunately your browser doesn't support local storage");
            //$('#submit').attr('disabled', 'disabled');
                $('#message').show();
            }
            $('#submit').click(function(e) {
                localStorage.setItem(localStorageKey, $('#fname').val());
                showStoreValue();
                e.preventDefault();
            });
        });

        function showStoreValue() {
            var item = localStorage.getItem(localStorageKey);
            if (item == null) {
                item = 'Nothing in store';
            }
            else if (item.length === 0) {
                item = 'Store contains empty value';
            }
            $('.storeItem').text(item);
        }
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

/*var autofillData = function (){
	 
};

var getData = function(){

};
var storeData = function(data){

	
}; 


/*var	deleteItem = function (){
			
};
					
//var clearLocal = function(){

};
*/