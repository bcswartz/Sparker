# Sparker

### What is Sparker?

Sparker is a management system for maintaining a library of web application front-end templates (referred to as 
"sparks") via Grunt.

### Background

This project started with the idea of creating a template for simple CRUD-focused AngularJS web applications 
incorporating techniques from previous projects:  nothing fancy, just a codebase that I could copy to a new directory 
and start customizing, and something I could share with other developers.  Part of the plan was to also create one 
or more Grunt tasks to create application builds for particular environments.

As I was building the Angular template, I came up with an idea for restricting user access to certain views in the application via a naming convention for the view routes.  The technique seemed like it warranted a demonstration, but I didn't want to pollute my codebase with mock user data that would have to be removed from the template when I started building on top of it, so I started building a demonstration version of the template.  It occurred to me that I could package both the plain template and the demo version of the codebase together, and provide a means of switching between the two (moving the code for each in and out of a single web directory) via Grunt.

From there, it wasn't a huge leap to the idea of building a system to maintain multiple codebases, different approaches for different use cases.  Sparker is the end result of that line of thought.

I decided on the Sparker name for two reasons:

* I didn't want to use terms like "templates", "scaffolds", or "foundations" for the web application codebases housed in the project (partly because Sparker encourages creating demo codebases to accompany the "clean slate" template codebases).  So the codebases are organized into "sparks" and Sparker is the tool for managing them.

* I wanted to focus on the inspirational aspect of the project:  that, if nothing else, the techniques in the sparks and in Sparker could "spark" ideas in other developers for how to approach certain problems. 

Do I expect Sparker to become a popular tool for jump-starting the creation the web application front-ends?  Not really: there are already very robust tools for scaffolding new web applications like Yeoman or Express.js.  At the end of the day, I see Sparker as a functional proof-of-concept, something individuals or particular teams can play around with or use in their shops to maintain and build off of their own codebase libraries, but not something adopted for widespread use by the developer community.

But it was fun to develop, and I think there's value in sharing it.

### Getting Started

To start using or exploring Sparker, simply download and unzip Sparker into a web-accessible directory.  Sparker is pre-loaded with the demo version of the included "first" spark located in the **_app_** directory, ready to run.  The documentation for Sparker is in the **_docs/index.html_** file, while the documentation for the "first" spark" is in **_sparks/first/docs/index.html_** (there are included Grunt tasks for opening/navigating to both sets of documentation as well).

### Feature Highlights

The documentation files cover the interesting parts of Sparker and the included "first" spark in some detail, but here are some of the highlights:

* Demonstrates how to organize Grunt tasks and task options into separate files, and 
how to execute two different sets of tasks from the same directory/Gruntfile.

* A Grunt build task that determines which resource files to concatenate based on the &lt;link&gt; and &lt;script&gt; tags in your index.html file.

* A technique for executing the login process and running certain sets of Protractor tests based on the user role being tested.

* Convention-based Angular routes for restricting user access based on authentication state/user roles.

* Example of mocking REST calls within a demo Angular application using the ngMockE2E module.

* Examples of Angular unit tests and Protractor tests that utilize page objects.

