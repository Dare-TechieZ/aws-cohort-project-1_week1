# aws-cohort-project-1_week1
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/c3cf73f2-1fb5-4450-aa43-78ca94c49b73" />

# ☁️ RIA Vault: Production Cloud Document Dashboard

RIA Vault is a cloud-native document management system featuring a modern, responsive frontend dashboard integrated with a Python Flask API Gateway. The core architecture uses the official **AWS Boto3 SDK client** to manage asynchronous object streaming, indexing, and lifecycle management within cloud-deployed storage.

---

## 🏗️ Architecture & Workflow

The platform separates client-side presentation, routing configurations, application gateway logic, and cloud storage protocols using the AWS S3 API ecosystem.

![RIA Vault Workflow](https://lh3.googleusercontent.com/d/1X6tTqG_e0_L1Yqshf-C3mR0f-61xK_lM)

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
