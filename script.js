document.addEventListener('DOMContentLoaded', function() {

  const searchBtn = document.getElementById('search');
  const userInput = document.getElementById('user-input');

  const statsContainer = document.querySelector('.stats');

  const totalProgressCircle = document.querySelector('.total-progress');
  const easyProgressCircle = document.querySelector('.easy-progress');
  const mediumProgressCircle = document.querySelector('.medium-progress');
  const hardProgressCircle = document.querySelector('.hard-progress');

  const easyLabel = document.getElementById('easy-label');
  const mediumLabel = document.getElementById('medium-label');
  const hardLabel = document.getElementById('hard-label');
  const totalLabel = document.getElementById('total-label');

  const cardStatsContainer = document.querySelector('.stats-card');

  function validateUsername(username) {
    if(username.trim() === '') {
      alert('Username cannot be empty');
      return false;
    } 

    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if(!isMatching) {
      alert('Invalid username');
    }
    return isMatching;
  }


  async function fetchUserData(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    
    try{
      searchBtn.textContent = 'Searching...';
      searchBtn.disabled = true;
      const response = await fetch(url);

      if(!response.ok){
        throw new Error('Failed to fetch data');
      }

      let data = await response.json();
      console.log(data);

      if(data.status === 'error'){
        throw new Error(data.message);
      }

      displayUserData(data);

    }catch(error){
      statsContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }finally{
      searchBtn.textContent = 'Search';
      searchBtn.disabled = false;
  }
}

function updateUI(solved, total, label, progressCircle) {
  
  const degree = (solved / total) * 360;

  progressCircle.style.setProperty('--progress-degree', `${degree}%`);

  label.textContent = `${solved} / ${total}`;


}

  function displayUserData(parsedData){

    //Total questions 
    const totalQuestions = parsedData.totalQuestions;
    const totalEasyQuestions = parsedData.totalEasy;
    const totalMediumQuestions = parsedData.totalMedium;
    const totalHardQuestions = parsedData.totalHard;


    //solved questions
    const totalSolved = parsedData.totalSolved;
    const easySolved = parsedData.easySolved;
    const mediumSolved = parsedData.mediumSolved;
    const hardSolved = parsedData.hardSolved;

    //Update the UI
    updateUI(totalSolved, totalQuestions, totalLabel, totalProgressCircle);
    updateUI(easySolved, totalEasyQuestions, easyLabel, easyProgressCircle);
    updateUI(mediumSolved, totalMediumQuestions, mediumLabel, mediumProgressCircle);
    updateUI(hardSolved, totalHardQuestions, hardLabel, hardProgressCircle);

  }

  searchBtn.addEventListener('click', function (){
    const username = userInput.value;
    console.log(username);
    
    if(validateUsername(username)){
      fetchUserData(username);
    }

  });



























  // const performSearch = function(username) {
  //   console.log(username);
  //   // Call a function to perform search based on the username
  // };

  // const handleSearch = function(event) {
  //   if (event.type === 'click' || event.key === 'Enter') {
  //     const username = userInput.value;
  //     performSearch(username);
  //   }
  // };

  // searchBtn.addEventListener('click', handleSearch);
  // userInput.addEventListener('keydown', handleSearch);

});