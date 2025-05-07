
let btn = document.querySelector("button")
let usernameinp = document.querySelector("#usernameInput")
let card = document.querySelector(".card")
let repocard = document.querySelector(".repocard")

function getprofiledata(username) {
    return fetch(`https://api.github.com/users/${username}`).then(function (raw) {
        if (!raw.ok) throw new Error("user not found")
        return raw.json();
    })
}


function getrepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`).then(function (raw) {
        if (!raw.ok) throw new Error("repos not found")
        return raw.json();
    })
}


function profiledata(details) {
    let html = ` <div id="profileCardContainer" class="space-y-6">
            <div class="flex flex-col items-center text-center space-y-4">
              <img
                src="${details.avatar_url}"
                alt="User Avatar"
                class="w-28 h-28 rounded-full shadow-md border-4 border-white"
              />
              <h2 class="text-2xl font-semibold text-gray-900">${details.name ? details.name : ""}</h2>
              <p class="text-gray-600 max-w-sm">
               ${details.bio ? details.bio : ""}
              </p>
              <div class="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div class="bg-white/90 shadow p-2 rounded-lg w-24">
                  <p class="font-semibold text-lg"> ${details.public_repos ? details.public_repos : ""}</p>
                  <p class="text-xs"> Repos</p>
                </div>
                <div class="bg-white/90 shadow p-2 rounded-lg w-24">
                  <p class="font-semibold text-lg"> ${details.followers}</p>
                  <p class="text-xs">Follower</p>
                </div>
                <div class="bg-white/90 shadow p-2 rounded-lg w-24">
                  <p class="font-semibold text-lg">${details.following}</p>
                  <p class="text-xs">Following </p>
                </div>
              </div>
            </div>`

    card.innerHTML = html
}


function reposdata(repo){
  let html =          `  <div class="mt-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                Top Repositories
              </h3>
              <ul class="space-y-3">
                <li class="bg-gray-50 p-4 rounded shadow border">
                  <a
                    href=""
                    class="text-blue-600 font-medium hover:underline"
                    target="_blank"
                  >
                   ${repo[0].name}
                  </a>
                  <p class="text-sm text-gray-600">
                  ${repo[0].description ? repo[0].description : "no description"}
                  </p>
                </li>
                <li class="bg-gray-50 p-4 rounded shadow border">
                  <a
                    href="#"
                    class="text-blue-600 font-medium hover:underline"
                    target="_blank"
                  >
                    ${repo[1].name}
                  </a>
                  <p class="text-sm text-gray-600">
                   ${repo[1].description ? repo[1].description : "no description"}
                  </p>
                </li>
                <li class="bg-gray-50 p-4 rounded shadow border">
                  <a
                    href="#"
                    class="text-blue-600 font-medium hover:underline"
                    target="_blank"
                  >
                  ${repo[2].name}
                  </a>
                  <p class="text-sm text-gray-600">
                   ${repo[2].description ? repo[2].description : "no description"}
                  </p>
                </li>
              </ul>
            </div>
            
  
            
`
repocard.innerHTML = html
}






btn.addEventListener("click", function (event) {
    event.preventDefault();
    let username = usernameinp.value.trim()
    if (username.length > 0) {
        getprofiledata(username).then(function (data) {
            profiledata(data)
            console.log(data)


            getrepos(username).then(function (repos) {
                reposdata(repos)
                console.log(repos);

         

            })
        })
    }


})