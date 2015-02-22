# Sparker

### TL;DR

Sparker is a management system for maintaining a library of web application front-end templates (referred to as 
"sparks") via Grunt.  At best, it's a useful tool for managing and trying out different templates for different types 
of web applications.  At worst, it (and the AngularJS application template that comes with it) incorporates a number 
of interesting approaches to certain problems that other developers may find useful.

### Background

This project started with the idea of creating a template for simple CRUD-focused AngularJS web applications 
incorporating techniques from previous projects:  nothing fancy, just something that I could copy to a new directory 
and start customizing, and something I could share with other developers.  Part of the plan was to also create one 
or more Grunt tasks to create application builds for particular environments.

As I was building the Angular template, I came up with an idea for restricting user access to certain views in the application via a naming convention for the view routes.  The technique seemed like it warranted a demonstration, but I didn't want to pollute my template with mock user data that would have to be removed from the template when I started building on top of it, so I started building a demonstration version of the template.  It occurred to me that I could package both the plain template and the demo version of the template together, and provide a means of switching between the two (moving the code for each in and out of a single web directory) via Grunt.

From there, it wasn't a huge leap to the idea of building a system to maintain multiple templates, different approaches for different use cases.  Sparker is the end result of that line of thought.

Do I expect Sparker to become a popular tool for jump-starting the creation the web application front-ends?  Not really: there are already very robust tools for scaffolding new web applications like Yeoman or Express.js.  If you're already comfortably using tools like that you shouldn't bother investigating Sparker as an alternative, not unless you're looking for something more simplistic and less opinionated.

That being said, I have no regrets about spending the time creating it.  I learned a lot (especially about Grunt) during the process.  I can apply some of what I learned elsewhere, and hopefully other developers can learn something from it to.  That's where the Sparker name comes from:  the hope that the code involved sparks other ideas in other developers.


### More Information

You can read more about the more interesting parts of Sparker and the included "first" spark by reading 
the **_docs/index.html_** and **_sparks/first/docs/index.html_** files respectively.  But some of the highlights:

Demonstrates how to organize Grunt tasks and task options into separate files, and 
how to execute two different sets of task from the same directory/Gruntfile

* A Grunt build task that determines which resource files to concatenate based on the &lt;link&gt; and &lt;script&gt; tags in your index.html file.

* A technique for executing the login process and running certain sets of Protractor tests based on the user role being tested.

* Convention-based Angular routes for restricting user access based on authentication state/user roles.

* Example of mocking REST calls within a demo Angular application using the ngMockE2E module.

* Examples of Angular unit tests and Protractor tests that utilize page objects.

