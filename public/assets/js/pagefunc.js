$(document).ready(function() {
	// signup jQuery capture of the sign up form
	var signUpForm = $("form.signup");
	var emailInput = $("input#email-input");
	var passwordInput = $('input#password-input');

	//mambers seach company capture of the form
	var searchForm = $("form.search-add");
	var companySearch = $("input#search-input");

	// login jQuery capture of the login form
	var loginForm = $("form.login");

    var deleteAccount = $("button.deletebutton");



	signUpForm.on("submit", function(event) {
		event.preventDefault();
		var userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		if (!userData.email || !userData.password) {
			return;
		}

		signUpUser(userData.email, userData.password);
    	emailInput.val("");
    	passwordInput.val("");
	});

	loginForm.on("submit", function(event) {
        event.preventDefault();
        console.log("success");
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

   deleteAccount.on("submit", function(event) {
        event.preventDefault();
        console.log("success");
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }

       deleteUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

	// searchForm.on("submit", function(event) {
	// 	event.preventDefault();

	// 	var searchData = companySearch.val().trim().toUpperCase();

	// 	// get or post? this may need to be a "put" route since we created the column by association
	// 	$.post("/api/" + searchData, function(data) {
	// 		console.log(data);
	// 	});	
	// });


	$.get("/api/user_data").then(function(data) {
		console.log(data);
		$(".member-name").append(data.email);
	});


	function signUpUser(email, password) {
		$.post("/api/signup", {
			email: email,
			password: password
		}).then(function(data) {
			window.location.replace(data);
		}).catch(function(err) {
			console.log(err);
		});
	}

	function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            console.log(err);
        });
    }

    function deleteUser(email,password) {
        $.post("/api/delete", {
            email: email,
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            console.log(err);
        });
    }

//animation for loginlogout form//
$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
    $(this).removeClass('is-active');
  });

});

});





























