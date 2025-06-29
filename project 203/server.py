from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

df = pd.read_csv("university_data.csv")
connection = create_connection("university_data.db")
df.to_sql('university_data', connection, if_exists='replace', index=False)
connection.close();

db_url = 'sqlite:///university_data.db'
engine = create_engine(db_url,echo=True)

df1 = pd.read_sql_query("SELECT [College] FROM university_data", engine)
df2 = pd.read_sql_query("SELECT [Major] FROM university_data", engine)
df3 = pd.read_sql_query("SELECT [Activity] FROM university_data", engine)
df4 = pd.read_sql_query("SELECT [AcademicYear] FROM university_data", engine)





app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-datachart")
def get_datachart():
    classes = df3["Activity"].value_counts().index
    values = df3["Activity"].value_counts().values

    data = []

    for i in range(len(classes)):
        data.append({"class": classes[i], "value": int(values[i])})

    return jsonify(data)


@app.route("/get-datatable")
def get_datatable():
    classes = df2["Major"].value_counts().index
    values = df2["Major"].value_counts().values

    datab = []

    for i in range(len(classes)):
        datab.append({"class": classes[i], "value": int(values[i])})

    return jsonify(datab)


@app.route("/get-datalol")
def get_datalol():
    classes = df1["College"].value_counts().index
    values = df1["College"].value_counts().values

    datac = []

    for i in range(len(classes)):
        datac.append({"class": classes[i], "value": int(values[i])})

    return jsonify(datac)


@app.route("/get-datamix")
def get_datamix():
    classes = df4["AcademicYear"].value_counts().index
    values = df4["AcademicYear"].value_counts().values

    datad = []

    for i in range(len(classes)):
        datad.append({"class": classes[i], "value": int(values[i])})

    return jsonify(datad)


if __name__ == "__main__":
    app.run(debug=True)
