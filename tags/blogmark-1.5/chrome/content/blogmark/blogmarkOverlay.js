/* 
 *
 * Copyright (c) 2005-2006 Regis Decamps
 *
 * Based on original code (c) 2001-2002  Ted Mielczarek
 *                        (c) 2003 Phil Ringnalda
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

/*
 * Callback when the "Blogmark!" entry is selected in the 
 * contextual menu.
 */
var BlogmarkMenu = {
  myMarks: function() {
    const url = "http://blogmarks.net/my/"

    document
       .getElementById("content")
       .webNavigation
       .loadURI(url, 0, null, null, null)
  },
  
  publicMarks: function() {
    const url = "http://blogmarks.net/"

    document
       .getElementById("content")
       .webNavigation
       .loadURI(url, 0, null, null, null)
  },
  
  addThis: function() {
	var doc = window.content.document;

	if(typeof(_ref)!='undefined')r=_ref;
	this.blogmarkThis(_content.getSelection().toString(), doc.location.href, doc.title, doc.referrer);
  },

  /* Open a Blogmarks add entry window with
   * description text t, 
   * url u, 
   * title n 
   * referer r 
   *          pre-filled 
   */
  blogmarkThis: function(t,u,n,r) {
    var browser = getBrowser();
    var available = 2048;
    available = available - u.length - n.length -r.length;
    //t = t.substr(0,available);
    var blogmarkURL='http://blogmarks.net/my/new.php?mini=1&truc=3'+
                     '&title='+encodeURIComponent(n)+
                     '&url='+encodeURIComponent(u)+
                     '&summary='+encodeURIComponent(t)+
                     '&via='+encodeURIComponent(r);
    window.open(blogmarkURL, 'blogmarks','location=no,toolbar=no,scrollbars=yes,width=350,height=500,status=no');
  }
}