<?php
function drawGifts($participants) {
    $givers = array_keys($participants);
    $receivers = $givers;
    $assignments = [];

    shuffle($givers);
    shuffle($receivers);

    foreach ($givers as $giver) {
        foreach ($receivers as $key => $receiver) {
            if ($giver !== $receiver && (!isset($participants[$giver]) || $participants[$giver] !== $receiver)) {
                $assignments[$giver] = $receiver;
                unset($receivers[$key]);
                break;
            }
        }
    }

    if (count($assignments) < count($participants)) {
        return drawGifts($participants);
    }

    return $assignments;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $participants = $data['participants'];

    $result = drawGifts($participants);
    echo json_encode($result);
    exit;
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weihnachtsgeschenke Auslosung</title>
    <link rel="stylesheet" href="styles.css">
    <script src="auslosung.js" defer></script>
</head>
<body>
    <div class="container">
        <h1>Weihnachtsgeschenke Auslosung 🎁</h1>

        <div id="inputSection" class="card">
            <h2>Teilnehmer hinzufügen</h2>
            <input type="text" id="name" placeholder="Name" class="input">
            <input type="text" id="partner" placeholder="Partner (optional)" class="input">
            <button id="addParticipant" class="btn">Hinzufügen</button>
        </div>

        <div id="participantList" class="card">
            <h3>Teilnehmerliste</h3>
            <ul id="participants"></ul>
        </div>

        <button id="drawButton" class="btn draw-btn" style="display:none;">Ziehung starten</button>
        <div id="result" class="card"></div>
    </div>
</body>
</html>
