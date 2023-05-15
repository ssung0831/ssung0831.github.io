const nav = document.querySelector('nav');

let loggedIn = false;

  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === 'loggedIn' && cookie[1] === 'true') {
      loggedIn = true;
    }
    }

console.log(document.cookie);
console.log(loggedIn);

if (loggedIn) {
  nav.innerHTML = `
    <h1>SalTickets</h1>
    <ul>
      <li><a href="/Assignment4/index/index.html">Home</a></li>
      <li><a href="/Assignment4/favorites/favorites.html">Favorites</a></li>
      <li><a href="/Assignment4/wallet/wallet.html">Wallet</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  `;
} else {
  nav.innerHTML = `
    <h1>SalTickets</h1>
    <ul>
      <li><a href="/Assignment4/index/index.html">Home</a></li>
      <li><a href="/Assignment4/login/login.html">Login/Sign Up</a></li>
    </ul>
  `;
}



if(loggedIn){
const logoutBtn = document.querySelector('a[href="#"]');


logoutBtn.addEventListener('click', function() {
	console.log("clicklogout");
  document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log(document.cookie);
    window.location.href = "/Assignment4/index/index.html";
});
}


const submitButton = document.querySelector('#searchButton');
const tableContainer = document.querySelector('#searchResults');
const eventContainer = document.querySelector('#details');

submitButton.addEventListener('click', e => {
	e.preventDefault();
	const keyword = encodeURIComponent(document.querySelector('#keyword').value);
	const location = encodeURIComponent(document.querySelector('#location').value);
	const url = `https://us-west2-csci201-376723.cloudfunctions.net/explore-events/search?keyword=${keyword}&city=${location}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const events = data;
			const table = document.createElement('table');
			const tableHeader = `
				<tr>
					<th>Date</th>
					<th>Icon</th>
					<th>Event</th>
					<th>Venue</th>
				</tr>
			`;
			table.innerHTML = tableHeader;

			events.forEach(event => {
				const tableRow = document.createElement('tr');
				tableRow.innerHTML = `
					<td>${event.localDate}</td>
					<td><img src="${event.images}"></td>
					<td>${event.name}</td>
					<td>${event.venue}</td>
				`;

				if(loggedIn){
				tableRow.addEventListener('click', () => {
					console.log("tyler");
					console.log(event.id);
					displayEventID(event.eventId); 
				});
				}

				table.appendChild(tableRow);
			});

			tableContainer.innerHTML = '';
			tableContainer.appendChild(table);
			
			document.getElementById('details').style.display = 'block';
			 document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth' });
			})
			.catch(error => {
			console.error(error);
			});
});


function toggleStar(event, name) {
	const star = document.getElementById("star");
	console.log(star);
	
	if(star.className == "far fa-star"){
	star.className = 'fas fa-star';	
	 alert(`Added ${name} to favorites`);
	}
	else{
		star.className = "far fa-star";
		alert ("Removed from favorites");
	}
	
console.log("hi");
 // icon.classList.toggle('golden-star');

}

function displaymessage(value, name){
	console.log('hey');
	
	if(value <= 0){
		alert("FAILED: Purchase not Possible");
	}
	else{
	alert(`Bought ${value} ${name} tickets`);
	}
}

function displayEventID(idnum) {
	

  const eventDetailsUrl = `https://us-west2-csci201-376723.cloudfunctions.net/explore-events/eventDetail/${idnum}`;
  console.log(eventDetailsUrl);
  fetch(eventDetailsUrl)
    .then(response => response.json())
    .then(data => {
      
      eventContainer.innerHTML = `
        <div class="event-container">
          <div class="event-title" style = text-align: inline;">
            <div style="margin-left: 10%; margin-right: 5px; text-align: center;">${data.event.name} </div>
           <i  class="far fa-star" id = "star" onclick="toggleStar(this,'${data.event.name}' )"></i>
          </div>
          <div class="event-info">
            <div class="left-info">
              <p>Date</p>
              <p class="actual">${data.date.localDate} ${data.date.localTime}</p>
              <p>Venue</p>
              <p class="actual">${data.event.venue}</p>      
              <p>Price Range</p>
             <p class="actual">
  			${data.price.min !== -1 ? `$${data.price.min} - $${data.price.max}` : "N/A"}
			</p>
              <p>More Info</p>
			  <p class="actual"><a href="${data.event.url}" target="_blank" style="padding: 0;">TicketMaster</a></p>
            </div>
            <div class="right-info">
           <p class="tickets">Quantity of Tickets to Purchase <input type="number" value="" id="ticketQuantity"></p>
<button id="purchaseButton" ${data.price.min !== -1 ? `onclick="displaymessage(document.getElementById('ticketQuantity').value, '${data.event.name}')"` : "disabled"}>PURCHASE</button>

            </div>
          </div>
        </div>
      `;
      
      document.getElementById('details').scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
      console.error(error);
    });
   
    

}
