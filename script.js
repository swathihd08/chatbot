const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

async function sendMessage() {
    let userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage("You: " + userMessage, "user");
    userInput.value = "";

    // Call OpenAI API
    const botResponse = await getBotResponse(userMessage);
    displayMessage("Ben 10: " + botResponse, "bot");
}

// Display chat messages
function displayMessage(text, sender) {
    let messageDiv = document.createElement("div");
    messageDiv.textContent = text;
    messageDiv.className = sender;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}
async function getBotResponse(message) {
    const apiKey = "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"
    const endpoint = "https://platform.openai.com/api-keys";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Bearer ${apiKey}
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) {
            throw new Error(HTTP Error! Status: ${response.status});
        }

        const data = await response.json();
        console.log("API Response:", data);  // Debugging: Print the API response

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content; // Extracting response
        } else {
            return "Sorry, I couldn't generate a response.";
        }
    } catch (error) {
        console.error("Error:", error);
        return "An error occurred while fetching the response.";
    }
}
document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    document.getElementById("chatbox").innerHTML += <p>User: ${userInput}</p>;
    document.getElementById("chatbox").innerHTML += <p>Bot: ${data.reply}</p>;
});