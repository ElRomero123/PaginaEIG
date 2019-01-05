function search(opcion)
{
    $('#listResults').empty();;
    $('#listResults').hide();
    $('#maps').hide();
    $('#bannerState').css('display','block');
    $('#bannerState').css('background','yellow');
    $('#bannerState').css('color','black');
    $('#bannerState').text('Buscando ...');

    var criterio = document.getElementById('searchBox').value;

    switch(opcion)
    {
        case 1:
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
                        var cadena = "";

                        for(var i = 0; i < data.length; i++)
                        {
                            cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='p1'>" + data[i].Name + "</p> <p id='p2'>" + data[i].ProfesionDescription + "</p> <p id='p3'>" + data[i].WebPage + "</p> <p id='p4'>" + data[i].Email + "</p> <p id='p4'>" + data[i].Phone + "</p> <p id='p4'>" + data[i].City + "</p> <p id='p4'>" + + data[i].Address + "</p> </div> </div>";  
                        } 

                        $('#listResults').append(cadena);

                        for(var i = 0; i < data.length; i++)
                        {
                            document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                        }

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text(i + ' resultado(s) encontrados!');
                        $('#listResults').css('display','inline-block');
                        $('#maps').css('display','inline-block');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Sin resultados!');
                    }
                }
            }
        );
        break;

        case 2:
        //alert("Busqueda de otros perfiles como peritos, abogados!");
        $.ajax
        (
            {
                url: '../api/otherPerson/?cadena=' + criterio,
                type: 'GET',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    if(data.length > 0)
                    {
                        var cadena = "";
                        
                        for(var i = 0; i < data.length; i++)
                        {
                            cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='p1'>" + data[i].Name + "</p> <p id='p2'>" + data[i].Profesion + "</p> <p id='p2'>" + data[i].ProfesionDescription + "</p> <p id='p3'>" + data[i].WebPage + "</p> <p id='p4'>" + data[i].Email + "</p> <p id='p4'>" + data[i].Phone + "</p> <p id='p4'>" + data[i].City + "</p> <p id='p4'>" + + data[i].Address + "</p> </div> </div>";  
                        } 

                        $('#listResults').append(cadena);

                        for(var i = 0; i < data.length; i++)
                        {
                            document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                        }

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text(i + ' resultado(s) encontrados!');
                        $('#listResults').css('display','inline-block');
                        $('#maps').css('display','inline-block');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Sin resultados!');
                    }
                }
            }
        );
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