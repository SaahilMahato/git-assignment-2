// api to get repo data provided by github
let url = "https://api.github.com/users/SaahilMahato/repos"

// function to fetch data and call renderTable function
async function getData(url) {
    fetch(url, {method: 'GET', headers:{}}) // fetch
    .then(response => response.json()) // get json from response
    .then(data => renderTable(data)) // call renderTable function and pass the json as argument
}

getData(url); // call the getData function 

// renderTable function formats the data and renders the table 
function renderTable(data) {

    // variables that need to be displayed on the table
    let desc, sn, assignment_title, source_code, hosted_link, topic;
    let table_data = []; // array to store the table content
    

    let row_num = 1; // to be assigned to S.N and displayed on the table
    for(let i=0; i<data.length; ++i) {
        desc = data[i].description;
        if (desc) // if description is present and not null
            if(desc.includes("leapfrog-assignment")) {
                // assign variables data to be stored in table
                sn = row_num;
                assignment_title = data[i].name;
                source_code = data[i].html_url;
                hosted_link = "https://saahilmahato.github.io/" + assignment_title + "/";
                topic = desc.split(" ")[1];

                table_data.push([sn, assignment_title, source_code, hosted_link, topic]); // create array of the data and push to table
                ++row_num; // increase row count by 1 after inserting
            }
    }

    table = document.getElementById("assignment-table"); // get table

    for(let row of table_data) { // for each row in table data

        let r = table.insertRow(row[0]); // create a new row at position sn or row_num

        // if sn is even assign class even-row and vice-versa
        if(row[0]%2 == 0)
            r.classList.add('even-row');
        else
            r.classList.add('odd-row');

        let sn_cell = r.insertCell(0); // insert new cell in row at postion 0
        sn_cell.innerHTML = row[0]; // insert html text
        sn_cell.classList.add('sn-col'); // add class

        let title_cell = r.insertCell(1); // insert new cell in row at position 1
        title_cell.innerHTML = row[1]; // insert html text
        title_cell.classList.add('title-col'); // add class

        let code_cell = r.insertCell(2); // insert new cell in row at position 2
        let code_link = document.createElement("a"); // create an anchor tag
        code_link.innerHTML = "Link to Source"; // add inner text to anchor tag
        code_link.href = row[2]; // add href attribute to anchor tag
        code_link.target = "_blank"; // add target attribute to anchor tag
        code_cell.appendChild(code_link); // add anchor element to cell
        code_cell.classList.add('code-col'); // add class
 
        let demo_cell = r.insertCell(3); // insert new cell in row at position 3
        let demo_link = document.createElement("a"); // create an anchor element
        demo_link.innerHTML = "Link to Demo"; // add inner text to anchor element
        demo_link.href = row[3]; // add href attribute to anchor tag
        demo_link.target = "_blank"; // add target attribute to anchor tag
        demo_cell.appendChild(demo_link); // add anchor element to cell
        demo_cell.classList.add('demo-col'); // add class

        let topic_cell = r.insertCell(4); // insert new cell at position 3
        let topic_icon = document.createElement("img"); // create an img element
        // assign logo and topic text based on the topic
        if (row[4] === "Git") {
            topic_icon.src = "./assets/git-logo.png";
            topic_icon.alt = "git logo";
        }
        let topic_span = document.createElement("span"); // create a span element
        topic_span.innerHTML = row[4]; // add innertext to span
        topic_cell.appendChild(topic_icon); // add icon to cell
        topic_cell.appendChild(topic_span); // add text to cell
        topic_cell.classList.add('topic-col'); // add class
        
    }
}


