function eval(couponCode) {
	let discount = "";
	if (couponCode === "ALLST") {
		discount = {
			"bronze": 1,
			"silver": 3,
			"gold": 5
		}
	} else if (couponCode === "STFARM") {
		discount = {
			"bronze": 7,
			"silver": 15,
			"gold": 20
		}
	}

	return discount;
}

function submitCoupon() {
	let fsPayload = "";
	let secureDiscount = "";

	let secureCoupon = document.getElementById('secureCouponInput').value.toUpperCase();

	secureDiscount = eval(secureCoupon);

	fsPayload = {
		"items": 
			[
		   		{
				    "product": "bronze",
				    "quantity": 0,
				    "pricing": {
						"quantityDiscounts": {
                   			"1": {
                              "USD": secureDiscount.bronze
                            }
                        }
					}
		   		},
		   		{
				    "product": "silver",
				    "quantity": 0,
				    "pricing": {
						"quantityDiscounts": {
                   			"1": {
                              "USD": secureDiscount.silver
                            }
                        }
					}
		   		},
		   		{
				    "product": "gold",
				    "quantity": 0,
				    "pricing": {
						"quantityDiscounts": {
                   			"1": {
                              "USD": secureDiscount.gold
                            }
                        }
					}
		   		}
		 	]
	}
	// Here you would pass the discounted session to your backend for encryption,
	// then pass the encrypted session object to FS
	
	// Pass Discounted and Encrypted Session To FS
	if (secureCoupon !== "") {
		fastspring.builder.secure(fsPayload);
	} else {
		alert('Wrong coupon code');
	}
}