// JSON url
// let dataURL = 'Sample-Data.json';
let dataURL = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5137228a-56b7-4a42-870f-c4a170b21b3b/Sample-Data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210428T134200Z&X-Amz-Expires=86400&X-Amz-Signature=7387e25c0667fd0b16be3d32852ee2613f659ecf13446fc26cb664f21c02c296&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Sample-Data.json%22';

// Gets data from url and return array with events
function getData(url) {
    var request = new XMLHttpRequest();

    request.open('GET', url, false);
    request.send(null);

    if (request.status == 200) {
        return JSON.parse(request.responseText);
    }

    return false;
}

// Prints table with events
function getTable(data) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('thead');

    // Table header
    thead.innerHTML = `<thead>
            <td class="px-4 py-2 border-r">id</td>
            <td class="px-4 py-2 border-r">title</td>
            <td class="px-4 py-2 border-r">start date</td>
            <td class="px-4 py-2 border-r">end date</td>
            <td class="px-4 py-2 border-r">checkin count</td>
            <td class="px-4 py-2 border-r">total attendees</td>
            <td class="px-4 py-2 border-r">total revenue</td>
            <td class="px-4 py-2 border-r">total tickets sold</td>
            <td class="px-4 py-2">status</td>
        </thead>`;

    table.appendChild(thead);
    table.appendChild(tbody);

    // Table rows
    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        let tr = document.createElement('tr');

        tr.innerHTML = `<td class="border border-l-0 px-4 py-2">${item.id}</td>
            <td class="border border-l-0 px-4 py-2">${item.title}</td>
            <td class="border border-l-0 px-4 py-2">${item.start_date}</td>
            <td class="border border-l-0 px-4 py-2">${item.end_date}</td>
            <td class="border border-l-0 px-4 py-2">${item.checkin_count}</td>
            <td class="border border-l-0 px-4 py-2">${item.total_attendees}</td>
            <td class="border border-l-0 px-4 py-2">${item.total_revenue}</td>
            <td class="border border-l-0 px-4 py-2">${item.total_tickets_sold}</td>
            <td class="border border-l-0 px-4 py-2">${item.status}</td>`;

        tbody.appendChild(tr);
    }

    return table;
}

// All Published Events
function getAllEvents(data) {
    return data;
}

// All Events with over 100 total_attendees and over 50 checkin_count
function getEventsOver100(data) {
    let filteredData = data.filter(function (item) {
        return item.total_attendees > 100 && item.checkin_count > 50;
    });

    return filteredData;
}

// All Events with between 900.00 and 2000.00 in total_revenue
function getEvents900and2000(data) {
    let filteredData = data.filter(function (item) {
        return item.total_revenue > 900 && item.total_revenue < 2000;
    });

    return filteredData;
}

// All Events with a start_date in since Jan 1, 2019
function getEventsSinceJan(data) {
    let filteredData = data.filter(function (item) {
        let eventDate = new Date(item.start_date);
        let date = new Date(2019, 0, 1);

        return eventDate >= date;
    });

    return filteredData;
}





// Document is ready, main program
function ready() {
    let data = getData(dataURL);

    // if div#content exists, show a table
    if (document.getElementById('content')) {
        document.getElementById('content').insertAdjacentHTML('beforeend', '<div class="card-header">All Published Events</div>');
        document.getElementById('content').append(getTable(getAllEvents(data.results)));
    }

    // if div#content-1 exists, show a table
    if (document.getElementById('content-1')) {
        document.getElementById('content-1').insertAdjacentHTML('beforeend', '<div class="card-header">All Events with over 100 total_attendees and over 50 checkin_count</div>');
        document.getElementById('content-1').append(getTable(getEventsOver100(data.results)));
    }

    // if div#content-2 exists, show a table
    if (document.getElementById('content-2')) {
        document.getElementById('content-2').insertAdjacentHTML('beforeend', '<div class="card-header">All Events with between 900.00 and 2000.00 in total_revenue</div>');
        document.getElementById('content-2').append(getTable(getEvents900and2000(data.results)));
    }

    // if div#content-3 exists, show a table
    if (document.getElementById('content-3')) {
        document.getElementById('content-3').insertAdjacentHTML('beforeend', '<div class="card-header">All Events with a start_date in since Jan 1, 2019</div>');
        document.getElementById('content-3').append(getTable(getEventsSinceJan(data.results)));
    }
}

document.addEventListener("DOMContentLoaded", ready);