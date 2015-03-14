# Introduction #

Reporting bug and asking for feature enhancement is great. And providing a patch is even better.

# Open an issue #

An issue is a defect (something that seems to be implemented but does not work as expected), or an enhancement (something that is just not available yet).

Please [browse the issues](http://code.google.com/p/blogmark/issues/list) and seek if there is the issue you are thinking about has not already been submitted.

If not, feel free to open a new one.

# Submit a patch #

If you think you are able to provide the code (or other resources) that would resolve the issue, your help is much appreciated.
Here is how you should proceed.

## Get the code ##

First, you should check out the code from the repository.

In brief, enter the following command
```
svn checkout http://blogmark.googlecode.com/svn/trunk/ blogmark
```

Now change directory to "blogmark".

## Change the code ##

Change the code directly. You can modify files, or add new files (and maybe delete files, but there is no reason to do it, _a priori_)

Note that a couple of files are generated from templates. You must modify the template, not the file itself:
  * chrome/content/blogmark/contents.rdf is generated from chrome/content/blogmark/contents.rdf.tpl.xml
  * chrome/content/blogmark/about.xul is generated from chrome/content/blogmark/about.xul.tpl.xml
  * install.rdf is generated from install.rdf.tpl.xml


You can build the extension with
```
ant 
```

This will generate the XPI file. Install it in Firefox and test the extension.

## Generate a patch ##

If your satisfied with your modifications, you can now generate a diff file
```
svn diff blogmark-_1234.diff
```
where _1234_ is the number of the issue you have been working on.