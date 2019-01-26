window.onload = initUser;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);
    }

    else
    {
        location.href = 'index.html';
    }
}

function search()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Buscando otros ...');
    
        var criterio = document.getElementById('criterio').value;
    
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
                        var cadena = "";
                        
                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Ciprin == 1)
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Type + "</p> <p class='pf2'>" + data[i].TypeDescription + "</p> <p class='pf3'>" + data[i].AttendantName + "</p> <p class='pf3'>" + data[i].AttendantPhone + "</p>  <p class='pf3'>" + data[i].AttendantEmail + "</p> <p class='pf4'>" + data[i].City + "</p> <p class='pf4'>" + data[i].Address + "</p> <p class='pf4'>" + data[i].Date + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='c'>Pertenece a CIPRIN</p> </div> </div>";
                            }
                            else
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Type + "</p> <p class='pf2'>" + data[i].TypeDescription + "</p> <p class='pf3'>" + data[i].AttendantName + "</p> <p class='pf3'>" + data[i].AttendantPhone + "</p>  <p class='pf3'>" + data[i].AttendantEmail + "</p> <p class='pf4'>" + data[i].City + "</p> <p class='pf4'>" + data[i].Address + "</p> <p class='pf4'>" + data[i].Date + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> </div> </div>";
                            }

                              
                        } 

                        $('#listResults').append(cadena);

                        for(var i = 0; i < data.length; i++)
                        {
                            document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                        }

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text(i + ' resultados encontrados!');
                        $('#listResults').css('display','flex');
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
    }

    else
    {
        $('#bannerState').css('background','red');
        $('#bannerState').css('color','white');
        $('#bannerState').text('Sin internet!');
    }
}

function searchByEnter(e)
{
    if (e.keyCode === 13 && !e.shiftKey) 
    {
        search();
    }
}

function to(num)
{
    switch(num)
    {
        case 1:
        localStorage.clear();
        location.href = 'index.html';
        break;
        case 2:
        location.href = 'productPanel.html';
        break;
        case 3:
        location.href = 'managePackage.html';
        break;
        default:
        location.href = 'menu.html';
    }
}