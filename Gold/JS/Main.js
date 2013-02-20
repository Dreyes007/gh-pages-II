var parseSurveyForm = function(data){
	//code for survey form goes here
	console.log(data);
	
};



$('#home').on('pageinit',function(){
//code needed form home page goes here

	var myForm = $('#fillSurvey');
	
	myForm.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = myForm.serialize();
			parseSurveyForm(data);
		}
	});

});