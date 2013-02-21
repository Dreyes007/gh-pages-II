var parseSurveyForm = function(data){
	//code for survey form goes here
	console.log(data);
	
};



$('#home').on('pageinit',function(){
//code needed form home page goes here

	var myForm = $('#fillSurvey'),
		serrorLink = $('#serrorLink')
	;
	
	myForm.validate({
		invalidHandler: function(form, validator){
			serrorLink.click();
		},
		submitHandler: function(){
			var data = myForm.serializeArray();
			parseSurveyForm(data);
		}
	});

});