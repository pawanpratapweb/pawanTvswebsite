const formSubmitBtn = document.querySelector(".formSubmitBtn");

const showError = (message) => {
	const formMessage = document.querySelector(".formMessage");
	formMessage.style.background = "rgb(255 55 72)";
	formMessage.style.color = "white";
	formMessage.innerText = message;
	formMessage.style.opacity = 1;
	setTimeout(() => {
		formMessage.style.opacity = 0;
	}, 10000);
}

const showSend = () => {
	const formMessage = document.querySelector(".formMessage");
	formMessage.style.background = "#2ed573";
	formMessage.style.color = "white";
	formMessage.innerText = "Your Data has been sent.";
	formMessage.style.opacity = 1;
	setTimeout(() => {
		formMessage.style.opacity = 0;
	}, 10000);
}

formSubmitBtn.addEventListener("click", () => {
	event.preventDefault();
	const personName = document.querySelector(".personName").value;
	const phoneNo = document.querySelector(".phoneNo").value;
	const bikeCompany = document.querySelector(".bikeCompany").value;
	const question = document.querySelector(".question").value;

	if(personName == ""){
		showError("Please enter a Name");
	} 
	else if(phoneNo == ""){
		showError("Please enter a phone number");
	}
	else if(bikeCompany == ""){
		showError("Please enter a bike company");
	}
	else if(question == ""){
		showError("Please enter your question");
	}
	else{
		fetch('/contact', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({
							personName: personName,
							phoneNo: phoneNo,
							bikeCompany: bikeCompany,
							question: question
			})
		})
			.then(() => {
				showSend();
			})
			.catch(error => {
				showError("could not send message");
			})
	}
});