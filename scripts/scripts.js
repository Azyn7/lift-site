let fileName = getCurrentFileName();
let width = screen.width;
$('document').ready(function() {
    setTimeout(() => {
        AOS.init();
    }, 120);

    getNavbar();
    getTeam();
});

function getCurrentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

// used to take up less space on html pages, creates proper navbar.
function getNavbar() {
    let active;
    console.log(fileName);
    if (fileName === "index.html") {
        active = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./pages/team.html">Meet The Team</a>
            </li>
        `
    } else if (fileName === "team.html") {
        active = `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="../index.html">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="#">Meet The Team</a>
            </li>
        `
    }

    let navbar = `
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../styles/images/logos/lift-logo.png" alt="" width="100" height="85"></img>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="nav-list">
            </div>
        </div>
    `


    $("#nav-bar").html(navbar);
    $("#nav-list").html(active);
}

// fetchs content from team.json and loads it to team.html
function getTeam() {
    fetch("../lib/team.json")
        .then(response => response.json())
        .then (data => {
            const container = $("#the-team-content");
            let count = 0;

            data.forEach(section => {
                let content = "";
                const name = data[count].name; 
                const offers = data[count].offers;
                const desc = data[count].desc;
                const insta = data[count].insta;
                const booking = data[count].book;
                const img = data[count].img;

                content += `
                    <div class="row team-member-bio mt-5" data-aos="fade-up">
                        <div class="col-xl-6">
                            <div class="team-content">
                                <h2>${name}</h2>
                                <p>Offers: ${offers}</p>
                                <p>${desc}</p>
                                <p>
                                    <a target="_blank" href="${insta}" alt="Headshot of Alicia Allen"><i class="bi bi-instagram" style="font-size: 40px;"></i></a>
                                    <br>
                                    <button class="btn team-btn" onclick="window.open('${booking}','_blank')"><strong>BOOK</strong></button>
                                </p>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <img src="${img}" class="img-fluid team-img">
                        </div>
                    </div>  
                `;

                container.append(content);
                count++;
            });
        });
}