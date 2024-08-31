document.addEventListener("DOMContentLoaded", function () {
    const linkForm = document.getElementById("linkForm");
    const tiles = document.querySelectorAll(".tile");

    // MQTT Client Configuration
    const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

    const topics = [
        { topic: 'tile/link1', element: document.getElementById('link1') },
        { topic: 'tile/link2', element: document.getElementById('link2') },
        { topic: 'tile/link3', element: document.getElementById('link3') },
        { topic: 'tile/link4', element: document.getElementById('link4') },
    ];

    // Connect to MQTT broker
    mqttClient.on('connect', function () {
        console.log('Connected to MQTT broker');
        topics.forEach((t) => mqttClient.subscribe(t.topic));
    });

    // Handle incoming messages
    mqttClient.on('message', function (topic, message) {
        const msgStr = message.toString();
        console.log(`Received message: ${msgStr} from topic: ${topic}`);

        topics.forEach((t, index) => {
            if (t.topic === topic) {
                t.element.value = msgStr;
                localStorage.setItem(`tileLink${index + 1}`, msgStr);
                applyLinks();
            }
        });
    });

    // Function to apply links to tiles
    function applyLinks() {
        tiles.forEach((tile, index) => {
            const linkInput = document.getElementById(`link${index + 1}`);
            if (linkInput) {
                const url = linkInput.value || "#"; // Default to # if no URL is entered
                tile.onclick = () => window.open(url, "_blank", 'noopener,noreferrer'); // Open link in a new tab
            }
        });
    }

    // Load existing links from local storage if available
    function loadLinks() {
        tiles.forEach((tile, index) => {
            const savedLink = localStorage.getItem(`tileLink${index + 1}`);
            const linkInput = document.getElementById(`link${index + 1}`);
            if (savedLink) {
                linkInput.value = savedLink;
            }
        });
        applyLinks();
    }

    // Save links to local storage and apply them
    linkForm.addEventListener("submit", function (e) {
        e.preventDefault();
        tiles.forEach((tile, index) => {
            const linkInput = document.getElementById(`link${index + 1}`);
            localStorage.setItem(`tileLink${index + 1}`, linkInput.value);
        });
        applyLinks();
        alert("Links saved successfully!");
    });

    // Load links when the page is loaded
    loadLinks();
});
