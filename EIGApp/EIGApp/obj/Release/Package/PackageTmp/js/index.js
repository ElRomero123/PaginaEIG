window.onload = initApp;

function initApp()
{

}

function search()
{
    $('#listResults').empty();
    $('#listResults').hide();
    $('#maps').hide();

    var criterio = document.getElementById('searchBox').value;
   
    $('#listResults').append();

    $.ajax
    (
        {
            url: '../api/product/?cadena=' + criterio,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data.length > 0)
                {
                    for(var i = 0; i < data.length; i++)
                    {
                        $('#listResults').append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='tagName'>" + data[i].Name + "</p> <p id='tagDescription'>" + data[i].Description + "</p> <p id='tagAddress'>" + data[i].Address + "</p> <p id='tagPhone'>" + data[i].Phone + "</p> </div> </div>");
                        document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                    } 
    
                    $('#listResults').css('display','inline-block');
                    $('#maps').css('display','inline-block');
                }
            },

            error:
            function ()
            {
                console.log('Error en la función GET');
            }
        }
    );
}

function searchByEnter(e)
{
    if (e.keyCode === 13 && !e.shiftKey) 
    {
        //e.preventDefault();
        search();
    }
}

function to(num)
{
    switch(num)
    {
        case 1:
        location.href = 'index.html';
        break;
        case 2:
        location.href = 'menu2.html';
        break;
        case 3:
        location.href = 'menu3.html';
        break;
        case 4:
        location.href = 'menu4.html';
        break;
        case 5:
        location.href = 'menu5.html';
        break;
        case 6:
        location.href = 'menu6.html';
        break;
        case 7:
        location.href = 'menu7.html';
        break;
        default:
        location.href = 'menu8.html';
    }
}