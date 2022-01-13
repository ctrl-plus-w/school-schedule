# School Schedule Projet

## Introduction

Welcome on the main page of my school schedule app. The main goal of this app is to make easier for professors to tells theirs students when they have online classes during the lockdown.

## Origins

As I said before the goal is to make easier for professors to communicate the online classes to their students, this idea came to me at the beggining of the lockdown (in France). The way they inform us is through a word document online with a table. And this is chaotic, the array does't fit on one page, so you need to scroll, the professors make mistakes and more...

## My goal

I started this project only to gain experience because, I think it would be too hard to change the platform. However, in the practical way, the goal is to make two to three dashboards. The first and the most complex, the professor one, displaying a schedule of the next 14 days where the professor could book classes for their student. Because a group of student can have multiple professors and many professord can have many groups, I want to avoid the collisions on the events, a student cannot have two events at the same time, a professor neither. The second dashboard is the student one, where obviously, the studentd could see the classes the have in the next 14 days. And maybe the last dashboard could be for the admins or the managers of my school so I would have to make every admin task from the command line or from php my admin.

# Installation

1. Modify the server url `src/app/database.js`

2. Build the server

```
npm run build
```

3. Start the server

```
server -s build
```
