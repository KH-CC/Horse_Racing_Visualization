
function personDisplay(horseID) //Display person information of input horse ID
{
    var data = {
        data: JSON.stringify({"id":horseID})
    }
    $.ajax({
        url:"/getPersonData",
        type:"POST",
        data:data,
        success:function(result){
            recordDiv.innerHTML=result.id;
        }
    })
    
}