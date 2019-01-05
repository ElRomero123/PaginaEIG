function search(opcion)
{
    switch(opcion)
    {
        case 1:
            $('#listResults').empty();
            $('#listResults').hide();
            $('#maps').hide();

            var criterio = document.getElementById('searchBox').value;

            $.ajax
            (
                {
                    url: '../api/person/?cadena=' + criterio,
                    type: 'GET',
                    contentType: "application/json;charset=utf-8",

                    success:
                    function (data) 
                    {
                        if(data.length > 0)
                        {
                            for(var i = 0; i < data.length; i++)
                            {
                                $('#listResults').append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='tagName'>" + data[i].Name + " " + data[i].LastName + "</p> <p id='tagDescription'>" + data[i].ProfesionDescription + "</p> <p id='tagAddress'>" + data[i].WebPage + "</p> <p id='tagPhone'>" + data[i].Email + "</p> <p id='tagPhone'>" + data[i].Phone + "</p> <p id='tagPhone'>" + data[i].City + "</p> <p id='tagPhone'>" + + data[i].Address + "</p> </div> </div>");
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

        break;

        case 2:
            alert("Busqueda de otros perfiles como peritos, abogados!");
        break;

        case 3:
            alert("Búsqueda de empresas de seguridad e investigación!");
        break;

        default:
            alert("Búsqueda de promociones, descuentos, cursos!");
    }    
}

function searchByEnter(e,opcion)
{
    if (e.keyCode === 13 && !e.shiftKey) 
    {
        search(opcion);
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