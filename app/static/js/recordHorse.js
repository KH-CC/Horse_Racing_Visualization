
function recordDisplay(horse) //Display infomation of input horse ID
{
    var data = {
        data: JSON.stringify({"id":horse})
    }
    $.ajax({
        url:"/getRecordData",
        type:"POST",
        data:data,
        success:function(result){
            recordDiv.innerHTML=result.id;
            console.log(result.id)
        }
    })
    
}
