document.addEventListener("DOMContentLoaded", loadListings);
document.getElementById("listingForm").addEventListener("submit", saveListing);

function saveListing(e) {
  e.preventDefault();
  let listings = JSON.parse(localStorage.getItem("realEstateListings")) || [];

  const listing = {
    type: document.getElementById("type").value,
    owner: document.getElementById("owner").value,
    address: document.getElementById("address").value,
    location: document.getElementById("location").value,
    sqft: document.getElementById("sqft").value,
    rate: document.getElementById("rate").value,
    contact: document.getElementById("contact").value,
    image: document.getElementById("image").value,
    contacted: false,
    sold: false,
    followUps: 0
  };

  const editIndex = document.getElementById("editIndex").value;
  if (editIndex) {
    listings[editIndex] = listing;
    document.getElementById("editIndex").value = "";
  } else {
    listings.push(listing);
  }

  localStorage.setItem("realEstateListings", JSON.stringify(listings));
  document.getElementById("listingForm").reset();
  loadListings();
}

function loadListings() {
  const container = document.getElementById("listingsContainer");
  container.innerHTML = "";
  const listings = JSON.parse(localStorage.getItem("realEstateListings")) || [];

  listings.forEach((listing, index) => {
    const card = document.createElement("div");
    card.className = "card";

    if (listing.image) {
      card.innerHTML += `<img src="${listing.image}" alt="Property Image" />`;
    }

    card.innerHTML += `
      <p>
        <span class="badge ${listing.type}">${listing.type.toUpperCase()}</span> 
        Owner: ${listing.owner}
      </p>
      <p>${listing.address}, ${listing.location}</p>
      <p>Area: ${listing.sqft} sqft | ₹${listing.rate}/sqft</p>
      <p>Contact: ${listing.contact}</p>
      <p>Status: 
        ${listing.sold ? '<span class="badge">Sold</span>' : ''}
        ${listing.contacted ? '<span class="badge">Contacted</span>' : ''}
        <span class="badge">Follow-ups: ${listing.followUps}</span>
      </p>
      <div class="card-actions">
        <button onclick="editListing(${index})">✏️ Edit</button>
        <button onclick="deleteListing(${index})">🗑️ Delete</button>
        <button onclick="markContacted(${index})">📞 Mark Contacted</button>
        <button onclick="followUp(${index})">🔁 Add Follow-up</button>
        <button onclick="markSold(${index})">✅ Mark Sold</button>
        <a href="https://wa.me/91${listing.contact}" target="_blank">
          <button>💬 WhatsApp</button>
        </a>
        <a href="tel:${listing.contact}">
          <button>📱 Call</button>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

function editListing(index) {
  const listings = JSON.parse(localStorage.getItem("realEstateListings"));
  const l = listings[index];
  document.getElementById("editIndex").value = index;
  document.getElementById("type").value = l.type;
  document.getElementById("owner").value = l.owner;
  document.getElementById("address").value = l.address;
  document.getElementById("location").value = l.location;
  document.getElementById("sqft").value = l.sqft;
  document.getElementById("rate").value = l.rate;
  document.getElementById("contact").value = l.contact;
  document.getElementById("image").value = l.image;
}

function deleteListing(index) {
  let listings = JSON.parse(localStorage.getItem("realEstateListings"));
  listings.splice(index, 1);
  localStorage.setItem("realEstateListings", JSON.stringify(listings));
  loadListings();
}

function markContacted(index) {
  let listings = JSON.parse(localStorage.getItem("realEstateListings"));
  listings[index].contacted = true;
  localStorage.setItem("realEstateListings", JSON.stringify(listings));
  loadListings();
}

function markSold(index) {
  let listings = JSON.parse(localStorage.getItem("realEstateListings"));
  listings[index].sold = true;
  localStorage.setItem("realEstateListings", JSON.stringify(listings));
  loadListings();
}

function followUp(index) {
  let listings = JSON.parse(localStorage.getItem("realEstateListings"));
  listings[index].followUps += 1;
  localStorage.setItem("realEstateListings", JSON.stringify(listings));
  loadListings();
}