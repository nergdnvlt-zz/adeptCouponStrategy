function dataAfterMarkupCallback() {
	$(".pricing").each(function() {
	var text = $(this).text();
	text = text.replace(".00", "");
	text = text.replace(",00", "");
		 $(this).text(text);
	});
}


function evalCoupon(product) {
	if (product === "bronze") {
		return 1;
	} else if (product === "silver") {
		return 3;
	} else if (product ==="gold") {
		return 5;
	} else{
		return 0;
	}
}

function evalLanguange(userLanguage) {
	languages = ["en", "es", "zh", "fr", "de", "it", "ja", "pt", "ru", "da",  "fi", "hr", "ko", "no", "sv", "nl"]
	if (languages.includes(userLanguage)) {
		return userLanguage;
	} else {
		return "en";
	}
}

async function createAccount(accountInfo) {
	let response = await fetch('https://24df0d5d.ngrok.io/api/v1/accounts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(accountInfo)
	})
	const json = await response.json();

	return json.accountId;
}

async function createSession(sessionPayload) {
		let response = await fetch('https://24df0d5d.ngrok.io/api/v1/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sessionPayload)
	})
	const json = await response.json();

	return json.sessionId;
}

async function buildFS() {
	// Define all local variables for FS Checkout Flow
	let accountId = "";
	let sessionPayload = "";
	let sessionId = "";
	let discount = "";


	let fsProd = $('input[name="product"]:checked').val();
	let firstName = document.getElementById('firstNameInput').value;
	let lastName = document.getElementById('lastNameInput').value;
	let email = document.getElementById('emailInput').value;
	let country = document.getElementById('countryInput').value;
	let language = navigator.language || navigator.userLanguage;
	let coupon = document.getElementById('couponInput').value.toUpperCase();

	language = evalLanguange(language);

	let accountPayload = 
		{
			"fastspring": 
			{
				"contact": {
					"first": firstName,
					"last": lastName,
					"email": email
				},
				"language": language,
				"country": country
			}
		}

	// Call to Get FS Account ID
	accountId = await createAccount(accountPayload);


	// Apply Coupon if correct
	if (coupon === "WICKED") {
		discount = evalCoupon(fsProd);
	} else {
		discount = 0;
	}

	// Build session with account, product and discount
	sessionPayload = {
		"fastspring": {
			"accountId": accountId,
			"product": fsProd,
			"discount": discount
		}
	}

	// Send session to FS
	sessionId = await createSession(sessionPayload);

	
	// Send session ID to checkout
	fastspring.builder.checkout(sessionId);
}


window.onload = function () {
  var form = document.getElementById('theForm');
  $('#buy').click(function (e) {
  // form.button.onclick = function (){
    for(var i=0; i < form.elements.length; i++){
      if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
        alert('There are some required fields!');
        return false;
      }
    }
    buildFS();
  }); 
};
