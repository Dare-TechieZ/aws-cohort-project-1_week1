
# ☁️ RIA Vault: Production Cloud Document Dashboard


RIA Vault is a cloud-native document management system featuring a modern, responsive frontend dashboard integrated with a Python Flask API Gateway. The core architecture uses the official **AWS Boto3 SDK client** to manage asynchronous object streaming, indexing, and lifecycle management within cloud-deployed storage.

---

## 📱 Dashboard Interface

<p align="center">
  <img width="2854" height="1606" alt="image" src="https://github.com/user-attachments/assets/0b6e151b-dfd2-4241-855f-1d818ca3ab21" />
</p>

## 🏗️ Architecture & Workflow

The platform separates client-side presentation, routing configurations, application gateway logic, and cloud storage protocols using the AWS S3 API ecosystem.

<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/c3cf73f2-1fb5-4450-aa43-78ca94c49b73" />

### System Interactions:
1. **User Interface (Browser):** The user triggers actions via the `index.html` layout (Upload, Sync, or Delete).
2. **Frontend Engine (`app.js`):** Intercepts client interactions and initiates asynchronous runtime pipeline requests (`Fetch API`) targeting our backend gateway.
3. **Backend API Gateway (`server.py`):** A Flask application configured with complete cross-origin resource sharing (`Flask-CORS`) that hosts endpoints mapping actions to explicit cloud requests.
4. **AWS Boto3 Client Subsystem:** Initializes an `s3` service client via `boto3.client()`. It maps payload streams and indices to an S3-compatible cloud target using standardized cloud execution pipelines.

---

## 🛠️ Tech Stack & Dependencies

### Frontend
* **HTML5 & CSS3:** Semantic elements with responsive layout systems, global glassmorphism tokens, and a clean minimalist aesthetic.
* **JavaScript (ES6):** Asynchronous operational architecture utilizing the `Fetch API` for binary streaming and client-side DOM mutations.
* **Static Deployment:** Configured via `vercel.json` for edge-hosted static serving.

### Backend & Cloud Pipeline
* **Python 3.x / Flask:** High-performance RESTful routing gateway.
* **Flask-CORS:** Configured for comprehensive dynamic cross-origin access control.
* **AWS Boto3 SDK:** The official Amazon Web Services SDK for Python, utilized for low-level service calls directly managing remote bucket elements.

---

## ⚙️ Core API Endpoints (AWS Integration)

The backend handles incoming operations by interacting directly with the S3 API interface using explicit core SDK calls:

| HTTP Method | Endpoint | AWS Boto3 Core Service Method | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/files` | `s3_client.list_objects_v2()` | Queries the storage target and returns a parsed JSON array containing all indexed file keys. |
| **POST** | `/api/upload` | `s3_client.upload_fileobj()` | Streams binary file payloads directly from multipart form data blocks up to cloud storage. |
| **DELETE**| `/api/delete/<filename>` | `s3_client.delete_object()` | Transmits a removal request for a specific file key to permanently delete it from the infrastructure. |

---

## 🚀 Local Installation & Setup

### 1. Prerequisites
Ensure you have Python 3.x and Node.js/npm installed on your machine.

### 2. Backend Setup
Clone the project, navigate to the directory containing your backend code, and run:
```bash
# Install required dependencies
pip install -r requirements.txt

# Start the Flask development server locally
python server.py

```
## Project Workflow

1️⃣ User opens the Cloud Storage Dashboard through the deployed frontend.

2️⃣ The frontend (HTML, CSS, JavaScript) sends API requests to the Flask backend whenever a user uploads, views, or deletes a file.

3️⃣ The Flask backend receives the request and processes it using AWS SDK for Python (Boto3).

4️⃣ For file uploads:
   - User selects a file.
   - Frontend sends the file to the backend.
   - Backend uses upload_fileobj() to upload the file to cloud object storage.

5️⃣ For viewing files:
   - Frontend requests the latest file list.
   - Backend uses list_objects_v2() to fetch available files from storage.
   - File metadata is returned and displayed on the dashboard.

6️⃣ For deleting files:
   - User clicks the delete button.
   - Frontend sends the file identifier to the backend.
   - Backend uses delete_object() to remove the file from storage.

7️⃣ Every operation is reflected instantly on the dashboard through API responses, ensuring real-time synchronization between users and cloud storage.

8️⃣ Deployment Architecture:
   - Frontend hosted on Vercel
   - Backend hosted on Render
   - Cloud storage managed through AWS SDK (Boto3)

📂 User → Frontend (Vercel) → Flask Backend (Render) → AWS SDK (Boto3) → Cloud Object Storage

This workflow creates a complete cloud-based file management system where users can upload, view, and delete files through a simple web interface while the backend securely manages all cloud storage operations.
