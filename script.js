document.addEventListener('DOMContentLoaded', function() {
    const reels = [
        document.getElementById('reel1'), 
        document.getElementById('reel2'), 
        document.getElementById('reel3'), 
        document.getElementById('reel4'), 
        document.getElementById('reel5')
    ];
    const spinBtn = document.getElementById('spinBtn');
    const balanceDisplay = document.getElementById('balance');
    const betAmountInput = document.getElementById('betAmount');
    const betBtn = document.getElementById('betBtn');
    const winAmountDisplay = document.getElementById('winAmount');
  
    let balance = 1000;
    let spinning = false;
  
    const emojis = ['🍒', '🍊', '🍋', '🍇', '🍉', '🍓', '🍍', '🥝', '🍌', '🍎'];
  
    function spinReels() {
      if (spinning) return;
  
      spinning = true;
      spinBtn.disabled = true;
      betBtn.disabled = true;
  
      let spins = 0;
  
      const interval = setInterval(() => {
        spins++;
        reels.forEach(reel => {
          if (!spinning) return; // Check if spinning is still true before updating the reels
          let randomNumber = Math.floor(Math.random() * emojis.length);
          reel.textContent = emojis[randomNumber];
        });
  
        if (spins === 10) {
          clearInterval(interval);
          spinning = false;
          spinBtn.disabled = false;
          betBtn.disabled = false;
          checkWin();
        }
      }, 100);
    }
  
    function checkWin() {
      const betAmount = parseInt(betAmountInput.value);
      let winAmount = 0;
  
      // Randomly decide if the user wins or loses
      const randomNumber = Math.random();
      if (randomNumber < 0.3) { // 30% chance to win
        winAmount = betAmount * 2;
  
        // Set all reels to display the same emojis when winning
        const winningEmojisIndex = Math.floor(Math.random() * emojis.length);
        const winningEmojis = Array(reels.length).fill(emojis[winningEmojisIndex]);
        reels.forEach((reel, index) => {
          reel.textContent = winningEmojis[index];
        });
      } else { // 70% chance to lose
        winAmount = -betAmount;
  
        // Set different random emojis for each reel when the player loses
        if (spinning) {
          reels.forEach(reel => {
            let randomNumber = Math.floor(Math.random() * emojis.length);
            reel.textContent = emojis[randomNumber];
          });
        }
      }
  
      balance += winAmount;
      balanceDisplay.textContent = `$${balance}`;
  
      if (winAmount > 0) {
        winAmountDisplay.textContent = `You win $${winAmount}`;
        winAmountDisplay.style.color = '#76ABAE'; // Change color to #76ABAE
      } else {
        winAmountDisplay.textContent = 'You lose!';
        winAmountDisplay.style.color = '#76ABAE'; // Change color to #76ABAE
      }
    }
  
    spinBtn.addEventListener('click', function() {
      spinReels();
    });
  
    betBtn.addEventListener('click', function() {
      if (!spinning) {
        const betAmount = parseInt(betAmountInput.value);
        if (betAmount > 100) {
          alert('Maximum bet amount is $100.');
        } else {
          spinReels();
        }
      }
    });

    // Set the input box size to match the button size
    betAmountInput.style.width = `${spinBtn.offsetWidth}px`;

    // Change background color and text color of bet input
    betAmountInput.style.backgroundColor = '#76ABAE';
    betAmountInput.style.color = '#EEEEEE';
  
});
