let money = 10000;
let population = 0;
let health = 100;
let turn = 1;
let disasterTriggered = false;

function showScreen(id) {

    let screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function startGame(river) {

    document.getElementById("riverName").innerText =
        "Managing: " + river;

    showScreen("gameplay");

    updateStats();
}

function updateStats() {

    document.getElementById("money").innerText = money;
    document.getElementById("population").innerText = population;
    document.getElementById("health").innerText = health;
    document.getElementById("turn").innerText = turn;
}

function build(type) {

    let msg = "";

    switch(type) {

        case "farm":
            if (money >= 1000) {
                money -= 1000;
                population += 100;
                health -= 5;
                msg = "Built a Farm.";
            }
            break;

        case "town":
            if (money >= 2000) {
                money -= 2000;
                population += 250;
                health -= 3;
                msg = "Built a Town.";
            }
            break;

        case "factory":
            if (money >= 3000) {
                money -= 3000;
                population += 150;
                health -= 15;
                msg = "Built a Factory.";
            }
            break;

        case "port":
            if (money >= 4000) {
                money -= 4000;
                population += 350;
                health -= 8;
                msg = "Built a Port.";
            }
            break;

        case "treatment":
            if (money >= 2500) {
                money -= 2500;
                health += 20;
                msg = "Built a Water Treatment Plant.";
            }
            break;
    }

    document.getElementById("message").innerText = msg;

    if (health > 100) {
        health = 100;
    }

    updateStats();
}

function endTurn() {

    if (turn === 3 && !disasterTriggered) {

        disasterTriggered = true;

        showScreen("disaster");

        return;
    }

    turn++;

    if (turn > 5) {
        finishGame();
    }

    updateStats();
}

function disasterChoice(choice) {

    if (choice === "ignore") {

        health -= 30;
        population -= 100;

    } else if (choice === "partial") {

        money -= 1000;
        health -= 10;

    } else {

        money -= 2500;
        health += 5;
    }

    showScreen("gameplay");

    updateStats();
}

function finishGame() {

    let score =
        population +
        (money / 100) +
        (health * 10);

    let ending = "";

    if (health < 40) {

        ending =
        "Environmental Disaster: Pollution severely damaged the river ecosystem.";

    } else if (score > 1400) {

        ending =
        "Sustainable Success: You balanced growth and environmental protection.";

    } else if (score > 800) {

        ending =
        "Growing Civilization: Your settlement developed successfully.";

    } else {

        ending =
        "Economic Failure: Your civilization struggled to grow.";
    }

    document.getElementById("ending").innerText = ending;

    document.getElementById("finalStats").innerHTML =
        "Population: " + population +
        "<br>Money: $" + money +
        "<br>River Health: " + health +
        "<br>Final Score: " + Math.round(score);

    showScreen("results");
}
