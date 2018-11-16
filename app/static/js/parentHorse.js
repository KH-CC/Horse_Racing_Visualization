function parentDisplay() //Display parent infomation of all horse, should be call first
{





}

function onMouseClick(evt) //A call back method for eventlistener(仮),pass horse ID 
{
    var horseID = evt
    recordDisplay(horseID)
    personDisplay(horseID)
}