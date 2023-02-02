const commandLine = document.getElementById("commandLine");
const commandList = document.getElementById("commandList");
const commandForm = document.getElementById("commandForm");
const commandInput = document.getElementById("commandInput");

function addCommand(command = null) {

    let commandText = command ?? commandInput.value;

    const commandItem = document.createElement("li");

    commandItem.textContent = commandText;

    commandList.appendChild(commandItem);

    commandInput.value = "";

    commandLine.scrollTop = commandLine.scrollHeight;
}