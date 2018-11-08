var horseArray; //table of horse
var raceArray; //table of past record

async function readCSV()
{
    d3.csv("/Horse_Racing_Visualization/dataset/horse_info.csv", function(data){
        horseArray = data;
    });
    d3.csv("/Horse_Racing_Visualization/dataset/past_record.csv",function(data){
        raceArray = data;
    });
}
function csvToArray(csv)
{
    horseArray = csv;
}
readCSV()


