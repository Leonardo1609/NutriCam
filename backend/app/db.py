import pyodbc as db

conn = db.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=LAPTOP-ABRG7UHS\MSSQLSERVER01;"
    "Database=tp_project;"
    "Trusted_Connection=yes;"
)

cursor = conn.cursor()
