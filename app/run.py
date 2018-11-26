from flask import Flask

app = Flask(__name__)

import json
import pandas as pd

from flask import request
from flask import render_template
from flask import jsonify
@app.route('/')
@app.route('/index')
def index():
    df_horse = pd.read_csv("static/dataset/horse_info.csv")
    df_record = pd.read_csv("static/dataset/past_record.csv")

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

    
    all_record = pd.read_csv("static/dataset/recordHorse/all_record.csv")
    record_result = all_record[all_record.HorseID==id]
    attributes = ["Rtg","Pla","RaceDate",'Dist','FinishTime',"DeclarHorseWt"]
    record_result = record_result[attributes]
    record_result.index = pd.RangeIndex(len(record_result))
    filename = "static/dataset/recordHorse/result_"+id+".csv"
    record_result.to_csv(filename,index=False)
    
    result = dict()
    result['state'] = True
    return jsonify(result)





@app.route('/getPersonData',methods=['POST'])
def getPersonData():
    data = json.loads(request.form.get('data'))
    id = data["id"]

    result = dict()
    result['id'] = id
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)