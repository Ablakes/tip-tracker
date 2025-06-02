import json
import zmq
from datetime import datetime
from collections import defaultdict

def analyze_weekday_income():
    try:
        with open("../../shifts.json", "r") as file:
            shift_data = json.load(file)
    except FileNotFoundError:
        return {"error": "shifts.json not found"}

    if not shift_data:
        return {"error": "No data in shifts.json"}

    try:
        wage = shift_data["hourlyWage"]
        start_date = datetime.strptime(shift_data["startDate"], "%Y-%m-%d")
        end_date = datetime.strptime(shift_data["endDate"], "%Y-%m-%d")
    except Exception as e:
        return {"error": f"Invalid input: {str(e)}"}

    # Prepare storage
    weekday_hours = defaultdict(float)
    weekday_earnings = defaultdict(float)

    for shift in shift_data["shifts"]:
        shift_date = datetime.strptime(shift["date"], "%Y-%m-%d")
        if start_date <= shift_date <= end_date:
            day = shift_date.strftime("%A")
            hours = shift["hours"]
            tips = shift["credit"] + shift["cash"]
            wages = hours * wage
            income = tips + wages

            weekday_hours[day] += hours
            weekday_earnings[day] += income

    # Calculate averages
    weekday_avg = {}
    for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
        if weekday_hours[day] > 0:
            avg = weekday_earnings[day] / weekday_hours[day]
            weekday_avg[day] = round(avg, 2)
        else:
            weekday_avg[day] = 0.0

    return {
        "weekday_hourly_income": weekday_avg
    }

# ZMQ setup
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5557")  # New unique port

print("weekday-analysis-service is running on port 5557...")

while True:
    message = socket.recv_string()
    print("Received request:", message)
    result = analyze_weekday_income()
    socket.send_json(result)
