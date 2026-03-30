``` HTML

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Lather</title>
    <link rel="manifest" href="/manifest.json">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="apple-touch-icon" href="/icon-192.png">

    <style>
        /* General Styles */
        :root {
            --color-background: hsl(30, 20%, 98%);
            --color-surface: hsl(0, 0%, 100%);
            --color-text: hsl(30, 5%, 30%);
            --color-accent: hsl(150, 40%, 60%);
            --color-accent-dark: hsl(150, 40%, 50%);
            --color-low-stock: hsl(0, 70%, 70%);
            --color-border: hsl(30, 10%, 90%);
            --color-delete: hsl(350, 70%, 60%);
            --spacing-xs: 8px;
            --spacing-sm: 12px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
            --border-radius: 12px;
            --shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: var(--font-family);
            margin: 0;
            padding: 0;
            background-color: var(--color-background);
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding-bottom: calc(80px + env(safe-area-inset-bottom)); /* Space for fixed footer + safe area */
        }

        header {
            padding: var(--spacing-lg) var(--spacing-md);
            text-align: center;
            background-color: var(--color-surface);
            border-bottom: 1px solid var(--color-border);
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 10;
        }

        h1 {
            margin: 0;
            font-size: 1.8em;
            color: var(--color-accent-dark);
        }

        main {
            flex-grow: 1;
            padding: var(--spacing-md);
            padding-top: var(--spacing-md);
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
        }

        #shampoo-list {
            display: grid;
            gap: var(--spacing-md);
        }

        .shampoo-card {
            background-color: var(--color-surface);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: var(--spacing-md);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
            position: relative;
            overflow: hidden;
            border: 1px solid var(--color-border);
            transition: transform 0.2s ease-out;
            min-height: 120px; /* Ensure sufficient touch target */
        }

        .shampoo-card.low-stock {
            border-color: var(--color-low-stock);
            box-shadow: 0 4px 10px rgba(var(--color-low-stock), 0.1);
        }

        .shampoo-card.deleting {
            transform: translateX(-100%);
            opacity: 0;
        }

        .shampoo-info {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
            flex-grow: 1;
        }

        .shampoo-name {
            font-weight: 600;
            font-size: 1.1em;
            color: var(--color-text);
            line-height: 1.2;
        }

        .shampoo-brand {
            font-size: 0.9em;
            color: var(--color-text);
            opacity: 0.7;
        }

        .fill-bar-container {
            width: 100%;
            height: 16px;
            background-color: var(--color-border);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        .fill-bar {
            height: 100%;
            width: 0%;
            background-color: var(--color-accent);
            border-radius: 8px;
            transition: width 0.3s ease-out, background-color 0.3s ease-out;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: var(--spacing-xs);
            white-space: nowrap;
        }

        .shampoo-card.low-stock .fill-bar {
            background-color: var(--color-low-stock);
        }

        .fill-percentage {
            font-size: 0.8em;
            font-weight: 600;
            color: var(--color-surface);
            text-shadow: 0 0 2px rgba(0,0,0,0.3);
        }

        .fill-percentage-low {
            color: var(--color-text);
            text-shadow: none;
        }

        .shampoo-notes {
            font-size: 0.85em;
            color: var(--color-text);
            opacity: 0.8;
            margin-top: var(--spacing-xs);
        }

        .low-stock-flag {
            font-size: 0.8em;
            font-weight: 600;
            color: var(--color-low-stock);
            margin-top: var(--spacing-xs);
            display: flex;
            align-items: center;
        }

        .low-stock-flag::before {
            content: '⚠️';
            margin-right: 4px;
        }

        /* Fixed Footer */
        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: var(--color-surface);
            padding: var(--spacing-md);
            padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
            box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.03);
            display: flex;
            justify-content: center;
            z-index: 100;
            border-top: 1px solid var(--color-border);
        }

        .button {
            background-color: var(--color-accent);
            color: var(--color-surface);
            border: none;
            border-radius: var(--border-radius);
            padding: var(--spacing-sm) var(--spacing-lg);
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease;
            min-height: 48px; /* Minimum touch target */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .button:hover {
            background-color: var(--color-accent-dark);
        }

        .button.secondary {
            background-color: var(--color-border);
            color: var(--color-text);
        }

        .button.secondary:hover {
            background-color: hsl(30, 10%, 85%);
        }

        .button.delete {
            background-color: var(--color-delete);
            color: var(--color-surface);
        }

        .button.delete:hover {
            background-color: hsl(350, 70%, 50%);
        }

        /* Modals */
        .modal-overlay {
            position: fixed;
            top: 0;
left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        .modal-overlay.visible {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background-color: var(--color-surface);
            border-radius: var(--border-radius);
            padding: var(--spacing-lg);
            width: 90%;
            max-width: 400px;
            box-shadow: var(--shadow);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            max-height: 90vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }

        .modal-overlay.visible .modal-content {
            transform: translateY(0);
            opacity: 1;
        }

        .modal-content h2 {
            margin-top: 0;
            font-size: 1.5em;
            color: var(--color-text);
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
        }

        .form-group label {
            font-weight: 600;
            font-size: 0.9em;
            color: var(--color-text);
            opacity: 0.8;
        }

        .form-group input,
        .form-group textarea {
            padding: var(--spacing-sm);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius);
            font-family: var(--font-family);
            font-size: 1em;
            color: var(--color-text);
            background-color: var(--color-background);
            min-height: 44px; /* Minimum touch target */
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--color-accent);
            background-color: var(--color-surface);
        }

        .modal-actions {
            display: flex;
            gap: var(--spacing-md);
            justify-content: flex-end;
            margin-top: var(--spacing-sm);
        }

        #update-level-modal .modal-actions {
            justify-content: space-between;
        }

        /* Error Message */
        #error-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: var(--color-delete);
            color: var(--color-surface);
            padding: var(--spacing-sm) var(--spacing-md);
            text-align: center;
            font-weight: 600;
            z-index: 200;
            transform: translateY(-100%);
            transition: transform 0.3s ease-out;
            box-shadow: var(--shadow);
        }

        #error-message.visible {
            transform: translateY(0);
        }

        /* Empty State */
        #empty-state {
            text-align: center;
            padding: var(--spacing-lg);
            color: var(--color-text);
            opacity: 0.6;
            font-size: 1.1em;
            margin-top: var(--spacing-lg);
        }

        /* Small screen adjustments */
        @media (max-width: 400px) {
            .modal-content {
                width: 95%;
                padding: var(--spacing-md);
            }
            .button {
                font-size: 1em;
                padding: var(--spacing-sm) var(--spacing-md);
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Lather</h1>
    </header>

    <main>
        <div id="shampoo-list">
            <!-- Shampoo cards will be rendered here by JavaScript -->
        </div>
        <div id="empty-state" style="display: none;">
            Looks like your bathroom is empty! Tap the '+' button to add your first shampoo.
        </div>
    </main>

    <footer>
        <button id="add-shampoo-btn" class="button">
            + Add Shampoo
        </button>
    </footer>

    <!-- Add Shampoo Modal -->
    <div id="add-shampoo-modal" class="modal-overlay">
        <div class="modal-content">
            <h2>Add New Shampoo</h2>
            <form id="add-shampoo-form">
                <div class="form-group">
                    <label for="new-name">Product Name</label>
                    <input type="text" id="new-name" required>
                </div>
                <div class="form-group">
                    <label for="new-brand">Brand</label>
                    <input type="text" id="new-brand" required>
                </div>
                <div class="form-group">
                    <label for="new-totalMl">Total Volume (ml)</label>
                    <input type="number" id="new-totalMl" min="1" required>
                </div>
                <div class="form-group">
                    <label for="new-startingAmount">Starting Amount (ml)</label>
                    <input type="number" id="new-startingAmount" min="0" required>
                </div>
                <div class="form-group">
                    <label for="new-notes">Notes (optional)</label>
                    <textarea id="new-notes" rows="3"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="button secondary" onclick="closeModal('add-shampoo-modal')">Cancel</button>
                    <button type="submit" class="button">Add Product</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Update Level Modal -->
    <div id="update-level-modal" class="modal-overlay">
        <div class="modal-content">
            <h2>Update Level</h2>
            <form id="update-level-form">
                <input type="hidden" id="update-id">
                <p>Updating: <strong id="update-product-name"></strong></p>
                <div class="form-group">
                    <label for="update-remainingMl">Remaining Amount (ml)</label>
                    <input type="number" id="update-remainingMl" min="0" required>
                </div>
                <div class="modal-actions">
                    <button type="button" class="button delete" id="delete-product-modal-btn">Delete</button>
                    <div>
                        <button type="button" class="button secondary" onclick="closeModal('update-level-modal')">Cancel</button>
                        <button type="submit" class="button">Update</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Error Message Display -->
    <div id="error-message"></div>

    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore-compat.js"></script>

    <script>
        // PASTE YOUR FIREBASE CONFIG HERE
        const firebaseConfig = {

  apiKey: "<YOUR_WEB_API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<PROJECT_ID>.firebasestorage.app",
  messagingSenderId: "<SENDER_ID>",
  appId: "<APP_ID>",
  measurementId: "<OPTIONAL>"
            
            
        };

        // Initialize Firebase
        if (firebaseConfig.projectId) {
            firebase.initializeApp(firebaseConfig);
            const db = firebase.firestore();

            // Service Worker Registration
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    const swBlob = new Blob([`
                        const CACHE_NAME = 'lather-cache-v1';
                        const urlsToCache = [
                            '/',
                            '/index.html',
                            '/manifest.json',
                            '/icon-192.png', // Placeholder, user to provide
                            '/icon-512.png'  // Placeholder, user to provide
                        ];

                        self.addEventListener('install', (event) => {
                            event.waitUntil(
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        console.log('Opened cache');
                                        return cache.addAll(urlsToCache.filter(url => url !== '/icon-192.png' && url !== '/icon-512.png')); // Filter out non-existent icons during initial caching if not provided
                                    })
                            );
                        });

                        self.addEventListener('fetch', (event) => {
                            event.respondWith(
                                caches.match(event.request)
                                    .then((response) => {
                                        if (response) {
                                            return response;
                                        }
                                        return fetch(event.request);
                                    })
                            );
                        });

                        self.addEventListener('activate', (event) => {
                            event.waitUntil(
                                caches.keys().then((cacheNames) => {
                                    return Promise.all(
                                        cacheNames.map((cacheName) => {
                                            if (cacheName !== CACHE_NAME) {
                                                return caches.delete(cacheName);
                                            }
                                        })
                                    );
                                })
                            );
                        });
                    `], { type: 'application/javascript' });

                    const swUrl = URL.createObjectURL(swBlob);

                    navigator.serviceWorker.register(swUrl)
                        .then(registration => {
                            console.log('Service Worker registered with scope:', registration.scope);
                        })
                        .catch(error => {
                            console.error('Service Worker registration failed:', error);
                        });
                });
            }

            // DOM Elements
            const shampooList = document.getElementById('shampoo-list');
            const emptyState = document.getElementById('empty-state');
            const addShampooBtn = document.getElementById('add-shampoo-btn');
            const addShampooModal = document.getElementById('add-shampoo-modal');
            const addShampooForm = document.getElementById('add-shampoo-form');
            const updateLevelModal = document.getElementById('update-level-modal');
            const updateLevelForm = document.getElementById('update-level-form');
            const updateProductName = document.getElementById('update-product-name');
            const deleteProductModalBtn = document.getElementById('delete-product-modal-btn');
            const errorMessageDiv = document.getElementById('error-message');

            let currentShampoos = []; // Store current shampoo data for quick access

            // Helper to show/hide modals
            function showModal(modalId) {
                document.getElementById(modalId).classList.add('visible');
            }

            function closeModal(modalId) {
                document.getElementById(modalId).classList.remove('visible');
            }

            // Helper to show error message
            function showErrorMessage(message, duration = 3000) {
                errorMessageDiv.textContent = message;
                errorMessageDiv.classList.add('visible');
                setTimeout(() => {
                    errorMessageDiv.classList.remove('visible');
                }, duration);
            }

            // Render Shampoo List
            function renderShampoos(shampoos) {
                shampooList.innerHTML = ''; // Clear existing list
                currentShampoos = shampoos; // Update current list
                if (shampoos.length === 0) {
                    emptyState.style.display = 'block';
                    return;
                } else {
                    emptyState.style.display = 'none';
                }

                shampoos.forEach(shampoo => {
                    const percentage = (shampoo.remainingMl / shampoo.totalMl) * 100;
                    const isLowStock = percentage < 20;

                    const card = document.createElement('div');
                    card.className = `shampoo-card ${isLowStock ? 'low-stock' : ''}`;
                    card.dataset.id = shampoo.id;
                    card.tabIndex = 0; // Make card focusable for long-press on non-touch devices

                    card.innerHTML = `
                        <div class="shampoo-info">
                            <span class="shampoo-brand">${shampoo.brand}</span>
                            <span class="shampoo-name">${shampoo.name}</span>
                            ${shampoo.notes ? `<p class="shampoo-notes">${shampoo.notes}</p>` : ''}
                        </div>
                        <div class="fill-bar-container">
                            <div class="fill-bar" style="width: ${percentage}%">
                                <span class="fill-percentage ${percentage < 30 ? 'fill-percentage-low' : ''}">${Math.round(percentage)}%</span>
                            </div>
                        </div>
                        ${isLowStock ? `<div class="low-stock-flag">Low stock!</div>` : ''}
                    `;

                    shampooList.appendChild(card);
                });
            }

            // Event Listeners for Modals
            addShampooBtn.addEventListener('click', () => {
                addShampooForm.reset();
                showModal('add-shampoo-modal');
            });

            // Add Shampoo Form Submission
            addShampooForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('new-name').value.trim();
                const brand = document.getElementById('new-brand').value.trim();
                const totalMl = parseFloat(document.getElementById('new-totalMl').value);
                const startingAmount = parseFloat(document.getElementById('new-startingAmount').value);
                const notes = document.getElementById('new-notes').value.trim();

                if (!name || !brand || isNaN(totalMl) || isNaN(startingAmount) || totalMl <= 0 || startingAmount < 0 || startingAmount > totalMl) {
                    showErrorMessage('Please enter valid product details. Starting amount cannot exceed total volume.');
                    return;
                }

                try {
                    await db.collection('shampoos').add({
                        name,
                        brand,
                        totalMl,
                        remainingMl: startingAmount,
                        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                        notes: notes || firebase.firestore.FieldValue.delete() // Only store if not empty
                    });
                    closeModal('add-shampoo-modal');
                } catch (error) {
                    console.error('Error adding document: ', error);
                    showErrorMessage('Failed to add shampoo. Please try again.');
                }
            });

            // Handle card clicks for Update Level
            shampooList.addEventListener('click', (e) => {
                const card = e.target.closest('.shampoo-card');
                if (card) {
                    const id = card.dataset.id;
                    const shampoo = currentShampoos.find(s => s.id === id);
                    if (shampoo) {
                        document.getElementById('update-id').value = id;
                        updateProductName.textContent = `${shampoo.brand} ${shampoo.name}`;
                        document.getElementById('update-remainingMl').value = shampoo.remainingMl;
                        // Set max for input to totalMl
                        document.getElementById('update-remainingMl').setAttribute('max', shampoo.totalMl);
                        showModal('update-level-modal');
                    }
                }
            });

            // Update Level Form Submission
            updateLevelForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.getElementById('update-id').value;
                const remainingMl = parseFloat(document.getElementById('update-remainingMl').value);
                
                const shampoo = currentShampoos.find(s => s.id === id);
                if (!shampoo) {
                    showErrorMessage('Shampoo not found for update.');
                    return;
                }

                if (isNaN(remainingMl) || remainingMl < 0 || remainingMl > shampoo.totalMl) {
                    showErrorMessage(`Please enter a valid remaining amount between 0 and ${shampoo.totalMl}ml.`);
                    return;
                }

                try {
                    await db.collection('shampoos').doc(id).update({
                        remainingMl,
                        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    closeModal('update-level-modal');
                } catch (error) {
                    console.error('Error updating document: ', error);
                    showErrorMessage('Failed to update shampoo level. Please try again.');
                }
            });

            // Delete Product functionality (long-press on card or button in update modal)
            let pressTimer;
            shampooList.addEventListener('touchstart', (e) => {
                const card = e.target.closest('.shampoo-card');
                if (card) {
                    pressTimer = setTimeout(() => {
                        handleDelete(card.dataset.id);
                    }, 800); // Long press duration
                }
            });

            shampooList.addEventListener('touchend', () => {
                clearTimeout(pressTimer);
            });

            shampooList.addEventListener('touchmove', () => {
                clearTimeout(pressTimer);
            });

            shampooList.addEventListener('mousedown', (e) => {
                const card = e.target.closest('.shampoo-card');
                if (card) {
                    pressTimer = setTimeout(() => {
                        handleDelete(card.dataset.id);
                    }, 800);
                }
            });

            shampooList.addEventListener('mouseup', () => {
                clearTimeout(pressTimer);
            });

            shampooList.addEventListener('mouseleave', () => {
                clearTimeout(pressTimer);
            });

            deleteProductModalBtn.addEventListener('click', async () => {
                const id = document.getElementById('update-id').value;
                await handleDelete(id);
                closeModal('update-level-modal');
            });

            async function handleDelete(id) {
                if (confirm('Are you sure you want to delete this shampoo? This action cannot be undone.')) {
                    const card = document.querySelector(`.shampoo-card[data-id="${id}"]`);
                    if (card) {
                        card.classList.add('deleting');
                        // Allow CSS transition to play before actual deletion
                        setTimeout(async () => {
                            try {
                                await db.collection('shampoos').doc(id).delete();
                            } catch (error) {
                                console.error('Error deleting document: ', error);
                                showErrorMessage('Failed to delete shampoo. Please try again.');
                                card.classList.remove('deleting'); // If delete fails, revert animation
                            }
                        }, 200); // Match CSS transition duration
                    }
                }
            }

            // Firestore Realtime Listener
            db.collection('shampoos').orderBy('name', 'asc')
                .onSnapshot(snapshot => {
                    const shampoos = [];
                    snapshot.forEach(doc => {
                        shampoos.push({ id: doc.id, ...doc.data() });
                    });
                    renderShampoos(shampoos);
                }, error => {
                    console.error('Error getting real-time updates: ', error);
                    showErrorMessage('Could not load shampoos. Check your internet connection or Firebase setup.');
                });

        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.innerHTML = `
                    <style>
                        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: var(--color-background); font-family: var(--font-family); color: var(--color-text); text-align: center; padding: var(--spacing-lg); }
                        .setup-error { max-width: 600px; background-color: var(--color-surface); padding: var(--spacing-lg); border-radius: var(--border-radius); box-shadow: var(--shadow); border: 1px solid var(--color-border); }
                        .setup-error h2 { color: var(--color-delete); margin-top: 0; }
                    </style>
                    <div class="setup-error">
                        <h2>Firebase Configuration Missing</h2>
                        <p>Please open <code>index.html</code> and paste your Firebase project configuration object into the designated area within the script tag.</p>
                        <p>It should look something like this:</p>
                        <pre><code>const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "...",
    appId: "1:..."
};</code></pre>
                        <p>You can find this in your Firebase project console under Project settings > General.</p>
                    </div>
                `;
            });
        }
    </script>
</body>
</html>
``` 