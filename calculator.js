var isGetResultKey = false; //if you type the "="
var operator = ""; //save the operator
var current_result = 0; // current result is the value get before you click +/-/*//
var new_input = false;  //the new input value

$(document).ready(function(){
	//AC button
	$('#ac').click(function(){
		document.getElementById("result").value = "";
		operator = "";
		current_result = 0;
		new_input = false;
	});

	//Del button, it only delete the last input one
	$('#ce').click(function(){
		var obj = document.getElementById("result");
		obj.value = obj.value.substring(0,obj.value.length - 1);  
		
		if(isGetResultKey){
			current_result= obj.value;
		}
	});

	//number button
	$('#b0,#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9').click(function(){
		var btn_value = $(this).val();
		var obj = document.getElementById("result");

		if(isGetResultKey) {   
			obj.value = ""; //if you press equal button, then set the input value ""
			isGetResultKey = false;  
		}  

		//if the first number is 0,you can only type one time.like 00001,it is wrong
		if(obj.value ==="0"){
			if(btn_value === "0"){
				return;
			}
			else{
				obj.value="";    
			}
		}

		//max digit on the input, I assume the size of number limit 9
		if(obj.value.length < 9){
        	obj.value += btn_value;   
        }
        else{alert("exceed the max number");}

        //when you click the digit, it should be set true
        new_input = true;
	});
});

function decimal(t){
//decimal can only appear one time
	var obj = document.getElementById("result"); 
	var btn_value = t.value;
	if(obj.value.indexOf('.') > -1)  return;

	//if you input demial first,it will show 0.
	if(obj.value===""){
		if(btn_value==="."){
			obj.value="0.";
		}
	}
	else{
		obj.value+=btn_value;
	}
}

// +、-、*、/ button
//for this function, you only need to get the latest operator
function op(t) {  
	//get the newest operator
	operator = t.value;   
	var obj = document.getElementById("result"); 

	//if there is no value in the input box, you could not do the operator. 
	if(obj.value == "")  return; 
} 

//% button, A × (1 + B/100)  72+5% = 72+(1+5%)
function percent(){
	var obj = document.getElementById("result");  
	if(obj.value==="") return;

	obj.value = current_result * (Number(obj.value)/100);
} 

//change negative or positive: +/- button
function change(){
	var obj = document.getElementById("result");  
	if(obj.value==="") return;

	//if the input has the value
	obj.value = obj.value * (-1);
	//if you get the result is 10,you change to -10,so the current_result = -10
	//if you haven't get the result, you just change 2 to -2, you don't need to change the current_result
	if(isGetResultKey){
		current_result= obj.value;
	}
}

//calculate result
//current result is the value get before you click +/-/*//
function getResult() {  
	//for example,if you haven't put click any number, you click many times of "+",the result shoule not be changed
	if (new_input==false) return;

	var finalValue;   
	var beginValue = Number(current_result);  

	var obj = document.getElementById("result");  

	if(operator === '*')  
		finalValue = beginValue * Number(obj.value);  
	else if(operator === '/')  
		finalValue = beginValue / Number(obj.value);  
	else if(operator === '+')  
		finalValue = beginValue + Number(obj.value);  
	else if(operator === '-')  
		finalValue = beginValue - Number(obj.value);  
	else
		finalValue = Number(obj.value);

	obj.value = finalValue;
	current_result = finalValue;
	isGetResultKey = true;   
	finalValue = "";  
	new_input = false;  //it is very important,if you continue click "+",it will not upate the value
	operator = '';  //it is very important
}  


