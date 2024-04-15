from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json,os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

db_uri = os.getenv("DB_URI")
client = MongoClient(db_uri, server_api=ServerApi('1'))
db = client["CLASSCLOCK"]["THEMES"]

@app.route("/themes/getall")
def get_all_themes():
    themes = list(db.find())
    for item in themes:
        item['_id'] = str(item['_id'])
    return json.dumps(themes)

@app.route("/themes/submit", methods=["POST"])
def submit_theme():
    requestBody = json.loads(request.data.decode("utf-8"))
    try:
        theme = {
            "name": json.loads(requestBody["theme_data"])["themeName"],
            "theme_data": requestBody["theme_data"],
            "author": requestBody["author"]
        }
    except:
        return "400 Bad Request",400
    
    db.insert_one(theme)
    return "200 OK"

@app.route("/admin/login", methods=["POST"])
def admin_login():
    requestBody = json.loads(request.data.decode("utf-8"))
    if requestBody["username"] == os.getenv("ADMIN_USERNAME") and requestBody["password"] == os.getenv("ADMIN_PASSWORD"):
        return "200 OK"
    return "401 Unauthorized",401

@app.route("/admin/update-theme", methods=["POST"])
def updateTheme():
    requestBody = json.loads(request.data.decode("utf-8"))
    try:
        if requestBody["username"] != os.getenv("ADMIN_USERNAME") or requestBody["password"] != os.getenv("ADMIN_PASSWORD"):
            return "401 Unauthorized",401
        valueToChange = requestBody["valueToChange"]
        newValue = requestBody["newValue"]
        themeName = requestBody["themeName"]

        db.update_one({"name":themeName}, {"$set": {valueToChange: newValue}})    
    except:
        return "400 Bad Request",400
    return "200 OK"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3005)