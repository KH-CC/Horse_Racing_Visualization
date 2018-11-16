import json
import pandas as pd

from flask import request
from flask import render_template
from flask import jsonify
from app import app
@app.route('/')
@app.route('/index')
def index():
    df_horse = pd.read_csv("app/static/dataset/horse_info.csv")
    df_record = pd.read_csv("app/static/dataset/past_record.csv")

    chart_horse = df_horse.to_dict(orient="records")
    chart_record = df_record.to_dict(orient="records")

    chart_horse = json.dumps(chart_horse,indent=2)
    chart_record = json.dumps(chart_record,indent=2)

    data = {"horse_data":chart_horse, "record_data":chart_record}
    
    return render_template('index.html',title='HKJC horse racing visualization',data=data)

@app.route('/getRecordData',methods=['POST'])
def getRecordData():
    data = json.loads(request.form.get('data'))
    id = data["id"]

    result = dict()
    result['id'] = id
    return jsonify(result)
