function runDataApp(machineId) {
    const container = document.getElementById('container');
    let oldOutput = document.getElementById('aisquared-output');
    if (oldOutput) oldOutput.remove();

    const output = document.createElement('div');
    output.id = 'aisquared-output';
    container.appendChild(output);

    output.textContent = 'Loading...';

    if (window.DataApp) {
        const dataApp = new window.DataApp({
            dataAppId: '238',
            dataAppUseCaseId: 'ByYCj2jsssxxAib9uHKU'
        });
        dataApp.runDataApp({ input: { machineId } })
            .then(result => {
                output.textContent = '';
                // The SDK should render content directly. This is a fallback.
            })
            .catch(err => {
                output.textContent = 'Error: ' + err;
                console.error('DataApp Error:', err);
            });
    } else {
        console.warn("AI Squared SDK not loaded.");
        output.textContent = "AI Squared SDK not loaded.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('machine-dropdown');
    const machineInput = document.getElementById('machine-input');
    const urlParams = new URLSearchParams(window.location.search);
    const machineFromUrl = urlParams.get('machine');

    // Set initial value based on URL parameter or the default in the HTML.
    const initialMachineId = machineFromUrl || (dropdown ? dropdown.value : 'Machine_001');
    
    if (dropdown) {
        dropdown.value = initialMachineId;
    }
    if (machineInput) {
        machineInput.value = initialMachineId;
    }

    // Run the app on initial load.
    runDataApp(initialMachineId);

    // Add listener for dropdown changes to refresh the page.
    if (dropdown) {
        dropdown.addEventListener('change', (event) => {
            const selectedMachine = event.target.value;
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('machine', selectedMachine);
            window.location.href = newUrl.toString();
        });
    }
});