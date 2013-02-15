// Daniel Reyes
// MIU 1302


// DOM Readiness
window.addEventListener("DOMContentLoaded", function(){
	
	
	//fuction getElementByIdaddItem.html
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;		
	}
	
	//Select field element populated with options
	function chooseASpot(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "establishment");
		for(var i=0, j=establishmentGroups.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = establishmentGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
		
	}
	//Find value of selected radion button
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}						
		}
	}
	function getCheckboxValue(){
		if(ge('18-24').checked){
			ageValue = $('18-24').value;
		}else{
			ageValue = "No";
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				ge('informationForm').style.display = "none";
				ge('clear').style.display = "inline";								
				ge('addNew').style.display = "inline";			
			    break;
			case "off":
				ge('informationForm').style.display = "block";
				ge('clear').style.display = "inline";								
				ge('addNew').style.display = "none";
				ge('items').style.display = "none";			
			    break;
			default:
				return false;
			
		}
	}
	
	
	function storeData(key){
		//If there is not key, this means this is a  brand new Item and need a new key
		if(!key){
			var id 				= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here into the storeData function.
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();		
		var item			= {};
			item.fname		= ["First Name:", ge('fname').value];
			item.lname		= ["Last Name:", ge('lname').value];	
			item.email		= ["Email:", ge('email').value];
			item.phone		= ["Phone Number:", ge('phone').value];
			item.sex		= ["Sex:", sexValue];
			item.age		= ["Age", ageValue];
			item.select 	= ["Establishment:", ge('establishment').value];
			item.date		= ["Date of Visit:", ge('date').value];
			item.time 		= ["Rate your Experience:", ge('time').value];
			item.comments	= ["Additional Comments:", ge('comments').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.select[1], makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);			
			}
			makeItemLinks(localStorage.key(i),linksLi); // create edit and delete buttons/link for each item in local storage.
		}
	}
	
	//Get the image for the right category.
	function getImage(imgName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ imgName + ".png");
		imageLi.appendChild(newImg);
	}
	
	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML page.
		//Store JSON OBJECT into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make Item Links
	//Create the edit and delete links for each of the Items when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Survey Information";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//Delete single Item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Information";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	
		
	}
	
	function editItem(){
		//Grab the data from our item on local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//Populate form with with current local storage values.
		ge('fname').value = item.fname[1];
		ge('lname').value = item.lname[1];
		ge('email').value = item.email[1];
		ge('phone').value = item.phone[1];
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value === "Male" && item.sex[1] === "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value === "Female" && item.sex[1] === "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.age[1] === "Yes"){
			$('fav').setAttribute("checked", "checked");							
		}
		ge('establishment').value = item.select[1];
		ge('date').value = item.select[1];
		ge('time').value = item.select[1];
		ge('comments').value = item.select[1];
	
		//Remove the initial listener from the input 'Save Information' button.
		save.removeEventListener("click", storeData);
		//Change Submit Button value to Edit Button
		ge('submit').value = "Edit Information";
		var editSubmit = ge('submit');
		//Save the key value establish in this function as a property of the edit submit event
		//so we can use that value when the edited data is saved.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Information was deleted");
			window.location.reload();
		}else{
			alert("Information was NOT deleted");
		}
	}
			
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
			
		}else{
			localStorage.clear();
			alert("All information has been deleted!");
			window.location.reload();
			return false;
		}
	
	}
	
	function validate(e){
		//Define the elements we want to check
		var getfname = ge('fname');
		var getlname = ge('lname');
		var getEmail = ge('email');
		var getPhone = ge('Phone');
		
		//Reset Error Message.
		errMsg.innerHTML = "";
		getfname.style.border = "1px solid black";
		getlname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		
		//Get error message
		var messageAry = [];
		
		//First Name Validation
		if(getfname.value === ""){
			var fnameError = "Please enter a first name";
			getfname.style.border = "1px solid red";
			messageAry.push(fnameError);
		}
		//Last Name Validation
		if(getlname.value === ""){
			var lnameError = "Please enter a last name";
			getlname.style.border = "1px solid red";
			messageAry.push(lnameError);			
		}
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		
		//If there were errors display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault;
			return false;
		}else{
			//If all is Ok, save our Data! Send the key value (Wich came from the editData function).
			//Remember this key value was passed as through the editSubmit event listener as a property.
			storeData(this.key);
			
		}	
			
	}
			
	
	
	//variable default
	var establishmentGroups = ["--Choose an Establishment--", "Chili's", "Applebee's", "Hooters", "Wal-Mart", "Target"],		
		sexValue,
		ageValue = "No",
		errMsg = ge('errors');
		chooseASpot();
		
		
	//Set link & Submit click events
	var displayData = ge('displayData');
	displayData.addEventListener("click", getData);
	var clearSurvey = ge('clear');
	clearSurvey.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);
			
});
