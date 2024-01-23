# Github Repository Listing Page

A web page that displays the public Github repositories belonging to any specific user.




## API Reference

https://docs.github.com/en/rest?apiVersion=2022-11-28

#### List all users

```http
  GET /users
```
url endpoint:

```http
  "https://github.com/users"
```


#### Get a user

```http
  GET /users/{username}
```
url endpoint:

```http
  "https://github.com/users/mojombo"
```
response


fields used in web page

```
login
name
location
html_url
bio
twitter_username
followers
following
```

#### Get repositories of a user
```http
  GET /{username}/repos
```
url endpoint:

```http
  "https://github.com/mojombo/repos"
```
fields used from response
```http
  name
  description
  language
```
#### Search Repositories by name
```http
  GET /search/repositories?q={user}/{query}
```
url endpoint:

```http
  "https://api.github.com/search/repositories?q=mojombo/asteroids"
```
response: list of all repository having the word "asteroids" in their name

#### Pagination
```http
  GET /repos?per_page={repos_per_page}&&page={currPage}
```
url endpoint:

```http
  "https://api.github.com/repos?per_page=10&&page=3"
```
return 3rd page with 10 repositories or skipping first 20 pages, showing next 10 pages












## Features

- Profile Information
- Search Box
- Pagination
- Easy navigation to other pages


## Deployment

To deploy this project on your computer

1. Setting up your environment
As you get started you can choose to run the project locally on your computer using a text editor such as [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=academic-77807-sagibbon).
  
2. Clone the repository
i) Create a GitHub folder in your local machine.

ii) Open Visual Studio Code.
From top nav menu, select View and then select Terminal. The terminal view appears in the bottom of the Visual Studio Code screen.

iii) In the Terminal view, run the command to change directory (cd) to the GitHub folder you created for repositories.

```
cd C:\GitHub
```
iv) Run the following command to clone the repository:

```
git clone https://github.com/GreatGayatri/Github-Repository-Listing-Page.git
```
v) Press Enter to create your local clone.

3. Open the folder in Visual Studio Code. You can do this by clicking File > Open Folder and selecting the folder you just cloned.

Recommended Visual Studio Code extensions:

Live Server - to preview HTML pages within Visual Studio Code.

Copilot - to help you write code faster






## Acknowledgements

 - [Bootstrap Icons](https://icons.getbootstrap.com/)
 - [Github Rest API](https://docs.github.com/en/rest?apiVersion=2022-11-28)
 - [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
 


## Assumption
Since the topics array of every repository of every user was empty.
So instead of topics, language used in the repository is shown in the blue box.

```
   {   .
       .
       .
       .
        "language": "Ruby",
        "topics": [],
       .
       .
       .
       .

    }
```
