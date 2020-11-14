document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getPicture').addEventListener('click', getPicture);
document.getElementById('getCases').addEventListener('click', getCases);
document.getElementById('addContent').addEventListener('submit', addContent);
      
      
function getText() {
  fetch('text.json')
  .then(res => res.json())
  .then(data => {
    let newH2 = `<h2>Curiosity is a virtue. Enjoy the read.</h2>` 
    document.getElementById('h2').innerHTML = newH2;
    document.getElementById('addContent').style="display:none";

    let output = `
      <div class="alert alert-warning mb-4">
        <h4>Human decomposition begins around four minutes after a person dies and follows four stages: 
      autolysis, bloat, active decay, and skeletonization.</h4>
      </div>`;
      
      data.forEach(function (text) {
        output += `
          <div class="card card-body mb-4">
            <h5><b>Stage of decomposition</b>: ${text.stageOfDecomposition}</h5>
              <p><b>Starts</b>: ${text.starts}</p>
              <p><b>Process</b>: ${text.processDescription}</p>
              <p><b>Skin aspect</b>: ${text.skinAspect}</p>
          </div>`
        
        document.getElementById('output').innerHTML = output;
      })
  })
  .catch(error => console.log(error))
}
    
function getPicture() {
 
  let newH2 = `<h2>Seriously, you have sick desires. Here's how you'll look.</h2>`;
  document.getElementById('h2').innerHTML = newH2;
  document.getElementById('addContent').style="display:none";

  let output = `
    <div class="container-fluid d-flex justify-content-center">
      <img src="https://i.pinimg.com/originals/de/1f/ca/de1fca5d8673bda3036b1026700318c5.jpg">
    </div>
  `;
    
    document.getElementById('output').innerHTML = output;
}  

function getCases() {
  fetch('https://api.airtable.com/v0/appaYfkeSMCsMh0Rv/Cases?api_key=keyAHEYJo950dbgYl&view=Grid%20view') 
  .then( response => {
    return response.json()
  })
  .then( data => {
    let newH2 = `<h2>Enjoy the read and feel free to add another case.</h2>`;
    document.getElementById('h2').innerHTML = newH2;
    document.getElementById('addContent').style="display:initial";
    document.getElementById('output').style = "flex-flow: row wrap";
    
    let cases = data.records;
    let i;

    let output = ``;

    for (i=0; i < cases.length; i++) {

      output += `
      <div class="col-5 card container-fluid justify-content-center align-items-center mb-4">
        <img src="${cases[i].fields['Pictures'][0].url}" class="card-img-top mt-4 mb-4" alt="" style="height: 200px; object-fit: contain">
        <p class="text-warning" style="margin: auto">Image via Wikipedia</p>
        <div class="card-body">
          <h5 class="card-title">${cases[i].fields['Case name']}</h5>
          <p class="card-text">${cases[i].fields['Description']}</p>
          <p class="card-text text-success">Status: ${cases[i].fields['Status']}</p>
          <a href="${cases[i].fields['Link']}" class="stretched-link rounded-pill"><b>Read the full case</b></a>
        </div>
      </div>`

      console.log(output);
          
      document.getElementById('output').innerHTML = output;
    }
  })
}
       
          
function addContent(event) {
  event.preventDefault(); 
           
  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;
  let year = document.getElementById('year').value;
  let status = document.getElementById('status').value;      
  let link = document.getElementById('link').value;

  let newCase = {
    records: [
      {
        fields: {
          "Case name": title,
          "Description": body,
          "Year": year,
          'Status': status,
          'Link': link
        }
      }
    ],
    typecast: true 
  }
      
  fetch('https://api.airtable.com/v0/appaYfkeSMCsMh0Rv/Cases', {
    method: "post",
    body: JSON.stringify(newCase),
    headers: {
      Authorization: 'Bearer keyAHEYJo950dbgYl',
     'Content-type': 'application/json'
    },
    })
    .then(res => res.json())
    .then(result => {
       console.log(result);
       res.json(result)
    })
    .catch(err => console.log(err))
}
    