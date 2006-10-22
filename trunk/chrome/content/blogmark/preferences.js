function BlogmarkPreferences() {
	this.aConsoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
	this.preferencesService =  Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);	
	this.isDebug = true; //debug flag //TODO set to false
}

/**
 * debug logging
 */
BlogmarkPreferences.prototype.debug = function(str) {
	if(this.isDebug && this.aConsoleService) {
		this.aConsoleService.logStringMessage("[DEBUG] BlogmarkPreferences: " + str);
	}
}

/**
 * Returns the value of the preference 'key'
 * If preference str is not defined, null is returned.
 */
BlogmarkPreferences.prototype.getCharPref = function(key) {
	try {
		return this.preferencesService.getCharPref("blogmark."+key);
	}
	catch (ex) {
		return null;
	}
}

/**
 * Set a preference of type char
 */
BlogmarkPreferences.prototype.setCharPref = function(key,value) {
	this.preferencesService.setCharPref("blogmark."+key,value);
}

var blogmarkPreferences=new BlogmarkPreferences();

/*****************************************************************************/

/**
 * Load current preferences in the firefox Preferences service
 * and initializes the preferences window accordingly
 */
function LoadBlogkmarkPreferences() {
    /* select the correct radio button in "add method" */
    try {
    	var prefaddmethod = blogmarkPreferences.getCharPref("addmethod");
		debug("prefaddmethod="+prefaddmethod);
		var radio=document.getElementById(prefaddmethod);
		var radiogroup=document.getElementById("addmethod");
		radiogroup.selectedItem=radio;
    }
    catch (ex) {
		blogmarkPreferences.debug("default value kept");
    }
}

/**
 * Save preferences
 */
function doOK() {
	var addmethod=document.getElementById("addmethod").selectedItem;
	blogmarkPreferences.setCharPref("addmethod",addmethod.id);
	return true;
}

/**
 * Discard changes.
 */
function doCancel() {
	return true;
}