import json
import zmq
from datetime import datetime

def calculate_income_analysis():
    try:
        with open("../../shifts.json", "r") as file:
            shift_data = json.load(file)
    except FileNotFoundError:
        return {"error": "shifts.json not found"}

    if not shift_data:
        return {"error": "No data found in shifts.json"}

    try:
        wage = shift_data["hourlyWage"]
        startDate = datetime.strptime(shift_data["startDate"], "%Y-%m-%d")
        endDate = datetime.strptime(shift_data["endDate"], "%Y-%m-%d")
    except Exception as e:
        return {"error": f"Invalid date or wage: {str(e)}"}

    hours_worked = 0
    total_tips = 0

    for shift in shift_data["shifts"]:
        shift_date = datetime.strptime(shift["date"], "%Y-%m-%d")
        if startDate <= shift_date <= endDate:
            hours_worked += shift["hours"]
            total_tips += shift["credit"] + shift["cash"]

    if hours_worked == 0:
        return {"error": "No shifts found in the specified date range."}

    total_wages = wage * hours_worked
    total_income = total_tips + total_wages
    average_hourly_income = total_income / hours_worked

    days_worked = (endDate - startDate).days + 1
    daily_income = total_income / days_worked
    projected_annual_income = round(daily_income * 365, 2)

    return {
        "average_hourly_income": round(average_hourly_income, 2),
        "projected_annual_income": projected_annual_income
    }

# ZMQ setup
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5556")  

print("income-analysis-service is running on port 5556...")

while True:
    message = socket.recv_string()
    print("Received request:", message)
    result = calculate_income_analysis()
    socket.send_json(result)
