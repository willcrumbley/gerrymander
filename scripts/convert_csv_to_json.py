import csv, json;

with open('./data/by_congressional_district.csv', mode='r') as infile:
    records = list(csv.DictReader(infile))

states = {}
for district in records:
    if district["code"] not in states.keys():
        state = { key: district[key] for key in ["name", "code"] }
        state["fips"] = "US{}".format(district["fips"].zfill(2))
        state["house_districts"] = []
        states[district["code"]] = state
    for key in district.keys():
        district[key] = district[key].replace(',', '')
    states[district["code"]]["house_districts"].append({
        "number": district["number"],
        "dem_votes": int(district["2016_house_dem"]),
        "rep_votes": int(district["2016_house_rep"]),
        "other_votes": int(district["2016_house_other"])
    })

states_list = []
for state_code, state in states.iteritems():
    states_list.append(state)

# import pdb; pdb.set_trace()
with open('./data/house_by_state.json', 'w') as outfile:
    json.dump({"states": states_list}, outfile)
