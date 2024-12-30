        const gameForm = document.getElementById('gameForm');
        const gameContainer = document.getElementById('gameContainer');
        const currentGameName = document.getElementById('currentGameName');
        const playerInputs = document.getElementById('playerInputs');
        const roundForm = document.getElementById('roundForm');
        const scoreList = document.getElementById('scoreList');

        let players = [];
        let scores = {};

        gameForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const gameName = document.getElementById('gameName').value;
            players = document.getElementById('players').value.split(',').map(player => player.trim());

            if (gameName && players.length > 0) {
                currentGameName.textContent = gameName;
                playerInputs.innerHTML = '';
                scoreList.innerHTML = '';
                scores = {};

                players.forEach(player => {
                    scores[player] = 0;
                    const inputContainer = document.createElement('div');
                    const label = document.createElement('label');
                    const input = document.createElement('input');

                    label.textContent = `${player}'s Score:`;
                    input.type = 'text';
                    input.name = player;
                    input.required = true;

                    inputContainer.appendChild(label);
                    inputContainer.appendChild(input);
                    playerInputs.appendChild(inputContainer);
                });

                gameForm.reset();
                gameContainer.style.display = 'block';
            }
        });

        roundForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const roundScores = Array.from(playerInputs.querySelectorAll('input')).map(input => {
                return {
                    player: input.name,
                    score: parseInt(input.value, 10) || 0
                };
            });

            const roundSummary = document.createElement('li');
            roundSummary.textContent = roundScores.map(rs => `${rs.player}: +${rs.score}`).join(', ');
            scoreList.appendChild(roundSummary);

            roundScores.forEach(({ player, score }) => {
                scores[player] += score;
            });

            playerInputs.querySelectorAll('input').forEach(input => input.value = '');
        });
