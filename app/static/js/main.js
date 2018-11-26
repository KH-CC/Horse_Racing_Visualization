function init()
{   
    ParentDiv = document.getElementById("parentHorse");
    RecordDiv = document.getElementById("recordHorse");
    PersonDiv = document.getElementById("personHorse");
    parentDisplay();
    SelectedHorseId = null;

    $.ajaxSetup ({ 
        cache: false //close AJAX cache 
   }); 
}
