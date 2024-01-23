const url = "https://api.github.com/users/";
const token = "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";

const Name = document.getElementById("name");
const loginName = document.getElementById("login");
const Bio = document.getElementById("bio");
const Location = document.getElementById("location");
const Followers = document.getElementById("followers");
const Following = document.getElementById("following");
const Twitter = document.getElementById("twitter");
const PhotoDiv = document.getElementById("photo");
const Link = document.getElementById("link");
const content = document.querySelector(".show-content");
const gridContainer = document.querySelector(".grid-container");
const PageNum = document.querySelector(".page-num");

const user = "mojombo";

var pages = 0;
const repos_per_page = 10;
var currPage = 1;


const fetchProfileInfo = async () => {
    const data = await fetch(url + user, {
        headers: {'Authorization': `Bearer ${token}`}
      });
    const response = await data.json();
    PhotoDiv.innerHTML = `<img src = ${response.avatar_url}></img>`;
    Name.innerHTML = response.name;
    loginName.innerHTML = response.login;
    Followers.innerHTML = `${response.followers} followers`;
    Following.innerHTML = `${response.following} following`;
    Bio.innerHTML = response.bio;
    Location.innerHTML = response.location;
    if(response.twitter_username){
        Twitter.innerHTML = `Twitter: <a href = https://twitter.com/${response.twitter_username}>https://twitter.com/${response.twitter_username}</a>`;
    }
    Link.innerHTML = `<a href = ${response.html_url}>${response.html_url}</a>`;
}

const showPagination = (result)  => {
    pages = Math.ceil(result.length/repos_per_page);
    console.log(pages);
    // console.log(response.length);

    document.querySelector('.prev').disabled = "true";
    document.querySelector('.prev').style.color = "grey";

    PageNum.innerHTML = "";

    if(pages <= 1 ){
        document.querySelector('.prev').style.display = "none";
        document.querySelector('.next').style.display = "none";
    }

    else{
        document.querySelector('.prev').style.display = "block";
        document.querySelector('.next').style.display = "block";
        for(var i = 1; i <= pages; i++){
            const pageOption = document.createElement('li');
            pageOption.classList.add("numb");
            pageOption.classList.add(`page${i}`);
            pageOption.innerHTML = `${i}`;
            PageNum.appendChild(pageOption);
        }
        changeCurrPageColor();
    }

}

const calcualtePages = async () => {
    const data = await fetch(url + user + `/repos`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
    const response = await data.json();
    showPagination(response);
}

const changeCurrPageColor = () => {
    for (var i=1; i<= pages; i++){
        const currPageElement = document.querySelector(`.page${i}`);
        if(i == currPage){
            currPageElement.style.backgroundColor = "#0B60B0";
            currPageElement.style.color = "white";
        }
        else{
            currPageElement.style.backgroundColor = "white";
            currPageElement.style.color = "black";
        }
    }
}

const displayButton = () => {
    if(currPage > 1){
        document.querySelector('.prev').disabled = "false";
        document.querySelector('.prev').style.color = "black";
    }
    else if(currPage == 1){
        document.querySelector('.prev').disabled = "true";
        document.querySelector('.prev').style.color = "grey";
    }
    if(currPage < pages){
        document.querySelector('.next').disabled = "false";
        document.querySelector('.next').style.color = "black";
    }
    else if(currPage == pages){
        document.querySelector('.next').disabled = "true";
        document.querySelector('.next').style.color = "grey";
    }
}

const displayRepos = (result) => {
    gridContainer.innerHTML = "";
    content.innerHTML = "";
    if(result.length == 0){
        const noResultMsg = document.createElement('h1');
        noResultMsg.classList.add('not-found-msg');
        noResultMsg.innerHTML = "No Results Found";
        content.appendChild(noResultMsg);
    }

    result.forEach(repo => {
        
        const gridItem = document.createElement('div');
        gridItem.classList.add("grid-item");
        const gridTitle = document.createElement('h2');
        gridTitle.classList.add("title");
        const gridDesc = document.createElement('p');
        gridDesc.classList.add("descr");
        const gridSpan = document.createElement('span');
        gridSpan.classList.add("lang");

        gridTitle.innerHTML = repo.name;
        gridDesc.innerHTML = repo.description;
        gridSpan.innerHTML = repo.language;
        gridItem.appendChild(gridTitle);
        gridItem.appendChild(gridDesc);
        if(repo.language){
            gridItem.appendChild(gridSpan);
        }
        
        gridContainer.appendChild(gridItem);
    });
}

const fetchRepos = async () => {
    const data = await fetch(url + user + `/repos?per_page=${repos_per_page}&&page=${currPage}`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
    const response = await data.json();
    displayRepos(response);

}

fetchProfileInfo();
calcualtePages();
fetchRepos();

const prevBtnFunc = () => {
    // console.log(currPage);
    if(currPage > 1){
        currPage--;
    }
    fetchRepos();
    displayButton();
    changeCurrPageColor();
}

const nextBtnFunc = () => {
    // console.log(currPage);
    if(currPage < pages){
        currPage++;
    }
    fetchRepos();
    displayButton();
    changeCurrPageColor();
}



document.body.addEventListener( 'click', function ( e ) {
    const target = e.target.closest(".numb");
    if(target) {
      currPage = target.innerHTML;
      console.log(currPage);
      fetchRepos();
      displayButton();
      changeCurrPageColor();
    };
} );


const prevButton = document.querySelector(".prev");
prevButton.addEventListener("click", prevBtnFunc, false);


const nextButton = document.querySelector(".next");
nextButton.addEventListener("click", nextBtnFunc, false); 

const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchButton");

//function to search repos
const searchRepos = async (query) => {
    if(query){
        const data = await fetch(`https://api.github.com/search/repositories?q=${user}/${query}`,{
            headers: {'Authorization': `Bearer ${token}`}
        });
        const response = await data.json();
        displayRepos(response.items);
        showPagination(response.items);
    }
    else{
        alert("Enter value to search");
    }
    
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    searchRepos(searchInput);
})

var repoButton = document.querySelector('.show-all');
var mouseOverFunction = function () {
    this.style.color = "#40A2D8"; 
};
var mouseOutFunction = function () {
    this.style.color = "black"; 
};
repoButton.onmouseover = mouseOverFunction;
repoButton.onmouseout = mouseOutFunction;

repoButton.addEventListener('click', () => {
    calcualtePages();
    fetchRepos();
    searchBox.value = "";
});





