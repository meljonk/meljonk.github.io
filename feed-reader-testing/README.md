## Project Overview
In this project, you will be learning about testing with Javascript. Testing is an important part of the development process and many organizations practice a standard known as "test-driven development" or TDD. This is when developers write tests first, before they ever start developing their application. You are given a web-based application that reads RSS feeds and will learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.

## Rubric
Review the Feed Reader Testing [Project Rubric](https://review.udacity.com/#!/projects/3442558598/rubric)

## To Run
- Download the files
- Launch index.html file in your web browser of choice.
- To test the specs and make them fail follow the steps below for each test case:

**RSS feeds**
- are toBeDefined spec - comment out the contents of the allFeeds array in app.js
- have defined and valid URLs spec - comment out a url in allFeeds array in app.js
- have defined feed names spec - comment out a feed name in allFeeds array in app.js

**The Menu**
- is hidden by default spec - delete class="menu-hidden" in index.html
- changes visibility when the menu icon is clicked spec - comment out the menu.icon function in app.js

**Initial Entries**
- has at least one spec - comment out the first feed in allFeeds array in app.js

**New Feed selection**
- content changes spec - change the first 2 entries in the allFeeds array in app.js to have the same feed name and URL info

Return your changes to the original state to pass all specs again.

## Resources & References Used
[Jasmine documentation](https://jasmine.github.io/2.1/introduction)  
[Udacity forum](https://discussions.udacity.com/c/nd001-feed-reader-testing)  
