
function recordDisplay(horseID) //Display infomation of input horse ID
{
    var data = {
        data: JSON.stringify({"id":horseID})
    }
    $.ajax({
        url:"/getRecordData",
        type:"POST",
        data:data,
        success:function(result){
            recordDiv.innerHTML=result.id;
            
        }
    })
    
}
