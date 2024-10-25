const participants = {};  // Objekt zur Speicherung der Teilnehmer und ihrer Partner

// Teilnehmer hinzufügen
document.getElementById('addParticipant').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const partner = document.getElementById('partner').value.trim() || null;

    if (name && !participants[name]) {
        participants[name] = partner;

        const listItem = document.createElement('li');
        listItem.textContent = partner 
            ? `${name} (Partner: ${partner})` 
            : `${name} (kein Partner)`;
        document.getElementById('participants').appendChild(listItem);

        document.getElementById('name').value = '';
        document.getElementById('partner').value = '';

        if (Object.keys(participants).length > 1) {
            document.getElementById('drawButton').style.display = 'block';
        }
    } else {
        alert('Bitte einen gültigen Namen eingeben, der noch nicht vorhanden ist.');
    }
});

// Auslosung starten
document.getElementById('drawButton').addEventListener('click', () => {
    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ participants })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<h2>Ergebnisse:</h2>';

        for (const [giver, receiver] of Object.entries(data)) {
            const personDiv = document.createElement('div');
            personDiv.classList.add('result-item');

            const button = document.createElement('button');
            button.textContent = `${giver}'s Geschenk anzeigen`;
            button.addEventListener('click', () => {
                const p = personDiv.querySelector('p');
                const isVisible = p.style.display === 'block';
                p.style.display = isVisible ? 'none' : 'block';
                p.style.opacity = isVisible ? 0 : 1;
            });

            const resultText = document.createElement('p');
            resultText.textContent = `Du schenkst: ${receiver}`;

            personDiv.appendChild(button);
            personDiv.appendChild(resultText);
            resultDiv.appendChild(personDiv);
        }
    })
    .catch(error => console.error('Fehler:', error));
});
