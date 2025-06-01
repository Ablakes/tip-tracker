import json
import zmq
from datetime import datetime
import os

def calculate_income():
    try:
        with open("../shifts.json", "r") as file:
            shift_data = json.load(file)

    except FileNotFoundError:
        return {"error": "shifts.json not found"}

    if not shift_data:
        return {"error": "No data found in shifts.json"}

    wage = shift_data["hourlyWage"]
    startDate = datetime.strptime(shift_data["startDate"], "%Y-%m-%d")
    endDate = datetime.strptime(shift_data["endDate"], "%Y-%m-%d")
    hours_worked = 0
    total_tips = 0
    total_wages = 0
    credit_tips = 0
    cash_tips = 0

    for shift in shift_data["shifts"]:
        shift_date = datetime.strptime(shift["date"], "%Y-%m-%d")
        if startDate <= shift_date <= endDate:
            hours_worked += shift["hours"]
            credit_tips += shift["credit"]
            cash_tips += shift["cash"]

    total_tips = credit_tips + cash_tips

    if hours_worked == 0:
        return {"error": "No shifts found in the specified date range."}

    total_wages = wage * hours_worked
    gross_earnings = total_wages + total_tips

    earnings = {
        "total_hours_worked": hours_worked,
        "cash_tips": round(cash_tips, 2),
        "credit_tips": round(credit_tips, 2),
        "total_tips": round(total_tips, 2),
        "total_wages": round(total_wages, 2),
        "gross_earnings": round(gross_earnings, 2),
        "start_date": startDate.strftime("%Y-%m-%d"),
        "end_date": endDate.strftime("%Y-%m-%d"),
    }

    return earnings


# ZMQ server setup
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

print("Microservice is running and waiting for messages on port 5555...")

while True:
    message = socket.recv_string()
    print("Received request:", message)
    report = calculate_income()
    socket.send_json(report)
