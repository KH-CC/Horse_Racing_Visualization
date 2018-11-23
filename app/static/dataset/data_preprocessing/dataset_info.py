import pandas as pd
horseData = pd.read_csv("horse_info.csv")

print(horseData["Sire"].value_counts())
sireList = ["Not A Single Doubt" ,\
"Showcasing",\
"More Than Ready",\
"Snitzel",\
"Flying Spur",\
"Commands",\
"Makfi",\
"Sebring",\
"Duke Of Marmalade",\
"Swiss Ace"]

for i in sireList:
    print(i,(horseData["Sire"]==i).sum())


