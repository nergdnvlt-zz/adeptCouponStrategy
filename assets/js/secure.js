function evalSecureCoupon(product) {
	if (product === "bronze") {
		return 1
	} else if (product === "silver") {
		return 3
	} else if (product ==="gold") {
		return 5
	} else{
		return 0
	}
}


function fsSecure() {
	let fsPayload = "";
	let secureDiscount = "";

	let secureCoupon = document.getElementById('secureCouponInput').value.toUpperCase();
	let secureProduct = $('input[name="secureProduct"]:checked').val();


	secureDiscount = evalSecureCoupon(secureProduct);

	fsPayload = {
		"items": 
			[
		   		{
				    "product": secureProduct,
				    "quantity": 1,
				    "pricing": {
						"quantityDiscounts": {
                   			"1": {
                              "USD": secureDiscount
                            }
                        }
					}
		   		}
		 	]
	}
	// Here you would pass the discounted session to your backend for encryption,
	// then pass the encrypted session object to FS
	
	// Pass Discounted and Encrypted Session To FS
	fastspring.builder.secure(fsPayload);

	// Checkout
	fastspring.builder.checkout();
}


window.onload = function () {
  var form = document.getElementById('secure-form');
  $('#coups').click(function (e) {
    for(var i=0; i < form.children.length; i++){
      if(form.children[i].value === '' && form.children[i].hasAttribute('required')){
        alert('There are some required fields!');
        return false;
      }
    }
    fsSecure();
  }); 
};