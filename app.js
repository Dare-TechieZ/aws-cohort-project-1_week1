
const BACKEND_URL = "https://ria-vault-backend.onrender.com";


document.getElementById('fetch-btn').addEventListener('click', async () => {
    const fileListElement = document.getElementById('file-list');
    fileListElement.innerHTML = '<li>Polling objects from Supabase Storage...</li>';

    try {
        const response = await fetch(`${BACKEND_URL}/api/files`);
        const data = await response.json();

        fileListElement.innerHTML = ''; 

        if (!data.files || data.files.length === 0) {
            fileListElement.innerHTML = '<li class="empty">Storage Bucket is empty!</li>';
        } else {
            data.files.forEach(fileName => {
                const li = document.createElement('li');
                
           
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                li.style.marginBottom = "8px";

    
                const textSpan = document.createElement('span');
                textSpan.textContent = `📄 ${fileName}`;
                li.appendChild(textSpan);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "🗑️ Delete";
                deleteBtn.style.backgroundColor = "#ff4d4d";
                deleteBtn.style.color = "white";
                deleteBtn.style.border = "none";
                deleteBtn.style.cursor = "pointer";
                deleteBtn.style.borderRadius = "4px";
                deleteBtn.style.padding = "4px 8px";

                deleteBtn.onclick = async () => {
                    if (confirm(`Are you sure you want to permanently delete ${fileName}?`)) {
                        await deleteFileFromServer(fileName);
                    }
                };

                li.appendChild(deleteBtn);
                fileListElement.appendChild(li);
            });
        }
    } catch (error) {
        fileListElement.innerHTML = '<li class="empty" style="color:red;">❌ Communication connection drop!</li>';
    }
});


document.getElementById('upload-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const statusText = document.getElementById('upload-status');
    
    if (fileInput.files.length === 0) {
        statusText.textContent = "❌ Choose a file target first!";
        statusText.style.color = "red";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    statusText.textContent = "Streaming object to cloud...";
    statusText.style.color = "#ff9900";

    try {
        const response = await fetch(`${BACKEND_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            statusText.textContent = "✅ File synced directly to cloud storage!";
            statusText.style.color = "green";
            document.getElementById('fetch-btn').click();
        } else {
            const errData = await response.json();
            statusText.textContent = `❌ Rejection: ${errData.error}`;
            statusText.style.color = "red";
        }
    } catch (error) {
        statusText.textContent = "❌ Target pipeline unreachable.";
        statusText.style.color = "red";
    }
});


async function deleteFileFromServer(filename) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/delete/${filename}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            
            document.getElementById('fetch-btn').click(); 
        } else {
            alert("Error deleting file: " + data.error);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}
