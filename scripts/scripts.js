$('document').ready(function () {
    setTimeout(() => {
        AOS.init();
    }, 120);

    //getNavbar(); //deprecated
    loadSchedule();
    getTeam();

});

let time_schedule = [
    {
        "day": "DAY",
        "hours": "HOURS"
    },
    {
        "day": "SUNDAY",
        "hours": "CLOSED"
    },
    {
        "day": "MONDAY",
        "hours": "CLOSED"
    },
    {
        "day": "TUESDAY",
        "hours": "9AM - 3PM"
    },
    {
        "day": "WEDNESDAY",
        "hours": "10AM - 6PM"
    },
    {
        "day": "THURSDAY",
        "hours": "9AM - 3PM"
    },
    {
        "day": "FRIDAY",
        "hours": "10AM - 6PM"
    },
    {
        "day": "SATURDAY",
        "hours": "APPOINTMENT ONLY"
    }
];
function loadSchedule() {
    /**
     * [Creates the time schedule displayed on index.html using the above object.]
     */
    let table = "<table>";
    for (let i = 0; i < time_schedule.length; i++) {
        var schedule = time_schedule[i];
        // if first entry, create the head
        if (i == 0) {
            table += `
                <thead>
                    <th>${schedule.day}</th>
                    <th>${schedule.hours}</th>
                </thead>
            `;
        } else {
            table += `
                <tr>
                    <td>${schedule.day}</td>
                    <td>${schedule.hours}</td>
                </tr>
            `;
        }
    }
    table += `</table>`;
    $("#time-schedule").append(table);
}

function getTeam() {
    /**
     * [Loads the info from teams.json into dynamically created cards for creation on teams.html]
     */
    fetch("../lib/team.json")
        .then(response => response.json())
        .then(data => {
            const container = $("#the-team-content");
            let index = 0;

            data.forEach(section => {
                let info = data[index]
                // creates the list of offers
                let offer_list = "";
                for (let i = 0; i < info.offers.length; i++) {
                    offer_list += `<li>${info.offers[i].service}</li>`
                }

                // creates the card
                let content = `
                    <div class="row team-member-bio mt-5" data-aos="fade-up">
                        <div class="col-xl-6">
                            <div class="team-content">
                                <h2>${info.name}</h2>
                                <p>Offers:</p>
                                <ul>${offer_list}</ul>
                                <p>${info.desc}</p>
                                <p>
                                    
                                    <button class="btn team-btn" onclick="window.open('${info.book}','_blank')"><strong>BOOK</strong></button>
                                </p>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <img src="${info.img}" class="img-fluid team-img">
                        </div>
                    </div>  
                `;

                // add the below comment just above the button to add back in the dedicated instagram links.
                // <a target="_blank" href="${info.insta}" alt="Headshot of Alicia Allen"><i class="bi bi-instagram" style="font-size: 40px;"></i></a><br>

                container.append(content);
                index++;
            });
        });
}