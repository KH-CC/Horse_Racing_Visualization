import pandas as pd

edit_horse = pd.read_csv("../edit_horse.csv")
past_records = pd.read_csv("../past_record.csv")
horseIDs = edit_horse["HorseID"]
edit_records = past_records[past_records.HorseID.isin(horseIDs)]

horseMap = {}
sireList = pd.DataFrame(columns=["Sire"])
for i, row in edit_horse.iterrows():
    horseMap[row["HorseID"]] = row["Sire"]

for i, row in edit_records.iterrows():
    sireList = sireList.append({"Sire": horseMap[row["HorseID"]]}, ignore_index=True)
edit_records.index = pd.RangeIndex(len(edit_records.index))
edit_records = pd.concat([sireList, edit_records], sort=False, ignore_index=False, axis=1)
attributes = ["HorseID", "Rtg", "Sire", "Pla", "RaceDate", 'Dist', 'FinishTime', "DeclarHorseWt"]
all_record = edit_records[attributes]
all_record = all_record.fillna(0)
all_record.to_csv("all_record.csv", index=False)
print(all_record)
