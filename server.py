import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


s3_client = boto3.client(
    service_name='s3',
    endpoint_url='https://offzumvtexidpucddytq.storage.supabase.co/storage/v1/s3',
    aws_access_key_id='4863331bbf800ad5ffb53f19ac25e605',
    aws_secret_access_key='e02799531a09b827e3bf4fafad6fc0638885d3ed4a1d30d3e8f3b3f4581397a4',
    region_name='ap-southeast-2'
)

BUCKET_NAME = "my-live-bucket"


@app.route('/api/files', methods=['GET'])
def get_files():
    try:
        response = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
        file_names = [item['Key'] for item in response.get('Contents', [])]
        return jsonify({"files": file_names}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file chunk found"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "Empty filename passed"}), 400

  
        s3_client.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename
        )
        return jsonify({"message": f"Successfully uploaded {file.filename} to Supabase Storage!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/delete/<filename>', methods=['DELETE'])
def delete_file(filename):
    try:
        s3_client.delete_object(Bucket=BUCKET_NAME, Key=filename)
        return jsonify({"message": f"Successfully deleted {filename} from the cloud!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
   
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
