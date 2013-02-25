




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
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

/*var autofillData = function (){
	 
};

var getData = function(){

};*/

	   var storeData = function(data){
	   		localStorage.setItem("test","hello");
	   		alert(localStorage.length);
	
}; 

	var save = ge('#submit');
	save.addEventListener("click", storeData);

/*var	deleteItem = function (){
			
};
					
//var clearLocal = function(){

};
*/