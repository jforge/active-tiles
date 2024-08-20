document.addEventListener("DOMContentLoaded", function () {
    const linkForm = document.getElementById("linkForm");
    const tiles = document.querySelectorAll(".tile");

    // Function to apply links to tiles
    function applyLinks() {
        tiles.forEach((tile, index) => {
            const linkInput = document.getElementById(`link${index + 1}`);
            const url = linkInput.value || "#"; // Default to # if no URL is entered
            tile.onclick = () => window.open(url, "_blank", 'noopener,noreferrer'); // Open link in a new tab
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
