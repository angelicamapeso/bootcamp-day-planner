window.onload = function() {
  //to get the current hour
  console.log(moment().format('H'));

  //to get the current day, formatted as..
  console.log(moment().format('dddd, MMMM Do'));

  displayCurrentDate();
};

//put the current day in the currentDay id place
  //current day formatter
function displayCurrentDate() {
  document.getElementById('currentDay')
    .textContent = moment().format('dddd, MMMM Do');
}

//dynamically generate:
  //rows of container
  //3 columns:
    //hours from 9-5
    //text area
    //save btn

//check the current time
  //colour based on if it's the current time
    //or not

//function to save event
  //when button clickedy

//function to load event from local storage