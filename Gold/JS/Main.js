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
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldname = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldname  +'</li>';
			};
			$("#surveyError ul").html(html);
		},
		submitHandler: function(){
			var data = myForm.serializeArray();
			parseSurveyForm(data);
		}
	});
	
	/*function store(key){
		
		localStorage.setItem("firstName", ge('fname').value);
		localStorage.setItem("lastName", ge('lname').value);
		localStorage.setItem("email", ge('email').value);
		localStorage.setItem("phone", ge('phone').value);
		localStorage.setItem("address", ge('address').value);
	}*/
	

});