import csv, json;

with open('./data/by_congressional_district_v3.csv', mode='r') as infile:
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
    votes = {
        "y2016": {},
        "y2014": {},
        "y2012": {},
        "y2008": {}
    }
    for race in ["house", "pres"]:
        year_list = ["2016", "2014", "2012"] if race == "house" else ["2016", "2012", "2008"]
        for year in year_list:
            year_string = "y{}".format(year)
            for party in ["dem", "rep", "other"]:
                try:
                    vote_count = int(district["_".join([year, race, party])])
                except ValueError:
                    vote_count = None # Encode missing data as None
                votes[year_string]["{0}_votes_{1}".format(party, race)] = vote_count
    states[district["code"]]["house_districts"].append({
        "number": district["number"],
        "votes": votes
    })

states_list = []
for state_code, state in states.iteritems():
    states_list.append(state)

# import pdb; pdb.set_trace()
with open('./data/house_by_state.json', 'w') as outfile:
    json.dump({"states": states_list}, outfile)
