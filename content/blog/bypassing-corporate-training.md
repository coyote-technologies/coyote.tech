+++
title = "Bypassing Corporate WBT (Web-based Training)"
description = "How to circumvent most mandatory web-based trainings and reclaim your time"
date = "2024-03-17"
aliases = ["wbt-bypass", "hacking", "security"]
author = "John"
image = "img/corporate_training.jpg"
+++

## Hello [corporate drone], have you completed your annual HR training yet?

Are you a corporate worker-bee beleagured by annual corporate web-based trainings that are mandated by email-job-having, real-estate-side-hustling, human-resource-gestapo that have nothing better to do than prevent you from creating value for the shareholders?

Are you sick and tired of having to spend 1-2 hours **per year** clicking through sexual harassment trainings when you are already highly skilled at sexual harassment? 

It's high time that we circle-back, take a deep dive, and eat our own dog food. I'll show you how **jAvAsCrIpT eNgiNeErs** implement most web-based trainings and their flaws, which should allow you to spend those 1-2 hours per year up-skilling so you can be a serf to the machine overlords when AGI takes over. 

#### In case any of the above was taken seriously by anyone, it was just a joke. You should be nice to your coworkers. You shouldn't, however, be treated like a child and forced to sit through these trainings.

The gist of this technique is that most implementations of these web-based trainings (like those found in popular tools like Workday, etc.) are implementations of the SCORM [Sharable Content Object Reference Model](https://en.wikipedia.org/wiki/Sharable_Content_Object_Reference_Model) which is an open set of standards for implementing things like WBTs. ([SCORM docs here](https://scorm.com/scorm-explained/technical-scorm/scorm-12-overview-for-developers/)).  

What most of these implementations fail to do, however, is server-side validation of any kind. Since we as the client have access to everything that is running in our browsers, this is a huge oversight. 

Prerequisites/Assumed Knowledge:

1. Familiarity with browser development tools
2. Basic understanding of the javascript debugger

The SCORM standard guarantees the following functions are available to us in every implementation:

```javascript
LMSInitialize()
LMSFinish()
LMSGetValue()
LMSSetValue()
LMSCommit()
LMSGetLastError()
LMSGetErrorString()
LMSGetDiagnostic()
```

We are going to be using `LMSSetValue()` and `LMSFinish()`.

#### Step 1

Open your target WBT in your browser of choice, open the Developer tools, and search the sources for a file labeled `scormdriver.js` or something similar.

This is the file that contains the SCORM implementation. 

#### Step 2

Use the javascript debugger to add a breakpoint in the `scormdriver.js` file, usually on the `debugLog()` function. This will pause execution when the breakpoint is triggered (often), and bring the SCORM object into scope in the browser console where we can manipulate it.

#### Step 3

Once execution is paused, you should be able to go the browser console and access the SCORM object. We can now find the SCORM object in the console and manipulate it, it will be named differently depending on the specific implementation, but if you look around you should find it.

Something like one of the following:

```javascript
SCORM_2004.LMSGetValue("cmi.core.lesson_status")
SCORM.LMSGetValue("cmi.core.lesson_status")
currentlyUsedApi("cmi.core.lesson_status")
```

#### Step 4

Now that we know what the name of our implementation is, we can call the following functions to complete our training (e.g. SCORM_2004):

If the training is graded/scored:

```javascript
SCORM_2004.LMSSetValue("cmi.core.score.raw", 90) // assuming a passing score is 90+ you can put any value here up to 100.
SCORM_2004.LMSSetValue("cmi.core.lesson_status", "completed")
SCORM_2004.LMSFinish()
```

If the training is ungraded

```javascript
SCORM_2004.LMSSetValue("cmi.core.lesson_status", "completed")
SCORM_2004.LMSFinish()
```

#### Step 5

Remove the breakpoint in the debugger and resume execution.

Close the training and revel in your completed status, this whole process should only take a couple of minutes once you figure it out.

Enjoy your newfound freedom!
