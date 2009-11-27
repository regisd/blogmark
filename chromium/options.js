// Saves options to localStorage.
function save_options() {
	var user = $("#user").val();
	localStorage["user"] = user;
	localStorage["password"] = $("#password").val();

	// Update status to let user know options were saved.
	$("#status").text("Options Saved for " + user);
	$("#status").show();
	setTimeout(function() {$("#status").fadeOut("normal");}, 2000);
	
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var user = localStorage["user"];
	var password = localStorage["password"];
	if (!user) {
		return;
	}
	$("#user").val(user);
	$("#password").val(password);
}